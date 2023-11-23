document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('transitionCanvas');
  const ctx = canvas.getContext('2d');
  const button = document.getElementById('transitionButton');
  const transitionDuration = 1000;
  const totalRectangles = 12;
  const mobileScreenWidth = 890;
  let rectangles = [];
  let startTime = null;

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const baseWidth = canvas.width / totalRectangles;
    const extraWidth = canvas.width * 0.4;
    const widthFactors = [1, 1, 1.5, 2.5, 3.5, 2.5, 2, 1.8, 1.5, 1.5, 1, 1];

    rectangles = [];

    let currentX = -extraWidth / 2;
    widthFactors.forEach((factor, index) => {
      const rectWidth = baseWidth * factor;
      rectangles.push({
        x: currentX,
        width: rectWidth,
        height: canvas.height * 1.5,
        rotation: 0
      });
      currentX += rectWidth;
    });
    rectangles[rectangles.length - 1].width += extraWidth / 2;
  }
  resizeCanvas();

  button.addEventListener('click', () => {
    canvas.style.zIndex = 1001;
    startTime = performance.now();
    animate(startTime);
  });

  function easeInCubic(t) {
    return t * t * t;
  }

  function animate(currentTime) {
    if (!startTime) return;

    const timeElapsed = currentTime - startTime;
    const elapsedTimeRatio = Math.min(timeElapsed / transitionDuration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#273b44';

    rectangles.forEach((rect, index) => {
      const currentWidth = elapsedTimeRatio * rect.width;
      const currentRotation = (canvas.width > mobileScreenWidth) ? easeInCubic(elapsedTimeRatio) * 20 * Math.PI / 180 : 0;

      ctx.save();
      ctx.translate(rect.x + rect.width / 2, canvas.height / 2);
      ctx.rotate(currentRotation);
      ctx.fillRect(-currentWidth / 2, -rect.height / 2, currentWidth, rect.height);
      ctx.restore();
    });

    if (timeElapsed < transitionDuration) {
      requestAnimationFrame(animate);
    } else {
      window.location.href = 'Events.html';
    }
  }
});