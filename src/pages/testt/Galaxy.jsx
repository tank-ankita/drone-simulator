/* eslint-disable react/no-unknown-property */

import { useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import { Earth }  from './Earth'
import { Drone } from "./Drone";

import '../../css/gameMode.css'

const Galaxy = ({ 

  }) => {
    const controlsRef = useRef();
    const [droneActive, setDroneActive] = useState(false);

    useFrame(() => {
        if (controlsRef.current) {
          controlsRef.current.update(); // Ensure the controls stay updated
        }
      });

    return (
        <>
            <color attach="background" args={['black']} />
            <AnimatedStars/>
            <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} />
            <ambientLight/>
            <Earth/>
            <Drone controlsRef={controlsRef} setDroneActive={setDroneActive}  />

        </>
    );
};


const AnimatedStars = () => {
    const starsRef = useRef();
    useFrame(() => {
        starsRef.current.rotation.x += 0.0001;
        starsRef.current.rotation.y += 0.0001;
        starsRef.current.rotation.z += 0.0001;

    })
    
    return<Stars ref={starsRef}/>
}

Galaxy.propTypes = {

};
  

export default Galaxy;
