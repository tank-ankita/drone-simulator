import { javascriptGenerator } from 'blockly/javascript';

export const toolbarFunctionHandler = () => {
    // takeoff
    javascriptGenerator.forBlock['takeoff'] = function() {
        const take_off_after_seconds = 1;
        return `droneTakeOff(${take_off_after_seconds});`;
    }
    
    // takeoff_after_seconds
    javascriptGenerator.forBlock['takeoff_after_seconds'] = function(block) {
        const take_off_after_seconds = block.getFieldValue('SECONDS')
        return `droneTakeOff(${take_off_after_seconds});`;
    }      

    // set_speed
    javascriptGenerator.forBlock['set_speed'] = function(block) {
        const drone_speed = block.getFieldValue('SPEED')
        return `setDroneSpeed(${drone_speed});`;
    }  

    // wait
    javascriptGenerator.forBlock['wait'] = function(block) {
        const wait_for_seconds = block.getFieldValue('SECONDS')
        return `waitTime(${wait_for_seconds});`;
    }  

    // flying_forward_distance
    javascriptGenerator.forBlock['flying_forward_distance'] = function(block) {
        const fly_forward_distance = block.getFieldValue('DISTANCE')
        const fly_forward_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyForward(${fly_forward_distance}, '${fly_forward_unit}');`;
    } 

    // flying_forward_time
    javascriptGenerator.forBlock['flying_forward_time'] = function(block) {
        const fly_forward_time = block.getFieldValue('SECONDS')
        return `flyForward(${fly_forward_time}, 'CM');`;
    } 

    // flying_backwards_distance
    javascriptGenerator.forBlock['flying_backward_distance'] = function(block) {
        const fly_backwards_distance = block.getFieldValue('DISTANCE')
        const fly_backwards_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyBackward(${fly_backwards_distance},'${fly_backwards_unit}');`;
    } 

    // flying_backwards_time
    javascriptGenerator.forBlock['flying_backward_time'] = function(block) {
        const fly_forward_time = block.getFieldValue('SECONDS')
        return `flyBackward(${fly_forward_time}, 'CM');`;
    } 

    // flying_left_distance
    javascriptGenerator.forBlock['flying_left_distance'] = function(block) {
        const fly_left_distance = block.getFieldValue('DISTANCE')
        const fly_left_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyLeft(${fly_left_distance}, '${fly_left_unit}');`;
    } 

    // flying_left_time
    javascriptGenerator.forBlock['flying_left_time'] = function(block) {
        const fly_left_time = block.getFieldValue('SECONDS')
        return `flyLeft(${fly_left_time},'CM');`;
    } 

    // flying_right_distance
    javascriptGenerator.forBlock['flying_right_distance'] = function(block) {
        const fly_right_distance = block.getFieldValue('DISTANCE')
        const fly_right_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyRight(${fly_right_distance}, '${fly_right_unit}');`;
    } 

    // flying_right_time
    javascriptGenerator.forBlock['flying_right_time'] = function(block) {
        const fly_right_distance = block.getFieldValue('SECONDS')
        return `flyRight(${fly_right_distance},'CM');`;
    } 

    // flying_up_distance
    javascriptGenerator.forBlock['flying_up_distance'] = function(block) {
        const fly_up_distance = block.getFieldValue('DISTANCE')
        const fly_up_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyUp(${fly_up_distance}, '${fly_up_unit}');`;
    } 

    // flying_up_time
    javascriptGenerator.forBlock['flying_up_time'] = function(block) {
        const fly_up_distance = block.getFieldValue('SECONDS')
        return `flyUp(${fly_up_distance},'CM');`;
    } 

    // flying_down_distance
    javascriptGenerator.forBlock['flying_down_distance'] = function(block) {
        const flying_down_distance = block.getFieldValue('DISTANCE')
        const fly_down_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyDown(${flying_down_distance}, '${fly_down_unit}');`;
    } 

    // flying_down_time
    javascriptGenerator.forBlock['flying_up_time'] = function(block) {
        const flying_down_distance = block.getFieldValue('SECONDS')
        return `flyDown(${flying_down_distance},'CM');`;
    } 

    // speed
    javascriptGenerator.forBlock['set_speed'] = function(block) {
        const speed = block.getFieldValue('SPEED')
        return `setSpeed(${speed});`;
    } 

    // wait
    javascriptGenerator.forBlock['wait'] = function(block) {
        const wait_time = block.getFieldValue('SECONDS')
        return `setWaitTime(${wait_time});`;
    } 

}

