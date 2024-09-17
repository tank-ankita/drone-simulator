// droneUtils.js

export const droneTakeOff = (delay, controls) => {
    console.log("delaying takeoff by ", delay);
  
    setTimeout(() => {
      controls["s"] = true;  
      console.log("Takeoff initiated");
  
      setTimeout(() => {
        controls["s"] = false;  
        console.log("Takeoff completed after 2 seconds");
      }, 2000); 
    }, delay * 1000);
  };
  
  