/* eslint-disable react/no-unknown-property */
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Environment } from '@react-three/drei';
import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import '../../../css/city.css';
import { Drone } from '../../../components/drone/city/Drone.jsx';
import { buildingGroup1, buildingGroup2, buildingGroup3, buildingGroup4, buildingGroup5, hospital, fireStation} from './config.js'

let GlobalCamera;
let GlobalScene;
let lastPosition = null;

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

const CameraController = ({ enableMeasurement }) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (enableMeasurement) {
      // Move camera to top-down view
      camera.position.set(0, 100, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI / 2; // Lock to top-down
        controlsRef.current.minPolarAngle = Math.PI / 2;
        controlsRef.current.enableRotate = false; // Disable rotation
      }
    } else {
      // Reset camera to default view
      camera.position.set(50, 50, 50);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.maxPolarAngle = Math.PI; // Allow full rotation
        controlsRef.current.minPolarAngle = 0;
        controlsRef.current.enableRotate = true; // Enable rotation
      }
    }
    GlobalCamera = camera;
    GlobalScene = scene;
  }, [enableMeasurement, camera]);

  return (
    <>
      {!enableMeasurement && (
        <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />
      )}
    </>
  );
};

const Pin = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const handleCanvasClick = (event, setPins, enableMeasurement, allBuildings, droneRef) => {
  
  if (enableMeasurement) {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const vector = new THREE.Vector3(x, y, 0.5);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(vector, GlobalCamera);
    
    const intersection = raycaster.intersectObjects(allBuildings); // Adjust based on your logic
    if (intersection.length > 0) {
      const point = intersection[0].point; // Get the intersection point
      setPins((prevPins) => [...prevPins, point]); // Assuming setPins is a state updater function for your pins
      if(lastPosition == null) {
        lastPosition = droneRef.current.position;
      }
      const distance = lastPosition.distanceTo(point);

      // Draw a line from the drone to the intersection point
      const points = [lastPosition, point];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 'red' });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      GlobalScene.add(line);
      lastPosition = point;

      // Display the distance near the point
      displayDistanceText(`${distance.toFixed(2)} cm`, point);
    }
  }
};
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const loader = new FontLoader(); // Create a FontLoader instance

const displayDistanceText = (text, position) => {
  loader.load('/node_modules/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 2, // Adjust size as needed
      height: 0.05, // Adjust height
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(position.x, position.y + 0.1, position.z); // Adjust Y position slightly above the line point
    textMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X-axis

    GlobalScene.add(textMesh); // Add the text mesh to the scene
  }, undefined, (error) => {
    console.error('An error occurred loading the font:', error);
  });
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
  enableMouseControl,
  enableMeasurement
}) => {
  const droneRef = useRef();
  const controlsRef = useRef();
  const refBuildings = useRef([]);
  const [pins, setPins] = useState([]); // State to track pin positions

  const allBuildings = useRef([]);

  useEffect(() => {
    allBuildings.current = refBuildings.current.filter(mesh => mesh); // Clean undefined references
  }, [refBuildings.current]);

  return (
  <Canvas 
    shadows 
    onClick={(event) => handleCanvasClick(event, setPins, enableMeasurement, allBuildings.current, droneRef)} // Pass click event
  >
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

      {buildingGroup1.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} rotation={[0]} />   ))}
      {buildingGroup2.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} rotation={[-Math.PI / 2]} />   ))}
      {buildingGroup3.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} rotation={[-Math.PI / -2]} /> ))}
      {buildingGroup4.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} rotation={[0]} />    ))}
      {buildingGroup5.map((group, index) => ( <BuildingGroup key={index} buildings={group} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} rotation={[0]} />   ))}
       
      <Road position={[0, 0, 16]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[60,8]} color="lightgray"/>
      <Road position={[0, -0.2, -6]} rotation={[-Math.PI / 2, 0, 0]}  dimensions={[8,50]} color="yellowgreen"/>

      {hospital.map((group, index)    => ( <BuildingGroup key={index} buildings={group} rotation={[0]} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} />   ))}
      {fireStation.map((group, index) => ( <BuildingGroup key={index} buildings={group} rotation={[0]} ref={(mesh) => {if (mesh) {refBuildings.current[index] = mesh; allBuildings.current.push(mesh);}}} />   ))}

      {pins.map((pin, index) => ( <Pin key={index} position={pin} /> ))}
      <CameraController enableMeasurement={enableMeasurement} />

      <Drone
        ref={droneRef}
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
        enableMeasurement={enableMeasurement}
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
  enableMouseControl: PropTypes.any,
  enableMeasurement: PropTypes.any
};

export default City;
