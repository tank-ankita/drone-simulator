import { javascriptGenerator } from 'blockly/javascript';

export const toolbarFunctionHandler = () => {
    // takeoff
    javascriptGenerator.forBlock['takeoff'] = function() {
        return `droneTakeOff(1);`;
    }
    
    // takeoff_after_seconds
    javascriptGenerator.forBlock['takeoff_after_seconds'] = function(block) {
        const take_off_after_seconds = block.getFieldValue('SECONDS')
        return `waitTime(${take_off_after_seconds}); droneTakeOff(1);`;
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
        return `flyForward(${fly_forward_time}, 'SECONDS');`;
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
        return `flyBackward(${fly_forward_time}, 'SECONDS');`;
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
        return `flyLeft(${fly_left_time},'SECONDS');`;
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
        return `flyRight(${fly_right_distance},'SECONDS');`;
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
        return `flyUp(${fly_up_distance},'SECONDS');`;
    } 

    // flying_down_distance
    javascriptGenerator.forBlock['flying_down_distance'] = function(block) {
        const flying_down_distance = block.getFieldValue('DISTANCE')
        const fly_down_unit = block.getFieldValue('UNIT') // cm or inches

        return `flyDown(${flying_down_distance}, '${fly_down_unit}');`;
    } 

    // flying_down_time
    javascriptGenerator.forBlock['flying_down_time'] = function(block) {
        const flying_down_distance = block.getFieldValue('SECONDS')
        return `flyDown(${flying_down_distance},'SECONDS');`;
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

    // fly
    javascriptGenerator.forBlock['fly'] = function(block) {
        const x_cordinate = block.getFieldValue('x')
        const y_cordinate = block.getFieldValue('y')
        const z_cordinate = block.getFieldValue('z')
        const unit = block.getFieldValue('UNIT');

        let fucntionString = ""
        if(x_cordinate > 0) fucntionString += `flyRight(${x_cordinate}, '${unit}'); `
        if(y_cordinate > 0) fucntionString += `flyUp(${y_cordinate}, '${unit}'); `
        if(z_cordinate > 0) fucntionString += `flyForward(${z_cordinate}, '${unit}'); `

        if(x_cordinate < 0) fucntionString += `flyLeft(${x_cordinate}, '${unit}'); `
        if(y_cordinate < 0) fucntionString += `flyDown(${y_cordinate}, '${unit}'); `
        if(z_cordinate < 0) fucntionString += `flyBackward(${z_cordinate}, '${unit}'); `
        return fucntionString;
    } 

    // direction, degree, radius, unit 
    // circle_left
    javascriptGenerator.forBlock['circle_left'] = function(block) {
        const radius = block.getFieldValue('DISTANCE');
        const unit = block.getFieldValue('UNIT');

        return `rotateDrone('CIRCLE_LEFT', 360, ${radius}, '${unit}'); `;
    } 

    // circle_right
    javascriptGenerator.forBlock['circle_right'] = function(block) {
        const radius = block.getFieldValue('DISTANCE');
        const unit = block.getFieldValue('UNIT');

        return `rotateDrone('CIRCLE_RIGHT', 360, ${radius}, '${unit}'); `;
    } 

    // yaw_left
    javascriptGenerator.forBlock['yaw_left'] = function(block) {
        const degree = block.getFieldValue('DEGREE');
        return `rotateDrone('LEFT', ${degree}, null, null); `;
    } 

    // yaw_right
    javascriptGenerator.forBlock['yaw_right'] = function(block) {
        const degree = block.getFieldValue('DEGREE');
        return `rotateDrone('RIGHT', ${degree}, null, null); `;
    } 

    // arc_left
    javascriptGenerator.forBlock['arc_left'] = function(block) {
        const degree = block.getFieldValue('DEGREE');
        const distance = block.getFieldValue('DISTANCE');
        const unit = block.getFieldValue('UNIT');

        return `rotateDrone('ARC_LEFT', ${degree}, ${distance}, '${unit}'); `;
    } 

    // arc_right
    javascriptGenerator.forBlock['arc_right'] = function(block) {
        const degree = block.getFieldValue('DEGREE');
        const distance = block.getFieldValue('DISTANCE');
        const unit = block.getFieldValue('UNIT');
        
        return `rotateDrone('ARC_RIGHT', ${degree}, ${distance}, '${unit}'); `;
    } 
}

