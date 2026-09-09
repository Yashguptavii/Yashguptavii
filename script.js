const modes = document.querySelectorAll('.mode');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const heading = document.querySelector('#timer-heading');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const soundButton = document.querySelector('.sound-button');

let totalSeconds = 25 * 60;
let remaining = totalSeconds;
let interval;

function render() {
  minutesEl.textContent = String(Math.floor(remaining / 60)).padStart(2, '0');
  secondsEl.textContent = String(remaining % 60).padStart(2, '0');
}

function stopTimer() {
  clearInterval(interval);
  interval = undefined;
  document.body.classList.remove('running');
  startButton.lastElementChild.textContent = 'Start focus';
}

function toggleTimer() {
  if (interval) return stopTimer();
  interval = setInterval(() => {
    if (remaining <= 0) return stopTimer();
    remaining -= 1;
    render();
  }, 1000);
  document.body.classList.add('running');
  startButton.lastElementChild.textContent = 'Pause focus';
}

modes.forEach((mode) => mode.addEventListener('click', () => {
  modes.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  mode.classList.add('active');
  mode.setAttribute('aria-selected', 'true');
  totalSeconds = Number(mode.dataset.minutes) * 60;
  remaining = totalSeconds;
  heading.textContent = `${mode.textContent} session`;
  stopTimer();
  render();
}));

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', () => { stopTimer(); remaining = totalSeconds; render(); });
soundButton.addEventListener('click', () => soundButton.setAttribute('aria-pressed', String(soundButton.getAttribute('aria-pressed') !== 'true')));
document.addEventListener('keydown', (event) => { if (event.code === 'Space' && event.target === document.body) { event.preventDefault(); toggleTimer(); } });
render();
