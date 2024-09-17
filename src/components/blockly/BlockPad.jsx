/* eslint-disable no-unused-vars */

import { useEffect, useRef } from 'react';

import Theme from '@blockly/theme-modern';
import PropTypes from 'prop-types';

import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import 'blockly/javascript';
import 'blockly/blocks';

import { toolbarConfig, toolbarBlocksDefinitions } from './config/toolbar.js'

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
    const theme = Theme;
    const toolbar =  toolbarConfig;

    toolbarBlocksDefinitions(Blockly);
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbar,
      theme: theme,
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
    // TODO: issue here that it is being rendered twice
    
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button style={{ padding: '10px 20px' }} onClick={clearWorkspace}>Clear Workspace</button>
        <button style={{ padding: '10px 20px' }} onClick={runSimulator}>Launch Simulation</button>
      </div>
      
      <div
        ref={blocklyDiv}
        style={{ height: '95%', width: '100%', backgroundColor: '#ffffff', border: '1px solid #ccc' }}
      />
    </div>
    
  );
};

BlockPad.propTypes = {
  onDroneTakeOff: PropTypes.func, 
  onDroneSetSpeed: PropTypes.func 
};

export default BlockPad;
