/* eslint-disable react/no-unknown-property */
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export const Moon = () => {
    const moonRef = useRef();
    useFrame(({clock}) => {
        moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 4;
        moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 4;
        moonRef.current.rotation.y += 0.002;
    })

    const [moonTexture] = useTexture(['/assets/textures/moon.jpg'])

    return <mesh ref={moonRef} position={[4,0,0]}>
        <sphereGeometry args={[0.5, 32, 32]} />  {/* [radius, x-axis, y-axis] */}
        <meshStandardMaterial map={moonTexture} />
    </mesh>

}
