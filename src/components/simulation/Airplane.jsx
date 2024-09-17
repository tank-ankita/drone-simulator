/* eslint-disable react/no-unknown-property */

import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types';

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { droneTakeOff } from './droneUtils'; 

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);

const planePosition = new Vector3(-1, 3, 10);
let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.002;
let turboSpeed = 0
let controls = {};

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

function updatePlaneAxis(x, y, z, planePosition, camera) {
  jawVelocity *= 0.45;
  pitchVelocity *= 0.05;

  if (Math.abs(jawVelocity) > maxVelocity) 
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity) 
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (controls["a"]) {
    jawVelocity += 0.0025;
  }

  if (controls["d"]) {
    jawVelocity -= 0.0025;
  }

  if (controls["w"]) {
    pitchVelocity -= 0.0025;
  }

  if (controls["s"]) {
    pitchVelocity += 0.0025;
  }

  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();


  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  if(Object.values(controls).some(value => value === true)) {
    planePosition.add(z.clone().multiplyScalar(-planeSpeed -turboSpeed));
  }
 }


export function Airplane({ 
  onDroneTakeOff,
  onDroneSetSpeed, 
  ...props 
}) {
  // thanks to:
  // https://sketchfab.com/3d-models/vintage-toy-airplane-7de2ecbc0acb4b1886c3df3d196c366b
  
  const { nodes, materials } = useGLTF('assets/models/airplane.glb');
  const groupRef = useRef();
  const helixMeshRef = useRef();

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
    .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
    .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;


    var quaternionA = new Quaternion().copy(delayedQuaternion);
    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    // camera position
    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(
        new Matrix4().makeTranslation(0, 0.015, 0.3)
      );

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);


    helixMeshRef.current.rotation.z -= 1.0;
  });

  useEffect(() => {
    if (onDroneTakeOff) {
      droneTakeOff(onDroneTakeOff, controls);
    }

    if(onDroneSetSpeed) {
      planeSpeed = onDroneSetSpeed;
    }
  }, [onDroneTakeOff, onDroneSetSpeed]);


  return (
    <>
      <group ref={groupRef}>
        <group {...props} dispose={null} scale={0.01} rotation-y={Math.PI}>
          <mesh geometry={nodes.supports.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.chassis.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.helix.geometry} material={materials['Material.005']} ref={helixMeshRef} />
        </group>
      </group>
    </>
  )
}

Airplane.propTypes = {
  onDroneTakeOff: PropTypes.number,  
  onDroneSetSpeed: PropTypes.number
};

useGLTF.preload('assets/models/airplane.glb');
