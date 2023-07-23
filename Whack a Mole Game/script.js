const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const score = document.querySelector(".score");
const startBtn = document.querySelector(".start_btn");
const overlay = document.querySelector(".overlay");
const end = document.querySelector(".end");
const popUp = document.querySelector(".popup");
const result = document.querySelector(".result");

let lastHole;
let timeUp = false;

const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomHole = () => {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) return randomHole();

    lastHole = hole;

    return hole;
}

const peep = () => {
    const time = randomTime(200, 1000);
    const hole = randomHole();
    hole.classList.add("up");

    setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) peep();
    }, time);
}

const startGame = () => {
    score.textContent = 0;
    timeUp = false;
    popUp.classList.add("hidden");
    overlay.classList.add("hidden");
    overlay.classList.add("hidden");
    peep();
    setTimeout(() => {
        timeUp = true;
        result.textContent = score.textContent;
        popUp.classList.remove("hidden");
        overlay.classList.remove("hidden");
        end.classList.remove("hidden");
    }, 13000);
}
startBtn.addEventListener("click", startGame);

const bonk = (e) => {
    if (!e.isTrusted) return;
    score.textContent = +score.textContent + 1;
    e.target.parentNode.classList.remove("up");
}
moles.forEach((mole) => mole.addEventListener("click", (e) => bonk(e)));