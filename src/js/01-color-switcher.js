function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
body.style.margin = "0 auto";
body.style.textAlign = "center";
const buttons = document.querySelectorAll('button');
buttons.forEach(but => {
        but.style.width = "300px"
        but.style.height = "150px"
        but.style.fontSize = "30px"
    }
);
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
stopButton.disabled = true;

const color = getRandomHexColor();
let timerId;

startButton.addEventListener("click", () => {
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
      startButton.disabled = true;
      stopButton.disabled = false;
  }, 1000);
    console.log("Починаю роботу");
});


stopButton.addEventListener("click", () => {
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
    console.log("Зупиняю роботу");
});

