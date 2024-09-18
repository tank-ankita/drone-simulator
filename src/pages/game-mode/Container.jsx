/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { AnimatedStars }  from './AnimatedStars'
import { useHelper } from "@react-three/drei";

import { Earth }  from './Earth'

import * as THREE from 'three'

import '../../css/game-mode.css'

const Container = () => {
    const directionLightRef = useRef();
    const directionLightRef2 = useRef();

    useHelper(directionLightRef,  THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionLightRef2,  THREE.DirectionalLightHelper, 1, 'hotpink')

    return (
        <>
            <color attach="background" args={['black']} />
           
            <AnimatedStars/>
                        {/* <directionalLight 
                ref={directionLightRef} 
                position={[0,0,10]}     
                intensity={10}
                color={'white'}
            />

            <directionalLight 
                ref={directionLightRef2} 
                position={[0,0,-10]} 
            /> */}
            <ambientLight></ambientLight>
            <Earth/>
        </>
    );
};

export default Container;
