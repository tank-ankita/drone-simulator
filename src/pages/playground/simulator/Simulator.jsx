/* eslint-disable react/no-unknown-property */ 
import PropTypes from 'prop-types';
import { GameMode } from '../../game-mode/GameMode.jsx' 

function Simulator({
    moveDronePosY,
    moveDroneNegY,
    moveDronePosZ,
    moveDroneNegZ,
    moveDronePosX,
    moveDroneNegX,
    waitTime,
    speed,
    setDronePosition,
    rotate
  }) {
  return (
    <>
      <GameMode 
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
      />
    </>
  );
}

Simulator.propTypes = {
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any,
  setDronePosition: PropTypes.any,
  rotate: PropTypes.any
};

export default Simulator;
