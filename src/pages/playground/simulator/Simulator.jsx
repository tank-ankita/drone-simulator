/* eslint-disable react/no-unknown-property */ 
import PropTypes from 'prop-types';
import { GameMode } from '../../game-mode/GameMode.jsx' 

function Simulator({moveDroneUp}) {
  return (
    <>
      <GameMode moveDroneUp={moveDroneUp}/>
    </>
  );
}

Simulator.propTypes = {
  moveDroneUp: PropTypes.func, 
};

export default Simulator;
