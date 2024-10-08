// droneMovement.js
// if (keys.current.w) velocity.current.z -= speed; // Forward
// if (keys.current.s) velocity.current.z += speed; // Backward
// if (keys.current.a) velocity.current.x -= speed; // Left
// if (keys.current.d) velocity.current.x += speed; // Right
// if (keys.current.u) velocity.current.y += speed; // Up
// if (keys.current.p) velocity.current.y -= speed; // Down

const BUFFER = 10;
const DISTANCE = {
  'INCHES': 0.393701,
  'CM': 1
}

function waitForSeconds(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function doNothingFor(waitTime) {
  console.log("Doing nothing...");
  
  // Wait for 10 seconds
  await waitForSeconds(waitTime);

  console.log("10 seconds later, done doing nothing!");
}

export const createWait = (waitTime) => {
  doNothingFor(waitTime)
}



