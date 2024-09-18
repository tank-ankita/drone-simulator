/* eslint-disable react/no-unknown-property */
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import {useRef} from "react"
import { Moon }  from './Moon'
import { ISS }  from './ISS'

export const Earth = () => {
    const earthRef = useRef();
    useFrame(() => {
        earthRef.current.rotation.y += 0.001;
        earthRef.current.rotation.x += 0.00001;

    })

    const earthTexture = useTexture('assets/textures/earth_daymap.jpg')

    return (
        <group>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />  {/* [radius, x-axis, y-axis] */}
                <meshStandardMaterial map={earthTexture} />
            </mesh>
            <ISS></ISS>
            <Moon></Moon>
        </group>
    )
}
