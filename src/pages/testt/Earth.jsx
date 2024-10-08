/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useMemo, useRef } from "react"

export const Earth = () => {
    const earthRef = useRef();
    useFrame(() => {
        earthRef.current.rotation.y += 0.001;
        earthRef.current.rotation.x += 0.00001;
    })

    const earthTexture = useTexture('assets/textures/earth_daymap.jpg')

    return (
        <group>
            <mesh ref={earthRef} position={[0, 0, -5]}>
                <sphereGeometry args={[1, 64, 64]} />  {/* [radius, x-axis, y-axis] */}
                <meshStandardMaterial map={earthTexture} />
            </mesh>
            <ISS></ISS>
            <Moon></Moon>
        </group>
    )
}

const ISS = () => {
    const memoizedISS = useMemo(()=> {
        return useGLTF('assets/models/iss_model.glb')
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

const Moon = () => {
    const moonRef = useRef();
    useFrame(({clock}) => {
        moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 4;
        moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 4;
        moonRef.current.rotation.y += 0.002;
    })

    const moonTexture = useTexture('assets/textures/moon.jpg')

    return <mesh ref={moonRef} position={[4,0,0]}>
        <sphereGeometry args={[0.5, 32, 32]} />  {/* [radius, x-axis, y-axis] */}
        <meshStandardMaterial map={moonTexture} />
    </mesh>

}
