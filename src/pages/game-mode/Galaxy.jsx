/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Earth }  from './Earth'
import { Drone }  from './Drone'
import PropTypes from 'prop-types';

import '../../css/gameMode.css'

const Galaxy = ({ moveDroneUp }) => {
    const controlsRef = useRef();

    useFrame(() => {
        if (controlsRef.current) {
          controlsRef.current.update(); // Ensure the controls stay updated
        }
      });

    return (
        <>
            <color attach="background" args={['black']} />
            <AnimatedStars/>
            <OrbitControls ref={controlsRef} enablePan={false} enableZoom={true} />
            <ambientLight/>
            <Earth/>
            <Drone controlsRef={controlsRef} moveDroneUp={moveDroneUp}/>
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
    moveDroneUp: PropTypes.func, 
  };
  

export default Galaxy;
