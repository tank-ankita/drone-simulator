/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Drone }  from '../../../components/drone/Drone.jsx'
import PropTypes from 'prop-types';

import '../../../css/mountains.css'

const Mountains = ({ 
    moveDronePosY,
    moveDroneNegY,
    moveDronePosZ,
    moveDroneNegZ,
    moveDronePosX,
    moveDroneNegX,
    waitTime,
    speed,
    setDronePosition,
    rotate,
    enableMouseControl
  }) => {
    const controlsRef = useRef();

    return (
        <Canvas>
            <color attach="background" args={['black']} />
            <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} />
           
            <Drone 
              controlsRef={controlsRef} 
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
              enableMouseControl={enableMouseControl}
            />
        </Canvas>
    );
};


Mountains.propTypes = {
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any,
  setDronePosition: PropTypes.any,
  rotate: PropTypes.any,
  enableMouseControl: PropTypes.any
};
  

export default Mountains;
