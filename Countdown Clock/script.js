const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const inputs = document.querySelectorAll("input");
const hoursInput = document.querySelector(".option_hours");
const minutesInput = document.querySelector(".option_minutes");
const secondsInput = document.querySelector(".option_seconds");
const timeField = document.querySelector(".time");
const plusBtn = document.querySelectorAll(".top");
const minusBtn = document.querySelectorAll(".bottom");
const finishTime = document.querySelector(".finish");
const audio = document.querySelector("audio");

let timer;
let chosenTime;
let isPaused = false;

const showEmptyInput = () => {
    inputs.forEach((input) => {
        if (!input.value || +input.value === 0) {
            input.style.border = `0.0625rem solid rgb(190, 22, 22)`;
            setTimeout(() => input.style.border = "none", 1000);
        }
    })
}

const showTime = (time) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (time > 0 && time > 3599) {
        hours = Math.floor(time / 3600);
        minutes = Math.floor(time % 3600 / 60);
        seconds = Math.floor(time % 3600 % 60);
    } else if (time > 0 && time > 59) {
        minutes = Math.floor(time / 60);
        seconds = Math.floor(time % 60);
    } else if (time > 0) {
        seconds = time;
    }

    timeField.textContent = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

const countTime = (btnType) => {
    if (btnType === "start") {
        chosenTime = +hoursInput.value * 3600 + +minutesInput.value * 60 + +secondsInput.value;
    } else if (btnType === "pause") {
        const pausedTime = timeField.textContent.split(":");
        chosenTime = +pausedTime[0] * 3600 + +pausedTime[1] * 60 + +pausedTime[2];
    }
    showTime(chosenTime);
    const now = Date.now();
    const then = now + chosenTime * 1000;
    const end = new Date(then);
    const finishHour = end.getHours() < 10 ? "0" + end.getHours() : end.getHours();
    const finishMinutes = end.getMinutes() < 10 ? "0" + end.getMinutes() : end.getMinutes();
    finishTime.innerHTML = `<img src='./assets/bell.svg' alt='bell'></img><span>${finishHour} : ${finishMinutes}</span>`;
    
    timer = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        if (secondLeft < 0) {
            window.clearInterval(timer);
            stopTimer();
            audio.play();
        }
        showTime(secondLeft);
    }, 1000);
}

const stopTimer = (btn = stopBtn) => {
    if (btn === stopBtn) {
        showTime(0);
        window.clearInterval(timer);
        stopBtn.setAttribute("disabled", "true");
        isPaused = false;
        plusBtn.forEach((btn) => btn.style.display = "block");
        minusBtn.forEach((btn) => btn.style.display = "block");
        finishTime.innerHTML = "";
    } else if (btn === pauseBtn) {
        window.clearInterval(timer);
        isPaused = true;
    }
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
}
stopBtn.addEventListener("click", (e) => stopTimer(e.target));
pauseBtn.addEventListener("click", (e) => stopTimer(e.target));

const startTimer = () => {
    const isInputFull = [...inputs].filter((input) => +input.value > 0).length > 0
    && (hoursInput.value > 0 || minutesInput.value > 0 || secondsInput.value > 0);
    if (!isInputFull) {
        return showEmptyInput();
    } else if (isPaused) {
        countTime("pause");
        isPaused = false;
    } else {
        countTime("start");
    }
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    stopBtn.removeAttribute("disabled");
    plusBtn.forEach((btn) => btn.style.display = "none");
    minusBtn.forEach((btn) => btn.style.display = "none");
}
startBtn.addEventListener("click", startTimer);

const changeTimeValue = (e) => {
    const changedElement = e.target.classList[0].split("_")[1];
    const input = document.querySelector(`input[name="${changedElement}"]`);

    if (e.target.classList.contains("top") && input.value < 59) {
        input.value++;
    } else if (e.target.classList.contains("bottom") && input.value > 0) {
        input.value--;
    }
}

plusBtn.forEach((btn) => btn.addEventListener("click", (e) => changeTimeValue(e)));
minusBtn.forEach((btn) => btn.addEventListener("click", (e) => changeTimeValue(e)));