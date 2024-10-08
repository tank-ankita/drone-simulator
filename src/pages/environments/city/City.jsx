/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useRef } from "react";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Drone } from '../../../components/drone/Drone.jsx'
import PropTypes from 'prop-types';
import * as THREE from 'three';

import '../../../css/city.css'

// Building Component with textures for realism
const Building = ({ position, size }) => {
  const [concreteTexture, windowTexture] = useTexture([
    'assets/textures/neptune.jpg',  // Replace with real texture path
    'assets/textures/sun.jpg'    // Replace with real texture path
  ]);

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial attach="material" map={concreteTexture} />
      <meshStandardMaterial attach="material" map={windowTexture} />
    </mesh>
  );
};

// Ground with texture
const Ground = () => {
  const groundTexture = useTexture('assets/textures/venus.jpg');  // Replace with real texture path
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(50, 50);  // Tile the ground texture

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

const City = ({ 
  moveDronePosY,
  moveDroneNegY,
  moveDronePosZ,
  moveDroneNegZ,
  moveDronePosX,
  moveDroneNegX,
  waitTime,
  speed,
  setDronePosition,
  rotate,
  enableMouseControl
}) => {
  const controlsRef = useRef();

  return (
    <Canvas shadows camera={{ position: [10, 10, 20], fov: 50 }}>
      <color attach="background" args={['skyblue']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} />
      
      {/* Ground */}
      <Ground />

      {/* Buildings */}
      <Building position={[-10, 2.5, -10]} size={[4, 10, 4]} />
      <Building position={[10, 3, -10]} size={[5, 15, 5]} />
      <Building position={[-10, 4, 10]} size={[3, 20, 3]} />
      <Building position={[10, 2.5, 10]} size={[4, 10, 4]} />
      <Building position={[-20, 3, -20]} size={[6, 8, 6]} />
      <Building position={[20, 2.5, -20]} size={[3, 10, 3]} />
      
      {/* Environment (HDR) for realistic reflections */}
      <Environment preset="city" />
      
      {/* Drone */}
      <Drone 
        controlsRef={controlsRef} 
        moveDronePosY={moveDronePosY}
        moveDroneNegY={moveDroneNegY}
        moveDronePosZ={moveDronePosZ}
        moveDroneNegZ={moveDroneNegZ}
        moveDronePosX={moveDronePosX}
        moveDroneNegX={moveDroneNegX}
        waitTime={waitTime}
        speed={speed}
        setDronePosition={setDronePosition}
        rotate={rotate}
        enableMouseControl={enableMouseControl}
      />
    </Canvas>
  );
};

City.propTypes = {
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any,
  setDronePosition: PropTypes.any,
  rotate: PropTypes.any,
  enableMouseControl: PropTypes.any
};

export default City;
