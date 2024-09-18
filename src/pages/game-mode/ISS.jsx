/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export const ISS = () => {
    const memoizedISS = useMemo(()=> {
        return useGLTF('/assets/models/iss_model.glb')
    })
    const issRef = useRef()
    useFrame(({clock}) =>{
        issRef.current.position.x = Math.sin(clock.getElapsedTime()*0.1)*5;
        issRef.current.position.z = Math.cos(clock.getElapsedTime()*0.1)*5;

    })

    return (
        <mesh ref={issRef} position={[0,1,1]}>
            <primitive object={memoizedISS.scene} position={[2,0,0]} scale={0.005}/>
        </mesh>
    )
}