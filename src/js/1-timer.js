import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    const now = new Date();

    if (date <= now) {
      iziToast.warning({
        message: "Please choose a date in the future",
        position: "topCenter",
        timeout: 2000,
      });
      startBtn.disabled = true;
      selectedDate = null;
    } else {
      selectedDate = date;
      startBtn.disabled = false;
    }
  },
};
flatpickr(inputEl, options);

function updateTimer() {
  const now = new Date();
  const diffMs = selectedDate - now;

  if (diffMs <= 0) {
    clearInterval(timerId);
    timerId = null;
    daysSpan.textContent = '00';
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';

    iziToast.info({
      message: "Time's up!",
      position: "topCenter",
    });
    inputEl.disabled = false;
    startBtn.disabled = true; 
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(diffMs);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  startBtn.disabled = true;
  inputEl.disabled = true;
  updateTimer();
  timerId = setInterval(updateTimer, 1000);
}

startBtn.addEventListener('click', startCountdown);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}