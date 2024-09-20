/* eslint-disable react/no-unknown-property */ 
import PropTypes from 'prop-types';
import { GameMode } from '../../game-mode/GameMode.jsx' 

function Simulator({
    moveDronePosY,
    moveDronePosZ,
    moveDroneNegZ
  }) {
  return (
    <>
      <GameMode 
        moveDronePosY={moveDronePosY}
        moveDronePosZ={moveDronePosZ}
        moveDroneNegZ={moveDroneNegZ}
      />
    </>
  );
}

Simulator.propTypes = {
  moveDronePosY: PropTypes.any, 
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any

};

export default Simulator;
