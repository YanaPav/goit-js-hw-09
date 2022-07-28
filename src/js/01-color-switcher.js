const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let timerId = null
stopBtn.setAttribute('disabled', true)

startBtn.addEventListener('click', onStartBtnClick)

function onStartBtnClick() {
    startBtn.setAttribute('disabled', true)
    stopBtn.removeAttribute('disabled')
    timerId = setInterval(changeColor, 1000)
    stopBtn.addEventListener('click', onStopBtnClick)
}

function onStopBtnClick() {
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', true)
    clearInterval(timerId)
    startBtn.addEventListener('click', onStartBtnClick)
}

function changeColor() {
    document.body.style.backgroundColor =getRandomHexColor()
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


