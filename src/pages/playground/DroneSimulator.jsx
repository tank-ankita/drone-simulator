import { useState } from "react";
import "../../css/droneSimulator.css";

import { AppContainer } from '../../components/AppContainer.jsx'
import BlockPad from './blockly/BlockPad.jsx';
import Simulator from "./simulator/Simulator.jsx"; 

const DroneSimulator = () => {
  const [moveDroneUp, setMoveDrone] = useState(null);

  const moveDroneForward = (value) => {
    setMoveDrone(value);
    // Set a timeout to stop moving after a certain period, if needed
    setTimeout(() => setMoveDrone(null), 1000); // Adjust as needed
  };

    return (
      <AppContainer>     
          <div className="simulation-container">
            <div className="blockpad-container">
              <BlockPad moveDroneForward={moveDroneForward}/>
            </div>
            
            <div className="canvas-container">
              <Simulator moveDroneUp={moveDroneUp}/>
            </div>
          </div>
      </AppContainer>
    );
};

export default DroneSimulator;
