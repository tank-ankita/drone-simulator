/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export const Drone = () => {
    const memoizedDrone = useMemo(()=> {
        return useGLTF('assets/models/drone.glb')
    })
    const droneRef = useRef()
    useFrame(() =>{
        // droneRef.current.position.x = Math.sin(clock.getElapsedTime()*0.1)*5;
        // droneRef.current.position.z = Math.cos(clock.getElapsedTime()*0.1)*5;
    })

    return (
        <mesh ref={droneRef} position={[0,2,2]}>
            <primitive 
                object={memoizedDrone.scene} 
                position={[0,-3,-9]} 
                scale={0.3} 
                rotation={[0,0,0]}/>
        </mesh>
    )
}