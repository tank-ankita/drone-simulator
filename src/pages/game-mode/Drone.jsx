/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import PropTypes from 'prop-types';
import { droneTakeOff } from './config/droneMovement.js';

export const Drone = ({ controlsRef, moveDroneUp }) => {
  const memoizedDrone = useMemo(() => {
    return useGLTF('assets/models/drone.glb');
  }, []);

  const droneRef = useRef();
  const { camera } = useThree(); 
  
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const keys = useRef({ w: false, a: false, s: false, d: false, u: false, p: false });
  const speed = 0.1;

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

    // Update Drone Movements
    if (keys.current.w) velocity.current.z -= speed; // Forward
    if (keys.current.s) velocity.current.z += speed; // Backward
    if (keys.current.a) velocity.current.x -= speed; // Left
    if (keys.current.d) velocity.current.x += speed; // Right
    if (keys.current.u) velocity.current.y += speed; // Up
    if (keys.current.p) velocity.current.y -= speed; // Down

    // Interpolate (lerp) the current position towards the new position
    droneRef.current.position.lerp(velocity.current.add(droneRef.current.position), 0.1);

    // Update camera to follow drone
    camera.position.lerp(new THREE.Vector3(
      droneRef.current.position.x,
      droneRef.current.position.y + 1,
      droneRef.current.position.z + 5
    ), 0.1);

    camera.lookAt(droneRef.current.position);

    // Update the controls to target the drone
    if (controlsRef.current) {
      controlsRef.current.target.lerp(droneRef.current.position, 0.1);
    }
  }


  useFrame(() => {
    if (!droneRef.current) return;

    if(moveDroneUp) {
      console.log("Moving drone by....", moveDroneUp)
      droneTakeOff(moveDroneUp, keys);
    }


    updateDroneMovement();
  });

  return (
    <mesh ref={droneRef}>
      <primitive 
        object={memoizedDrone.scene} 
        position={[0, -1, 2]} 
        scale={0.3} 
        rotation={[0, 0, 0]} 
      />
    </mesh>
  );
};


Drone.propTypes = {
  moveDroneUp: PropTypes.func, 
};
