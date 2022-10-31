import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      {
        Notiflix.Notify.failure('Будь-ласка виберіть дату в майбутньому !');
      }
    } else {
      buttonStartRef.disabled = false;
    }
  },
};

Notiflix.Notify.init({
  position: 'center-top',
  clickToClose: true,
});

const buttonStartRef = document.querySelector('[data-start]');
buttonStartRef.disabled = true;
const inputRef = document.querySelector('#datetime-picker');
const dayRef = document.querySelector('[data-days]');
const hourRef = document.querySelector('[data-hours]');
const minuteRef = document.querySelector('[data-minutes]');
const secondRef = document.querySelector('[data-seconds]');

buttonStartRef.addEventListener('click', onStartClick);

const calendar = flatpickr('#datetime-picker', options);

function onStartClick() {
  inputRef.addEventListener('click', () => {
    dayRef.textContent = '00';
    hourRef.textContent = '00';
    minuteRef.textContent = '00';
    secondRef.textContent = '00';
    clearInterval(intervalRef);
  });
  const intervalRef = setInterval(() => {
    const ms = calendar.selectedDates[0].getTime() - Date.now();
    if (
      calendar.selectedDates[0].getTime() / 1000 ===
      parseInt(Date.now() / 1000)
    ) {
      clearInterval(intervalRef);
      Notiflix.Notify.info('Час вийшов !');
      return;
    }
    updateTimer(convertMs(ms));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  dayRef.textContent = days < 10 ? '0' + days : days;
  hourRef.textContent = hours < 10 ? '0' + hours : hours;
  minuteRef.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondRef.textContent = seconds < 10 ? '0' + seconds : seconds;
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
