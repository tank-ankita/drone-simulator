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

        return `flyForwardDistance(${fly_forward_distance},${fly_forward_unit});`;
    } 

    // flying_forward_time
    javascriptGenerator.forBlock['flying_forward_time'] = function(block) {
        const fly_forward_time = block.getFieldValue('SECONDS')
        return `flyForwardTime(${fly_forward_time});`;
    } 

    // flying_backwards_distance
    javascriptGenerator.forBlock['flying_forward_distance'] = function(block) {
        const fly_backwards_distance = block.getFieldValue('DISTANCE')
        const fly_backwards_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyBackwardDistance(${fly_backwards_distance},${fly_backwards_unit});`;
    } 

    // flying_backwards_time
    javascriptGenerator.forBlock['flying_forward_time'] = function(block) {
        const fly_forward_time = block.getFieldValue('SECONDS')
        return `flyBackwardTime(${fly_forward_time});`;
    } 


    // flying_left_distance
    javascriptGenerator.forBlock['flying_forward_distance'] = function(block) {
        const fly_left_distance = block.getFieldValue('DISTANCE')
        const fly_left_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyLeftDistance(${fly_left_distance},${fly_left_unit});`;
    } 

    // flying_left_time
    javascriptGenerator.forBlock['flying_left_time'] = function(block) {
        const fly_left_time = block.getFieldValue('SECONDS')
        return `flyLeftTime(${fly_left_time});`;
    } 

}

