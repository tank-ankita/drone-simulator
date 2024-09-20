import { Canvas } from "@react-three/fiber";
import PropTypes from 'prop-types';

import Galaxy from './Galaxy'
import '../../css/gameMode.css'

export const GameMode = ({
  moveDronePosY, 
    moveDronePosZ,
    moveDroneNegZ
  }) => {
  return (
      <Canvas camera={{ fov: 75, near: 0.2, far: 1000, position: [0, 0, -10] }}>
        <Galaxy 
          moveDronePosY={moveDronePosY}
          moveDronePosZ={moveDronePosZ}
          moveDroneNegZ={moveDroneNegZ}
        />
      </Canvas>
  );
};

GameMode.propTypes = {
  moveDronePosY: PropTypes.any, 
  moveDronePosZ: PropTypes.any,
  moveDroneNegZ: PropTypes.any
};
