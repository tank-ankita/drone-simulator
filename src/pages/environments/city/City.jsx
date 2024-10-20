/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment } from '@react-three/drei';
import React, { useRef } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import '../../../css/city.css';
import { Drone } from '../../../components/drone/city/Drone.jsx';
import { buildingGroup1, buildingGroup2, buildingGroup3, buildingGroup4, buildingGroup5, hospital, fireStation} from './config.js'

export const allBuildings = [
  ...buildingGroup1.flat(),
  ...buildingGroup2.flat(),
  ...buildingGroup3.flat(),
  ...buildingGroup4.flat(),
  ...buildingGroup5.flat(),
  ...hospital.flat(),
  ...fireStation.flat(),
];

const Road = ({color, position, rotation, dimensions }) => {
  return (
    <mesh receiveShadow rotation={rotation} position={position}>
      <planeGeometry args={dimensions} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const BuildingGroup = React.forwardRef(({ buildings, rotation }, ref) => {
  return (
    <group rotation={[0, rotation, 0]} ref={ref}>
      {buildings.map((building, index) => (
        <mesh key={index} position={[building.position[0], (building.height / 2) - 5, building.position[2]]} castShadow name={building.name}>
          <boxGeometry args={[building.width, building.height, building.length]} />
          <meshStandardMaterial color={building.color} />
        </mesh>
      ))}
    </group>
  );
});

// Stripes Component - Now wrapped in a group for collective rotation
const Stripes = ({ roadPosition, groupRotation, stripeColor, stripeDimension, stripeCount }) => {
  const stripes = [];

  for (let i = 0; i < stripeCount; i++) {
    const zPosition = roadPosition[2] - (i * 10);
    stripes.push(
      <mesh
        key={i}
        position={[roadPosition[0], roadPosition[1] + 0.01, zPosition]} 
        receiveShadow
      >
        <boxGeometry args={stripeDimension} /> 
        <meshStandardMaterial color={stripeColor} />
      </mesh>
    );
  }

  return (
    <group rotation={groupRotation}> {/* Rotate the entire group */}
      {stripes}
    </group>
  );
};

const City = ({
  moveDronePosY,
  moveDroneNegY,
  moveDronePosZ,
  moveDroneNegZ,
  moveDronePosX,
  moveDroneNegX,
  waitTime,
  speed,
  setDronePosition,
  rotate,
  enableMouseControl
}) => {
  const controlsRef = useRef();
  const refBuildings = [];
  return (
  <Canvas shadows onCreated={({ scene }) => {}}>
    <ambientLight intensity={0.4} />
      <Environment preset="sunset" /> 
      <Road position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[100,100]} color="#444"/>
      
      <Road position={[0, 0, -35]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[75,8]} color="lightgray"/>
      <Stripes stripeCount={7} roadPosition={[-35, 0, 30]} groupRotation={[0, -Math.PI / 2, 0]}  stripeColor="white" stripeDimension={[0.5, 0.1, 5]} /> 

      <Road position={[-34, -0.2, -1.5]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[8,75]} color="lightgray"/>
      <Stripes stripeCount={7} roadPosition={[-34, 0, 30]} groupRotation={[0, 0, 0]}  stripeColor="white" stripeDimension={[0.5, 0.1, 5]} /> 

      <Road position={[34, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[8,75]} color="lightgray"/>
      <Stripes stripeCount={7} roadPosition={[34, 0, 30]} groupRotation={[0, 0, 0]}  stripeColor="white" stripeDimension={[0.5, 0.1, 5]} /> 

      <Road position={[0, 0, 35]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[76,8]} color="lightgray"/>
      <Stripes stripeCount={7} roadPosition={[35, 0, 30]} groupRotation={[0, -Math.PI / 2, 0]}  stripeColor="white" stripeDimension={[0.5, 0.1, 5]} /> 

      {buildingGroup1.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => refBuildings.push(mesh)} rotation={[0]} />   ))}
      {buildingGroup2.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => refBuildings.push(mesh)} rotation={[-Math.PI / 2]} />   ))}
      {buildingGroup3.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => refBuildings.push(mesh)} rotation={[-Math.PI / -2]} /> ))}
      {buildingGroup4.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => refBuildings.push(mesh)} rotation={[0]} />    ))}

      {buildingGroup5.map((group, index) => ( <BuildingGroup key={index} buildings={group} rotation={[0]} ref={(mesh) => refBuildings.push(mesh)} />   ))}
      <Road position={[0, 0, 16]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[60,8]} color="lightgray"/>
      <Road position={[0, -0.2, -6]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[8,50]} color="yellowgreen"/>

      {hospital.map((group, index) => ( <BuildingGroup key={index} buildings={group} rotation={[0]} ref={(mesh) => refBuildings.push(mesh)} />   ))}
      {fireStation.map((group, index) => ( <BuildingGroup key={index} buildings={group} rotation={[0]} ref={(mesh) => refBuildings.push(mesh)} />   ))}

      <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} />

      <Drone
        controlsRef={controlsRef}
        buildings={refBuildings}
        moveDronePosY={moveDronePosY}
        moveDroneNegY={moveDroneNegY}
        moveDronePosZ={moveDronePosZ}
        moveDroneNegZ={moveDroneNegZ}
        moveDronePosX={moveDronePosX}
        moveDroneNegX={moveDroneNegX}
        waitTime={waitTime}
        speed={speed}
        setDronePosition={setDronePosition}
        rotate={rotate}
        enableMouseControl={enableMouseControl}
      />
  
  </Canvas>
  );
};

City.propTypes = {
  moveDronePosY: PropTypes.any,
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any,
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any,
  moveDroneNegX: PropTypes.any,
  waitTime: PropTypes.any,
  speed: PropTypes.any,
  setDronePosition: PropTypes.any,
  rotate: PropTypes.any,
  enableMouseControl: PropTypes.any
};

export default City;
