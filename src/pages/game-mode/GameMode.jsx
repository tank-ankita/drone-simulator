import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Container from './Container'
import '../../css/game-mode.css'

const GameMode = () => {
  return (
      <Canvas camera={{fov: 75, near: 0.1, far:1000, position: [0, 3, 3]}}>
        <OrbitControls></OrbitControls>
        <Container/>
      </Canvas>
    
  );
};

export default GameMode;
