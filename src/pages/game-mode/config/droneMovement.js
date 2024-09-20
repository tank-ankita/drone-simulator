// droneMovement.js

export const droneTakeOff = (moveDroneUp, keys) => {
  console.log("Moving drone....", moveDroneUp);

  // Set up a delay to start the takeoff process
  setTimeout(() => {
    keys.current["u"] = true;
    console.log("Takeoff initiated");

    // Simulate the drone staying in the air for 2 seconds, then stop the takeoff
    setTimeout(() => {
      keys.current["u"] = false;
      console.log("Takeoff completed after 2 seconds");
    }, 2000); // 2 seconds takeoff duration
  }, moveDroneUp * 1000); // Delay based on the moveDroneUp parameter
};
