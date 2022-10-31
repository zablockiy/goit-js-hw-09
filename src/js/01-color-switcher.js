
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', changeBackgrColor);
buttonStop.addEventListener('click', stopChangeBackgrColor);
let changeColorInterval = null;

function changeBackgrColor() {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  changeColorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeBackgrColor() {
  buttonStart.disabled = false;

  clearInterval(changeColorInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
