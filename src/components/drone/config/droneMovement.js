
import * as THREE from 'three';
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




