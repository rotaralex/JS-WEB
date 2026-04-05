const bulb        = document.getElementById('bulb');
const btnOn       = document.getElementById('btnOn');
const btnOff      = document.getElementById('btnOff');
const statusBlock      = document.getElementById('status');
const typeSelect  = document.getElementById('typeSelect');
const brightBlock = document.getElementById('brightness-block');
const brightSlider= document.getElementById('brightSlider');
const brightVal   = document.getElementById('brightVal');
const timerInfo   = document.getElementById('timer-info');
 
let isOn          = false;
let currentType   = 'regular';
let inactivityTimer = null;
let countdownTimer  = null;
let secondsLeft   = 0;
 
const INACTIVITY_SECONDS = 5 * 60; 
 
function changeType() 
{
  currentType = typeSelect.value;
  if (isOn) {
    bulb.className = '';
    bulb.classList.add('on-' + currentType);
  }
  brightBlock.style.display = (currentType === 'led' && isOn) ? 'block' : 'none';
}
  
function turnOn() 
{
  isOn = true;
  bulb.className = '';
  bulb.classList.add('on-' + currentType);
 
  btnOn.disabled  = true;
  btnOff.disabled = false;
  statusBlock.textContent = 'Стан: увімкнено (' + typeSelect.options[typeSelect.selectedIndex].text + ')';
 
  brightBlock.style.display = currentType === 'led' ? 'block' : 'none';
 
  startInactivityTimer();
}
 
function turnOff()
{
  isOn = false;
  bulb.className = '';
  bulb.style.opacity = 1;
 
  btnOn.disabled  = false;
  btnOff.disabled = true;
  status.textContent = 'Стан: вимкнено';
  brightBlock.style.display = 'none';
 
  stopInactivityTimer();
  timerInfo.textContent = '';
}
  
function changeBrightness(val) {
  brightVal.textContent = val;
  bulb.style.opacity = val / 100;
}
 
function startInactivityTimer() {
  stopInactivityTimer();
  secondsLeft = INACTIVITY_SECONDS;
  updateTimerDisplay();
 
  countdownTimer = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      stopInactivityTimer();
      turnOff();
      status.textContent = 'Стан: вимкнено (авто — бездіяльність 5 хв)';
    }
  }, 1000);
}
 
function stopInactivityTimer() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}
 
function updateTimerDisplay() {
  if (!isOn) return;
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  timerInfo.textContent = `Авто-вимкнення через: ${m}:${String(s).padStart(2, '0')}`;
}
 

 
document.addEventListener('mousemove', resetInactivity);
document.addEventListener('keydown',   resetInactivity);
document.addEventListener('click',     clikcs);

function resetInactivity() {
  if (isOn) startInactivityTimer();
}

const clikcs = function resetInactivity() {
  if (isOn) startInactivityTimer();
}
 