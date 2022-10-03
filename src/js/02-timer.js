// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

startBtn.setAttribute('disabled', true);
inputRef.addEventListener('change', onDateSelecting);
startBtn.addEventListener('click', onStartTimer);

let dateTimePicker = flatpickr('#datetime-picker', options);
let isActive = false;

function onDateSelecting() {
  const interval = dateTimePicker.selectedDates[0] - Date.now();

  if (interval <= 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  if (dateTimePicker.selectedDates[0] && !isActive) {
    startBtn.removeAttribute('disabled');
  }
}

function onStartTimer() {

  inputRef.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  let deltaTime = 0;
  const selectedDate = dateTimePicker.selectedDates[0];

  let intervalId = setInterval(() => {
   
    deltaTime = selectedDate - Date.now();
    if (deltaTime > 0) {
      updateTimer(convertMs(deltaTime));
      return isActive = true;
    }
    clearInterval(intervalId);
    Notify.success('Тimer is over!');
  }, 1000);
  
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minRef.textContent = addLeadingZero(minutes);
  secRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}