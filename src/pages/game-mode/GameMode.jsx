import { Canvas } from "@react-three/fiber";
import PropTypes from 'prop-types';

import Galaxy from './Galaxy'
import '../../css/gameMode.css'

export const GameMode = ({moveDroneUp}) => {
  return (
      <Canvas camera={{ fov: 75, near: 0.2, far: 1000, position: [0, 0, -10] }}>
        <Galaxy moveDroneUp={moveDroneUp}/>
      </Canvas>
  );
};

GameMode.propTypes = {
  moveDroneUp: PropTypes.func, 
};
