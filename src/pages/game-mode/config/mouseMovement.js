let isMouseDown = false;
let startX, startY;

document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  startX = event.clientX;
  startY = event.clientY;
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const currentX = event.clientX;
    const currentY = event.clientY;

    // Check if the mouse has moved since mousedown
    if (currentX !== startX || currentY !== startY) {
      console.log('Mouse is being clicked and moved!');
    }
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

export const isMouseDownActive = () => {
  return isMouseDown;
};
