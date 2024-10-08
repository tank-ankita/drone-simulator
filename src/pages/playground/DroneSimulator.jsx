import { useState } from "react";
import "../../css/droneSimulator.css";

import { AppContainer } from '../../components/AppContainer.jsx'
import Simulator from "./simulator/Simulator.jsx"; 
import BlockPad from './blockly/BlockPad.jsx';

const DroneSimulator = () => {
  const [moveDronePosY, setDronePosY] = useState(null);
  const [moveDroneNegY, setDroneNegY] = useState(null);
  const [moveDronePosZ, setDronePosZ] = useState(null);
  const [moveDroneNegZ, setDroneNegZ] = useState(null);
  const [moveDronePosX, setDronePosX] = useState(null);
  const [moveDroneNegX, setDroneNegX] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [waitTime, setWaitTime] = useState(null);
  const [rotate, setRotate] = useState(null); 

  const [dronePosition, setDronePosition] = useState({ x: 0, y: 0, z: 0 });

  const moveDronePositiveY = (value) => {
    setDronePosY(value);
    setTimeout(() => setDronePosY(null), 1000); 
  };

  const moveDroneNegativeY = (value) => {
    setDroneNegY(value);
    setTimeout(() => setDroneNegY(null), 1000);
  };

  const moveDronePositiveZ = (value) => {
    setDronePosZ(value);
    setTimeout(() => setDronePosZ(null), 1000); 
  };

  const moveDroneNegativeZ = (value) => {
    setDroneNegZ(value);
    setTimeout(() => setDroneNegZ(null), 1000);
  };

  const moveDronePositiveX = (value) => {
    setDronePosX(value);
    setTimeout(() => setDronePosX(null), 1000);
  };

  const moveDroneNegativeX = (value) => {
    setDroneNegX(value);
    setTimeout(() => setDroneNegX(null), 1000);
  };

  const droneSpeed = (value) => {
    setSpeed(value);
    setTimeout(() => setSpeed(null), 1000);
  };

  const rotateDrone = (value) => {
    setRotate(value);
    setTimeout(() => setRotate(null), 1000);
  }

  const bufferTime = (value) => {
    setWaitTime(value);
    setTimeout(() => setWaitTime(null), 1000);
  };

  const roundNumber = (number) => {
    return parseFloat(number).toFixed(2);
  }

  const getRotation = (dronePosition) => {
    let X = roundNumber(dronePosition.xRot)*60;
    let Y = roundNumber(dronePosition.yRot)*60;
    let Z = roundNumber(dronePosition.zRot)*60;

    return `Xr: ${X} Degree   Yr: ${Y} Degree  Zr: ${Z} Degree`;
  }

  const getPosition =(dronePosition) => {
    let x = roundNumber(dronePosition.xPos);
    let y = roundNumber(dronePosition.yPos);
    let z = roundNumber(dronePosition.zPos);

    return `X: ${x} cm   Y: ${y} cm  Z: ${z} cm`;
  }

    return (
      <AppContainer>     
          <div className="simulation-container">
            <div className="blockpad-container">
              <BlockPad 
                moveDronePosY={moveDronePositiveY}
                moveDroneNegY={moveDroneNegativeY}
                moveDronePosZ={moveDronePositiveZ}
                moveDroneNegZ={moveDroneNegativeZ}
                moveDronePosX={moveDronePositiveX}
                moveDroneNegX={moveDroneNegativeX}
                rotate={rotateDrone}
                speed={droneSpeed}
                waitTime={bufferTime}
              />
            </div>
            
            <div className="canvas-container">
              <div className="toolbar">
              <p>{getPosition(dronePosition)}</p>
              <p>{getRotation(dronePosition)}</p>
              </div>
              <Simulator 
                moveDronePosY={moveDronePosY}
                moveDroneNegY={moveDroneNegY}
                moveDronePosZ={moveDronePosZ}
                moveDroneNegZ={moveDroneNegZ}
                moveDronePosX={moveDronePosX}
                moveDroneNegX={moveDroneNegX}
                rotate={rotate}
                speed={speed}
                waitTime={waitTime}
                setDronePosition={setDronePosition}
              />
            </div>
          </div>
      </AppContainer>
    );
};

export default DroneSimulator;
