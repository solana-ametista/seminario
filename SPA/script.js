let isDragging = false;
let initialX = 0;
let offsetX = 0;

function updateTime(time) {
  const handle = document.querySelector('.handle');
  const sunMoon = document.querySelector('.sun-moon');
  const body = document.querySelector('body');

  const handlePosition = (time / 24) * 100;
  handle.style.left = `${handlePosition}%`;

  const sunMoonPosition = `calc(${handlePosition}% - 50px)`;
  sunMoon.style.left = sunMoonPosition;

  if (time >= 18 || time < 6) {
    body.classList.add('bg-night');
    sunMoon.style.backgroundColor = 'white';
  } else {
    body.classList.remove('bg-night');
    sunMoon.style.backgroundColor = 'yellow';
  }
}

function handleBarClick(event) {
  const bar = document.querySelector('.bar');
  const barRect = bar.getBoundingClientRect();

  const mouseX = event.clientX - barRect.left;
  const time = Math.round((mouseX / barRect.width) * 24);

  updateTime(time);
}

function handleBarMouseDown(event) {
  isDragging = true;
  initialX = event.clientX - offsetX;
}

function handleBarMouseUp(event) {
  if (isDragging) {
    const bar = document.querySelector('.bar');
    const barRect = bar.getBoundingClientRect();

    const finalX = event.clientX - offsetX;
    const deltaX = finalX - initialX;
    const timePerPixel = 24 / barRect.width;
    const timeDelta = Math.round(deltaX * timePerPixel);

    const handle = document.querySelector('.handle');
    const handleRect = handle.getBoundingClientRect();
    const handlePosition = handleRect.left - barRect.left + (deltaX / barRect.width) * handleRect.width;
    const newHandlePosition = Math.max(0, Math.min(barRect.width - handleRect.width, handlePosition));
    const newTime = Math.round((newHandlePosition / (barRect.width - handleRect.width)) * 24) + timeDelta;

    updateTime(newTime);
  }

  isDragging = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.bar');
  const barRect = bar.getBoundingClientRect();
  offsetX = barRect.left;

  bar.addEventListener('mousedown', handleBarMouseDown);
  bar.addEventListener('mouseup', handleBarMouseUp);
  bar.addEventListener('mouseleave', handleBarMouseUp);

  bar.addEventListener('click', handleBarClick);
});
