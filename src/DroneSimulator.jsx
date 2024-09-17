import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import BlockPad from './components/blockly/BlockPad.jsx';
import App from "./components/simulation/App.jsx"; 
import "./css/index.css";

const DroneSimulator = () => {
    const [droneTakeOffFunc, setDroneTakeOffFunc] = useState(null); 
    const [droneSpeedFunc, setDroneSpeedFunc] = useState(null); 

    const handleDroneTakeOff = (data) => {
      setDroneTakeOffFunc(data)
    }

    const handleDroneSpeed = (data) => {
      setDroneSpeedFunc(data)
    }
  
    return (
      <div className="app-container">
        <div className="blockpad-container">
          <BlockPad  
            onDroneTakeOff={handleDroneTakeOff}
            onDroneSetSpeed={handleDroneSpeed}
          />
        </div>
        <div className="canvas-container">
          <Canvas shadows>
            <Suspense fallback={null}>
              <App 
                onDroneTakeOff={droneTakeOffFunc} 
                onDroneSetSpeed={droneSpeedFunc}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    );
};

export default DroneSimulator;
