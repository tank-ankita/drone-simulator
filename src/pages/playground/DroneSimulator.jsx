import { useState } from "react";
import "../../css/droneSimulator.css";

import { AppContainer } from '../../components/AppContainer.jsx'
import Simulator from "./simulator/Simulator.jsx"; 
import BlockPad from './blockly/BlockPad.jsx';

const DroneSimulator = () => {
  const [moveDronePosY, setDronePosY] = useState(null);
  const [moveDronePosZ, setDronePosZ] = useState(null);
  const [moveDroneNegZ, setDroneNegZ] = useState(null);

  const moveDronePositiveY = (value) => {
    setDronePosY(value);
    // Set a timeout to stop moving after a certain period, if needed
    setTimeout(() => setDronePosY(null), 1000); // Adjust as needed
  };

  const moveDronePositiveZ = (value) => {
    setDronePosZ(value);
    // Set a timeout to stop moving after a certain period, if needed
    setTimeout(() => setDronePosZ(null), 1000); // Adjust as needed
  };

  const moveDroneNegativeZ = (value) => {
    setDroneNegZ(value);
    // Set a timeout to stop moving after a certain period, if needed
    setTimeout(() => setDroneNegZ(null), 1000); // Adjust as needed
  };





    return (
      <AppContainer>     
          <div className="simulation-container">
            <div className="blockpad-container">
              <BlockPad 
                moveDronePosY={moveDronePositiveY}
                moveDronePosZ={moveDronePositiveZ}
                moveDroneNegZ={moveDroneNegativeZ}
              />
            </div>
            
            <div className="canvas-container">
              <Simulator 
                moveDronePosY={moveDronePosY}
                moveDronePosZ={moveDronePosZ}
                moveDroneNegZ={moveDroneNegZ}
              />
            </div>
          </div>
      </AppContainer>
    );
};

export default DroneSimulator;
