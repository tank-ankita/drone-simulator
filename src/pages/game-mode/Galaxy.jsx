/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { OrbitControls, useHelper, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Earth }  from './Earth'
import { Drone }  from './Drone'

import * as THREE from 'three'

import '../../css/game-mode.css'

const Galaxy = () => {
    const directionLightRef = useRef();
    const directionLightRef2 = useRef();

    useHelper(directionLightRef,  THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionLightRef2,  THREE.DirectionalLightHelper, 1, 'hotpink')

    return (
        <>
            <color attach="background" args={['black']} />
            <AnimatedStars/>
            <OrbitControls></OrbitControls>
            <ambientLight></ambientLight>
            <Drone></Drone>
            <Earth/>
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


export default Galaxy;
