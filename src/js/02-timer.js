import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix'

const dateInput = document.querySelector('input#datetime-picker')
const startBtn = document.querySelector('[data-start]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

startBtn.setAttribute('disabled', true)

flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] - new Date() < 0) {
            Notiflix.Notify.failure('Please choose a date in the future')
            return
        }
        startBtn.removeAttribute('disabled')
        startBtn.addEventListener('click', onStartBtnClick)

        function onStartBtnClick() {
            dateInput.setAttribute('disabled', true)
            startBtn.setAttribute('disabled', true)

            setInterval(startTimer, 1000, selectedDates[0])
        }
    }
})

function startTimer(selectedTime) {
    const currentTime = selectedTime - new Date()

    if (currentTime < 0) return
    
    const convertTime = convertMs(currentTime)

    daysEl.textContent = addLeadingZero(convertTime.days)
    hoursEl.textContent = addLeadingZero(convertTime.hours)
    minutesEl.textContent = addLeadingZero(convertTime.minutes)
    secondsEl.textContent = addLeadingZero(convertTime.seconds)
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

  
