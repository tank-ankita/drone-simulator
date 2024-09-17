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

    const getBannerReference = () => {
      if (window.location.hostname.includes('localhost')) {
        return '/assets/fixtures/nws_banner.png';
      }
    
      return '/drone-simulator/assets/fixtures/nws_banner.png';
    };


  
    return (
      <div className="app-container">
        <div className="app-title">
          <img src={getBannerReference()} alt="Logo" />
        </div>
        
        <div className="content">
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
      </div>
    );
};

export default DroneSimulator;
