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
import "../../../css/blockpad.css";

Blockly.setLocale(En);

const BlockPad = ({ 
  moveDronePosY, 
  moveDronePosZ,
  moveDroneNegZ
}) => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();
  
  const clearWorkspace = () => {
    Blockly.getMainWorkspace().clear();
  };

  const droneTakeOff = (value) => {
    moveDronePosY(value);
  }

  const flyForwardDistance = (distance, measurement) => {
    moveDronePosZ([distance, measurement]);
  }
  

  const flyBackwardDistance = (distance, measurement) => {
    moveDroneNegZ([distance, measurement]);
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
  moveDronePosY: PropTypes.any, 
  moveDronePosZ: PropTypes.any,
  moveDroneNegZ: PropTypes.any
};

export default BlockPad;
