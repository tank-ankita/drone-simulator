/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import * as THREE from 'three';
import PropTypes from 'prop-types';
import { useGLTF, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import {  moveDroneUp, moveDroneDown, moveDroneForward, moveDroneBackward, moveDroneRight, createWait } from './config/droneMovement.js';

const DISTANCE_CM_OFFSET = 0.1;
const DISTANCE_INCHES_OFFSET = 0.393701;

const INCHES = "INCHES";
const DISTANCE = {
  'INCHES': 0.393701,
  'CM': 1
}
export const Drone = ({ 
  controlsRef, 
  moveDronePosY,
  moveDroneNegY,
  moveDronePosZ,
  moveDroneNegZ,
  moveDronePosX,
  moveDroneNegX,
  waitTime,
  speed,
  setDronePosition
}) => {

  const memoizedDrone = useMemo(() => { return useGLTF('assets/models/drone.glb'); }, []);

  const droneRef = useRef();
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const keys = useRef({ w: false, a: false, s: false, d: false, u: false, p: false, t: false });
  
  const { camera } = useThree(); 

  const [path, setPath] = useState([new THREE.Vector3(0, 0, 0)]); 
  const [targetPosition, setTargetPosition] = useState(null);
  const [targetRotation, setTargetRotation] = useState(null);

  const allowDroneCamera = true;
  const droneSpeep = 0.05

  useEffect(() => {
    const handleKeyDown = (event) => {
      keys.current[event.key] = true;
    };
    
    const handleKeyUp = (event) => {
      keys.current[event.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  const updateDroneMovement = () => {
    velocity.current.set(0, 0, 0);

    // Calculate the forward direction based on the drone's current rotation
    const forwardDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const backwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const leftDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const rightDirection = new THREE.Vector3(-1, 0, 0).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation

    if (keys.current.w) velocity.current.add(forwardDirection.multiplyScalar(droneSpeep)); // Forward
    if (keys.current.s) velocity.current.add(backwardDirection.multiplyScalar(droneSpeep)); // Backward
    if (keys.current.a) velocity.current.add(leftDirection.multiplyScalar(droneSpeep)); // left
    if (keys.current.d) velocity.current.add(rightDirection.multiplyScalar(droneSpeep)); // right

    if (keys.current.z) droneRef.current.rotation.y += THREE.MathUtils.degToRad(1); // Rotate left
    if (keys.current.c) droneRef.current.rotation.y -= THREE.MathUtils.degToRad(1); // Rotate right

    if (keys.current.u) velocity.current.y += droneSpeep; // Up
    if (keys.current.p) velocity.current.y -= droneSpeep; // Down

    // Interpolate (lerp) the current position towards the new position
    droneRef.current.position.add(velocity.current);

    // Update camera to follow drone
    if (allowDroneCamera) {
      const cameraOffset = new THREE.Vector3(0, 1, -5); // Camera position relative to the drone
      cameraOffset.applyQuaternion(droneRef.current.quaternion); // Apply the drone's rotation to the camera
      camera.position.copy(droneRef.current.position.clone().add(cameraOffset));
      camera.lookAt(droneRef.current.position); // Ensure the camera keeps looking at the drone
    }

    // Update the path the drone follows
    const currentPosition = droneRef.current.position.clone();
    setPath((prevPath) => [...prevPath, currentPosition]);
    setDronePosition({ 
      xPos: droneRef.current.position.x, 
      yPos: droneRef.current.position.y, 
      zPos: droneRef.current.position.z, 
      xRot: droneRef.current.rotation.x,
      yRot: droneRef.current.rotation.y, 
      zRot: droneRef.current.rotation.z });
  };

  const moveXLeft = ( [distance, unit]) => {
    const newPosition = unit == INCHES ? distance * DISTANCE_INCHES_OFFSET : distance; 
    const distanceInThreeJsUnits = (newPosition / 100); 
    const leftDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(droneRef.current.quaternion); 
    droneRef.current.position.add(leftDirection.multiplyScalar(distanceInThreeJsUnits)); 
  };

  useFrame(() => {
    if (!droneRef.current) return;

    // Custom key-based movements
    if (moveDronePosY) moveDroneUp(moveDronePosY, keys);
    if (moveDroneNegY) moveDroneDown(moveDroneNegY, keys);
    if (moveDronePosZ) moveDroneForward(moveDronePosZ, keys);
    if (moveDroneNegZ) moveDroneBackward(moveDroneNegZ, keys);
    if (moveDronePosX) moveDroneRight(moveDronePosX, keys);
    if (moveDroneNegX) moveXLeft(moveDroneNegX);
    
    if (waitTime) createWait(waitTime);

    updateDroneMovement();
  });

  return (
    <>
      <mesh ref={droneRef}>
        <primitive 
          object={memoizedDrone.scene} 
          position={[0, 0, 0]} 
          scale={0.2} 
          rotation={[0, 0, 0]} 
        />
      </mesh>
      <Line
        points={path} 
        color="yellow" 
        lineWidth={3} 
      />
    </>
  );
};

Drone.propTypes = {
  setDronePosition: PropTypes.func,
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  controlsRef: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any
};
