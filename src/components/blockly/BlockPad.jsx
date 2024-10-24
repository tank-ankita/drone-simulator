/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import 'blockly/javascript';
import 'blockly/blocks';

import { toolbarConfig, toolbarBlocksDefinitions } from './config/toolbar.js'
import ActionButton from '../ActionButton.jsx';
import  Theme  from './config/theme.js';
import "../../css/blockpad.css";
import Interpreter from 'js-interpreter';


Blockly.setLocale(En);

const BlockPad = ({ 
  enableMouseControl,
  moveDronePosY, 
  moveDroneNegY,
  moveDronePosZ,
  moveDroneNegZ,
  moveDronePosX,
  moveDroneNegX,
  rotate,
  waitTime,
  speed,
}) => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();

  const [toggleValue, setToggleValue] = useState(false);
  const handleToggleChange = () => { setToggleValue(prevValue => {!prevValue; enableMouseControl(!prevValue)});};

  const clearWorkspace = () => { Blockly.getMainWorkspace().clear(); };
  const droneTakeOff = (distance) => { moveDronePosY([distance, 'CM']);  }
  
  const flyDown = (distance, measurement) => { moveDroneNegY([distance, measurement]); }
  const flyUp   = (distance, measurement) => { moveDronePosY([distance, measurement]); }

  const flyForward  = (distance, measurement) => { moveDronePosZ([distance, measurement]); }
  const flyBackward = (distance, measurement) => { moveDroneNegZ([distance, measurement]); }
  
  const flyLeft  = (distance, measurement) => { moveDroneNegX([distance, measurement]); }
  const flyRight = (distance, measurement) => { moveDronePosX([distance, measurement]); }

  const setSpeed    = (value) => { speed(value) }
  const setWaitTime = (value) => { waitTime(value) }

  const rotateDrone = (direction, degree, radius, unit) => { rotate([direction, degree, radius, unit]) }

  const runSimulator = () => {
    var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
    eval(code)
  };


  // const runSimulator = () => {
  //   var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
  //   var myInterpreter = new Interpreter(code);
  //   myInterpreter.run();
  // };

  // const runSimulator = () => {
  //   const code = `
  //     function test() {
  //       console.log('Interpreter test running!');
  //     }
  //     test();
  //   `;
  
  //   try {
  //     const interpreter = new Interpreter(code);
  //     console.log("Interpreter initialized:", interpreter);
  
  //     const step = () => {
  //       if (interpreter.step()) {
  //         console.log("Executing step...");
  //         requestAnimationFrame(step);
  //       } else {
  //         console.log("All steps executed.");
  //       }
  //     };
  
  //     step();
  //   } catch (error) {
  //     console.error("Interpreter Error:", error);
  //   }
  // };
  

  // const runSimulator = () => {
  //   const code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
  //   const interpreter = new Interpreter(code);
  
  //   const step = () => {
  //     if (interpreter.step()) {
  //       requestAnimationFrame(step); // Continue stepping through code
  //     }
  //   };
  
  //   step(); // Start interpreting code
  // };

  const reloadPage = () => {
    location.reload();
  }

  useEffect(() => {
    const toolbar =  toolbarConfig;

    toolbarBlocksDefinitions(Blockly);
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbar,
      theme: Theme,
      zoom: {
        controls: true,
        wheel: true,
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      trashcan: true,
      move: true
    });
  }, []);

  return (    
    <div className='blockpad-wrapper'>
      <div className='button-bar'>
        <ActionButton onClick={clearWorkspace} title="Clear Workspace" green medium></ActionButton>
        <ActionButton onClick={runSimulator} title="Launch Simulation" medium></ActionButton>
        <ActionButton onClick={reloadPage} title="Reset Simulation" medium>/</ActionButton>
        <label className="toggle-switch">
          <input type="checkbox" checked={toggleValue} onChange={handleToggleChange}/>
          <span className="slider">Enable Mouse Control</span>
        </label>
      </div>
      
      <div ref={blocklyDiv} className='blockly-area' />
    </div>
    
  );
};

BlockPad.propTypes = {
  enableMouseControl: PropTypes.any,
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any,
  rotate: PropTypes.any
};

export default BlockPad;
