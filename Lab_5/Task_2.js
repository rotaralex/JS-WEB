const lightRed    = document.getElementById('light-red');
const lightYellow = document.getElementById('light-yellow');
const lightGreen  = document.getElementById('light-green');
const stateLabel  = document.getElementById('state-label');
const timerLabel  = document.getElementById('timer-label');
const btnStart    = document.getElementById('btnStart');
const btnStop     = document.getElementById('btnStop');
 
let durations = {
  red:    5,
  yellow: 3,
  green:  7
};

const STATES = ['red', 'yellow', 'green', 'blink-yellow'];
 
let currentStateIndex = 0;
let running   = false;
let stepTimer = null;    
let countdownTimer = null;
let secondsLeft = 0;
let blinkCount  = 0;
const BLINK_TIMES = 3;    
 
function clearAllLights() {
  lightRed.classList.remove('active');
  lightYellow.classList.remove('active', 'blink');
  lightGreen.classList.remove('active');
}
 
function setLight(state) {
  clearAllLights();
  if (state === 'red') {
    lightRed.classList.add('active');
    stateLabel.textContent = '🔴 ЧЕРВОНИЙ — стій!';
    stateLabel.style.color = 'red';
  } else if (state === 'yellow') {
    lightYellow.classList.add('active');
    stateLabel.textContent = '🟡 ЖОВТИЙ — увага!';
    stateLabel.style.color = 'goldenrod';
  } else if (state === 'green') {
    lightGreen.classList.add('active');
    stateLabel.textContent = '🟢 ЗЕЛЕНИЙ — йди!';
    stateLabel.style.color = 'green';
  } else if (state === 'blink-yellow') {
    lightYellow.classList.add('active', 'blink');
    stateLabel.textContent = '🟡 ЖОВТИЙ — мигає!';
    stateLabel.style.color = 'goldenrod';
  }
}
 
function updateDurationsTable() {
  document.getElementById('td-red').textContent    = durations.red;
  document.getElementById('td-yellow').textContent = durations.yellow;
  document.getElementById('td-green').textContent  = durations.green;
  const blinkTotal = BLINK_TIMES * 2 * 0.5; // 3 * 2 * 500ms
  document.getElementById('td-blink').textContent  = blinkTotal + ' (фіксовано)';
}
 
function runStep() {
  if (!running) return;
 
  const state = STATES[currentStateIndex];
  setLight(state);
 
  let duration;
  if (state === 'blink-yellow') {
  
    duration = BLINK_TIMES * 1000;
    timerLabel.textContent = `Залишилось: ${BLINK_TIMES} мигань`;
    
    let blinks = BLINK_TIMES;
    const blinkInfoTimer = setInterval(() => {
      blinks--;
      if (blinks > 0) timerLabel.textContent = `Залишилось: ${blinks} мигань`;
      else clearInterval(blinkInfoTimer);
    }, 1000);
  } else {
    duration = durations[state];
    secondsLeft = duration;
    updateCountdown();
    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      secondsLeft--;
      updateCountdown();
      if (secondsLeft <= 0) clearInterval(countdownTimer);
    }, 1000);
  }
 

  stepTimer = setTimeout(() => {
    currentStateIndex = (currentStateIndex + 1) % STATES.length;
    runStep();
  }, duration * 1000);
}
 
function updateCountdown() {
  timerLabel.textContent = `Залишилось: ${secondsLeft} сек`;
}
  
function startTrafficLight() {
  if (running) return;
  running = true;
  currentStateIndex = 0;
  btnStart.disabled = true;
  btnStop.disabled  = false;
  runStep();
}
 
function stopTrafficLight() {
  running = false;
  if (stepTimer) { clearTimeout(stepTimer); stepTimer = null; }
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  clearAllLights();
  stateLabel.textContent = '— зупинено —';
  stateLabel.style.color = '#333';
  timerLabel.textContent = '';
  btnStart.disabled = false;
  btnStop.disabled  = true;
}
 
function manualNext() {
  if (!running) {
    currentStateIndex = (currentStateIndex + 1) % STATES.length;
    setLight(STATES[currentStateIndex]);
    timerLabel.textContent = '(ручний режим)';
    return;
  }

  if (stepTimer) clearTimeout(stepTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  currentStateIndex = (currentStateIndex + 1) % STATES.length;
  runStep();
}
 
function changeDurations() {
  const wasRunning = running;
  if (wasRunning) stopTrafficLight();
 
  const r = prompt('Тривалість ЧЕРВОНОГО (сек):', durations.red);
  const y = prompt('Тривалість ЖОВТОГО (сек):',   durations.yellow);
  const g = prompt('Тривалість ЗЕЛЕНОГО (сек):',  durations.green);
 
  if (r !== null && !isNaN(+r) && +r > 0) durations.red    = +r;
  if (y !== null && !isNaN(+y) && +y > 0) durations.yellow = +y;
  if (g !== null && !isNaN(+g) && +g > 0) durations.green  = +g;
 
  updateDurationsTable();
 
  if (wasRunning) startTrafficLight();
}
 
updateDurationsTable();
 