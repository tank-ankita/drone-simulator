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
            <mesh ref={earthRef} position={[0, 0, 30]}>
                <sphereGeometry args={[2, 100, 100]} />
                <meshStandardMaterial map={earthTexture} />
            </mesh>
            <ISS earthRef={earthRef}/>
            <Moon earthRef={earthRef} /> {/* Pass the Earth reference to the Moon */}
        </group>
    )
}

const ISS = ({ earthRef }) => {
    const memoizedISS = useMemo(() => {
        return useGLTF('assets/models/iss_model.glb')
    })
    const issRef = useRef()
    
    useFrame(({ clock }) => {
        // Make the ISS orbit around the Earth
        const radius = 5; // Distance from the Earth
        issRef.current.position.x = earthRef.current.position.x + Math.sin(clock.getElapsedTime() * 0.1) * radius;
        issRef.current.position.z = earthRef.current.position.z + Math.cos(clock.getElapsedTime() * 0.1) * radius;
        issRef.current.position.y = 3; // Set a height for the ISS
    })

    return (
        <mesh ref={issRef} position={[0, 0, 0]}>
            <primitive object={memoizedISS.scene} scale={0.005} />
        </mesh>
    )
}

const Moon = ({earthRef}) => {
    const moonRef = useRef();
    useFrame(({clock}) => {
        const radius = 4; // Distance from the Earth
        moonRef.current.position.x = earthRef.current.position.x + Math.sin(clock.getElapsedTime() * 0.2) * radius;
        moonRef.current.position.z = earthRef.current.position.z + Math.cos(clock.getElapsedTime() * 0.2) * radius;
        moonRef.current.rotation.y += 0.002;
    })

    const moonTexture = useTexture('assets/textures/moon.jpg')

    return <mesh ref={moonRef} position={[0,0,0]}>
        <sphereGeometry args={[1, 50, 50]} />  {/* [radius, x-axis, y-axis] */}
        <meshStandardMaterial map={moonTexture} />
    </mesh>

}
