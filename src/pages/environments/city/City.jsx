/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Drone }  from '../../../components/drone/Drone.jsx'
import PropTypes from 'prop-types';

import '../../../css/city.css'

const City = ({ 
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
        <>
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
        </>
    );
};


City.propTypes = {
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
  

export default City;
