const settingsBtn = document.querySelector(".settings");
const settingsWindow = document.querySelector(".settings-window");
const overlay = document.querySelector(".overlay");
const btns = settingsWindow.querySelectorAll("button");
const watches = document.querySelectorAll(".watches");
const digits = document.querySelector(".origin-digits");
const arrowHours = document.querySelector(".arrow-hours");
const arrowMinutes = document.querySelector(".arrow-minutes");
const arrowSeconds = document.querySelector(".arrow-seconds");
const digitsHours = document.querySelector(".hours");
const digitsMinutes = document.querySelector(".minutes");
const digitsSeconds = document.querySelector(".seconds");

const openSettings = () => {
    if (!settingsWindow.classList.contains("opened")) {
        settingsWindow.classList.add("opened");
        settingsWindow.style.animation = "open 1s";
        overlay.style.display = "block";
    } else {
        closeSettings();
    }
}

const closeSettings = () => {
    settingsWindow.style.animation = "close 1s";
    setTimeout(() => {
        settingsWindow.classList.remove("opened");
        overlay.style.display = "none";
    }, 950);
}

settingsBtn.addEventListener('click', openSettings);
overlay.addEventListener('click', closeSettings);

const changeView = (e) => {
    watches.forEach((view) => view.classList.remove("chosen"));
    const clickedBtn = e.target.textContent.toLowerCase();
    if (clickedBtn === "origin") {
        watches[0].classList.add("chosen");
        digits.style.display = "block";
    } else if (clickedBtn === "modern") {
        watches[0].classList.add("chosen");
        digits.style.display = "none";
    } else if (clickedBtn === "digit") {
        watches[1].classList.add("chosen");
    }
    closeSettings();
}
settingsWindow.addEventListener('click', (e) => changeView(e));

const setTime = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const chosenWatches = document.querySelector(".chosen");
    if (chosenWatches.classList.contains("origin")) {
        const secondsDegrees = ((seconds / 60) * 360) - 90;
        arrowSeconds.style.transform = `rotate(${secondsDegrees}deg)`;
    
        const minutesDegrees = ((minutes / 60) * 360) - 90;
        arrowMinutes.style.transform = `rotate(${minutesDegrees}deg)`;
    
        const hoursDegrees = ((hours / 12) * 360) - 90;
        arrowHours.style.transform = `rotate(${hoursDegrees}deg)`;
    } else {
        digitsHours.textContent = hours < 10 ? `0${hours}` : hours;
        digitsMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
        digitsSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
}

setTime();
setInterval(() => setTime(), 1000);