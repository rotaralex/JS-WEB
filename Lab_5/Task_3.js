
const clockHM  = document.getElementById('clock-hm');
const clockSec = document.getElementById('clock-seconds');
 
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
 
  clockHM.textContent  = h + ':' + m;
  clockSec.textContent = s;
 
  if (now.getSeconds() % 2 === 0) {
    clockSec.classList.add('blink');
  } else {
    clockSec.classList.remove('blink');
  }
}
 
setInterval(updateClock, 1000);
updateClock();
 
const countdownDisplay = document.getElementById('countdown-display');
let countdownInterval = null;
 
function startCountdown() {
  const val = document.getElementById('target-datetime').value;
  if (!val) {
    alert('Будь ласка, оберіть дату та час!');
    return;
  }
 
  const targetDate = new Date(val);
  if (isNaN(targetDate.getTime())) {
    alert('Невірний формат дати!');
    return;
  }
 
  stopCountdown(); 
 
  function tick() {
    const now  = new Date();
    const diff = targetDate - now; 

    if (diff <= 0) {
      countdownDisplay.textContent = ' Час вийшов!';
      stopCountdown();
      return;
    }
 
    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600)  / 60);
    const seconds = totalSeconds % 60;
 
    countdownDisplay.textContent =
      `${days}д ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }
 
  tick();
  countdownInterval = setInterval(tick, 1000);
}
 
function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}
 
const calendarEl   = document.getElementById('calendar');
const monthPicker  = document.getElementById('month-picker');
 
const todayGlobal = new Date();
monthPicker.value = todayGlobal.getFullYear() + '-' +
                    String(todayGlobal.getMonth() + 1).padStart(2, '0');
 
function renderCalendar(monthStr) {
  
  if (!monthStr) return;
 
  const [year, month] = monthStr.split('-').map(Number);
  const today = new Date();
 
  const firstDay  = new Date(year, month - 1, 1);
  const lastDay   = new Date(year, month, 0);
  const startDow  = (firstDay.getDay() + 6) % 7; 
 
  const monthNames = [
    'Січень','Лютий','Березень','Квітень','Травень','Червень',
    'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
  ];
 
  let html = `<strong>${monthNames[month - 1]} ${year}</strong>`;
  html += '<table><tr>';
  ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].forEach(d => { html += `<th>${d}</th>`; });
  html += '</tr><tr>';
 
  for (let i = 0; i < startDow; i++) html += '<td></td>';
 
  let dow = startDow;
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const isToday = (d === today.getDate() && month - 1 === today.getMonth() && year === today.getFullYear());
    html += `<td class="${isToday ? 'today' : ''}">${d}</td>`;
    dow++;
    if (dow === 7 && d < lastDay.getDate()) { html += '</tr><tr>'; dow = 0; }
  }
 
  html += '</tr></table>';
  calendarEl.innerHTML = html;
}
 
renderCalendar(monthPicker.value);
 
const birthdayResult = document.getElementById('birthday-result');
 
function calcBirthday() {
  const val = document.getElementById('birthday-input').value;
  if (!val) { alert('Оберіть дату народження!'); return; }
 
  const now  = new Date();
  const bday = new Date(val);
 
  let nextBday = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
  if (nextBday <= now) {
    nextBday = new Date(now.getFullYear() + 1, bday.getMonth(), bday.getDate());
  }
 
  const diffMs      = nextBday - now;
  const totalSeconds= Math.floor(diffMs / 1000);
  const totalMinutes= Math.floor(totalSeconds / 60);
  const totalHours  = Math.floor(totalMinutes  / 60);
  const totalDays   = Math.floor(totalHours    / 24);
  const months      = Math.floor(totalDays     / 30); 
  const days        = totalDays  % 30;
  const hours       = totalHours % 24;
  const minutes     = totalMinutes % 60;
  const seconds     = totalSeconds % 60;
 
  const age = now.getFullYear() - bday.getFullYear();
 
  birthdayResult.innerHTML =
    ` Ваш вік: <strong>${age} років</strong><br>` +
    ` Наступний день народження: <strong>${nextBday.toLocaleDateString('uk-UA')}</strong><br>` +
    ` До дня народження залишилось:<br>` +
    `&nbsp;&nbsp;≈ ${months} міс. ${days} дн. ${hours} год. ${minutes} хв. ${seconds} сек.`;
 
  if (window._bdayTimer) clearInterval(window._bdayTimer);
  window._bdayTimer = setInterval(() => {
    const now2 = new Date();
    const diff2 = nextBday - now2;
    if (diff2 <= 0) { clearInterval(window._bdayTimer); return; }
    const ts2 = Math.floor(diff2/1000);
    const tm2 = Math.floor(ts2/60);
    const th2 = Math.floor(tm2/60);
    const td2 = Math.floor(th2/24);
    const mo2 = Math.floor(td2/30);
    birthdayResult.innerHTML =
      ` Ваш вік: <strong>${age} років</strong><br>` +
      ` Наступний день народження: <strong>${nextBday.toLocaleDateString('uk-UA')}</strong><br>` +
      ` До дня народження залишилось:<br>` +
      `&nbsp;&nbsp;≈ ${mo2} міс. ${td2%30} дн. ${th2%24} год. ${tm2%60} хв. ${ts2%60} сек.`;
  }, 1000);
}
 