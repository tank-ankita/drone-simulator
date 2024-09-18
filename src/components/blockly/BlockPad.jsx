/* eslint-disable no-unused-vars */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import 'blockly/javascript';
import 'blockly/blocks';

import { toolbarConfig, toolbarBlocksDefinitions } from './config/toolbar.js'
import ActionButton from './ActionButton';
import  Theme  from './config/theme.js';
import "../../css/blockpad.css";

Blockly.setLocale(En);

const BlockPad = ({ 
    onDroneTakeOff, 
    onDroneSetSpeed
  }) => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();
  
  const clearWorkspace = () => {
    Blockly.getMainWorkspace().clear();
  };

  const droneTakeOff = (seconds_delay) => {
    console.log("calling drine takeoff with delay of ", seconds_delay)
    onDroneTakeOff(seconds_delay);
    // to help reset the state of the drone so it can be triggered again
    setTimeout(() => {
      onDroneTakeOff(null);
    }, 1000); 
  }

  const setDroneSpeed = (speed) => {
    console.log('Speed set to ', speed)
    onDroneSetSpeed(speed)
  }

  const runSimulator = () => {
    var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
    console.log(code);
    eval(code)
  };


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
        <ActionButton onClick={clearWorkspace} title="Clear Workspace" green></ActionButton>
        <ActionButton onClick={runSimulator} title="Launch Simulation"></ActionButton>
      </div>
      
      <div ref={blocklyDiv} className='blockly-area' />
    </div>
    
  );
};

BlockPad.propTypes = {
  onDroneTakeOff: PropTypes.func, 
  onDroneSetSpeed: PropTypes.func 
};

export default BlockPad;
