import { Canvas } from "@react-three/fiber";

import Galaxy from './Galaxy'
import '../../css/game-mode.css'

const GameMode = () => {
  return (
      <Canvas camera={{ fov: 75, near: 0.2, far: 1000, position: [0, 0, -10] }}>
        <Galaxy/>
      </Canvas>
    
  );
};

export default GameMode;
