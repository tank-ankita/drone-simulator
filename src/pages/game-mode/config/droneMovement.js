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

export const moveDroneUp = (moveDronePosY, keys) => {
  const droneDistance = moveDronePosY * 1000;

  setTimeout(() => {
    keys.current.u = true;
    console.log("t o")
    setTimeout(() => { keys.current.u = false; }, droneDistance + BUFFER ); 
  }, droneDistance); 
};


export const moveDroneForward = (moveDronePosZ, keys) => {
  const droneDistance = moveDronePosZ[0] * DISTANCE[moveDronePosZ[1]] * 1000;

  setTimeout(() => {
    keys.current.w = true;
    console.log("m f")
    setTimeout(() => { keys.current.w = false; }, droneDistance + BUFFER);
  }, droneDistance); 
};


export const moveDroneBackward = (moveDroneNegZ, keys) => {
  const droneDistance = moveDroneNegZ[0] * DISTANCE[moveDroneNegZ[1]] * 1000;

  setTimeout(() => {
    keys.current.s = true;
    console.log("m b")
    setTimeout(() => { keys.current.s = false; }, droneDistance + BUFFER);
  }, droneDistance); 
};

export const moveDroneLeft = (moveDroneNegX, keys) => {
  const droneDistance = moveDroneNegX[0] * DISTANCE[moveDroneNegX[1]] * 1000;

  setTimeout(() => {
    keys.current.a = true;
    console.log("m l")
    setTimeout(() => { keys.current.a = false; }, droneDistance + BUFFER);
  }, droneDistance); 
};

export const moveDroneRight = (moveDronePosX, keys) => {
  const droneDistance = moveDronePosX[0] * DISTANCE[moveDronePosX[1]] * 1000;

  setTimeout(() => {
    keys.current.d = true;
    console.log("m r")
    setTimeout(() => { keys.current.d = false; }, droneDistance + BUFFER);
  }, droneDistance); 
};
