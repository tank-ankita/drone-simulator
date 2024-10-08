/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useGLTF, Line } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import PropTypes from 'prop-types';


export const Drone = ({ 
    controlsRef, 
    setDroneActive

  }) => {
  const memoizedDrone = useMemo(() => { return useGLTF('assets/models/drone.glb'); }, []);

  const droneRef = useRef();
  const { camera } = useThree(); 
  
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const keys = useRef({ w: false, a: false, s: false, d: false, u: false, p: false });
  let currentSpeed = useRef(0.1);
  const [path, setPath] = useState([new THREE.Vector3(0, 2, 2)]); // Initial position


   // Store the target position and rotation for smooth animation
   const [targetPosition, setTargetPosition] = useState(null);
   const [targetRotation, setTargetRotation] = useState(null);

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


    // Update velocity based on key presses
    velocity.current.set(0, 0, 0);
    setDroneActive(true)
    // Update Drone Movements by reading the key
    if (keys.current.w) velocity.current.z -= currentSpeed.current; // Forward
    if (keys.current.s) velocity.current.z += currentSpeed.current; // Backward
    if (keys.current.a) velocity.current.x -= currentSpeed.current; // Left
    if (keys.current.d) velocity.current.x += currentSpeed.current; // Right
    if (keys.current.u) velocity.current.y += currentSpeed.current; // Up
    if (keys.current.p) velocity.current.y -= currentSpeed.current; // Down

    if (keys.current.t) {
      // Create a quaternion for a 10 degree rotation around the Y-axis
      const yawQuaternion = new THREE.Quaternion();
      yawQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(10));
      droneRef.current.quaternion.multiplyQuaternions(yawQuaternion, droneRef.current.quaternion);

      // Calculate the new camera position based on the drone's current position and orientation
      const offset = new THREE.Vector3(0, 1, 5); // Offset: 1 unit above and 5 units behind the drone
      const cameraPosition = offset.applyQuaternion(droneRef.current.quaternion).add(droneRef.current.position);

      // Lerp the camera to the new position
      // camera.position.lerp(cameraPosition, 0.1);

      // Ensure the camera looks at the drone
      //camera.lookAt(droneRef.current.position);
  }


    // Interpolate (lerp) the current position towards the new position
    droneRef.current.position.lerp(velocity.current.add(droneRef.current.position), 0.1);

    // Update camera to follow drone
    // camera.position.lerp(new THREE.Vector3(
    //   droneRef.current.position.x,
    //   droneRef.current.position.y + 1,
    //   droneRef.current.position.z + 5
    // ), 0.1);

    // camera.lookAt(droneRef.current.position);

    // Update the controls to target the drone
    if (controlsRef.current) {
      controlsRef.current.target.lerp(droneRef.current.position, 0.1);
    }


  }


  useFrame(() => {
    if (!droneRef.current) return;

    if (keys.current.b && !targetPosition && !targetRotation) {
      // When 'b' is pressed, calculate the target position and rotation
      const currentPosition = droneRef.current.position.clone();
      const currentRotation = droneRef.current.rotation.clone();
      
      // Target position: Move +10 units in x, y, z
      setTargetPosition(new THREE.Vector3(
        currentPosition.x + 10,
        currentPosition.y + 10,
        currentPosition.z + 10
      ));

      // Target rotation: Rotate 90 degrees to the left (around Y-axis)
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); // 90 degrees
      setTargetRotation(quaternion.multiply(droneRef.current.quaternion.clone()));
    }

    // If target position and rotation are set, animate towards them
    if (targetPosition && targetRotation) {
      // Interpolate position and rotation
      droneRef.current.position.lerp(targetPosition, 0.05); // Adjust speed by changing 0.05
      droneRef.current.quaternion.slerp(targetRotation, 0.05);

      // Check if the drone is close enough to the target, then stop animating
      if (droneRef.current.position.distanceTo(targetPosition) < 0.1) {
        setTargetPosition(null);
        setTargetRotation(null);
      }


    }



    updateDroneMovement();
    const currentPosition = droneRef.current.position.clone();
    setPath((prevPath) => [...prevPath, currentPosition]);


 
  });

  return (
    <>
      <mesh ref={droneRef}>
        <primitive 
          object={memoizedDrone.scene} 
          position={[0, -1, 2]} 
          scale={0.3} 
          rotation={[0, 0, 0]} 
        />
      </mesh>
      <Line
        points={path} // Points that make up the line
        color="yellow" // Line color
        lineWidth={2}  // Line width
      />
    </>
  );
};


Drone.propTypes = {
  setDroneActive: PropTypes.any,
  controlsRef: PropTypes.any
};
