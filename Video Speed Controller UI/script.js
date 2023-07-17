//player
const videoContainer = document.querySelector(".video-player");
const video = document.querySelector("video");
const controlPanel = document.querySelector(".controls");
const playCenterBtn = document.querySelector(".play-btn");
const playControlsBtn = document.querySelector(".controls__play");
const volumeBtn = document.querySelector(".controls__volume_image");
const volumeInput = document.querySelector(".controls__volume_range");
const speedInput = document.querySelector(".controls__speed_range");
const speedContent = document.getElementById("speed");
const downloadBtn = document.querySelector(".controls__download_image");
const fullscreenBtn = document.querySelector(".controls__fullscreen_image");
const progressBar = document.querySelector(".progress-bar");
const progressBarMark = document.querySelector(".progress-bar_filled");
const watchedTime = document.querySelector(".watched-time");
const generalTime = document.querySelector(".general-time");

let intervalId;

// progress bar view
const updateProgressBar = () => {
    const time = video.currentTime.toFixed(0);
    const progressBarPoint = ((+time / video.duration.toFixed(0)) * progressBar.clientWidth).toFixed(0);
    progressBarMark.style.width = `${progressBarPoint}px`;
    if (time < 10) {
        watchedTime.textContent = `00:0${time}`;
    } else if (time < 60 && time > 9) {
        watchedTime.textContent = `00:${time}`;
    } else if (time > 59) {
        const videoDuration = (video.currentTime / 60).toFixed(2).split(".");
        watchedTime.textContent = `${videoDuration[0] < 10 ? `0${videoDuration[0]}` : videoDuration[0] }:${videoDuration[1]}`;
    }
}
video.addEventListener("timeupdate", updateProgressBar);

const changeTime = (e) => {
    progressBarMark.style.width = `${e.offsetX}px`;
    const clickedTime = (e.offsetX / progressBar.clientWidth).toFixed(2) * 100;
    const duration = +video.duration.toFixed(0);
    video.currentTime = (clickedTime / 100) * duration;
}
progressBar.addEventListener("click", (e) => changeTime(e));

// play pause
const playCenter = () => {
    playCenterBtn.style.display = "none";
    playControlsBtn.style.background = `url("./assets/pause.svg")`;
    playControlsBtn.classList.add("play");
    video.play();
    controlPanel.style.bottom = "0";
    const videoDuration = (video.duration / 60).toFixed(2).split(".");
    generalTime.textContent = `${videoDuration[0] < 10 ? `0${videoDuration[0]}` : videoDuration[0] }:${videoDuration[1]}`;
}
playCenterBtn.addEventListener("click", playCenter);

const playPause = (e) => {
    const btn = e === playControlsBtn ? playControlsBtn : e.target;
    if (btn.classList.contains("play")) {
        playCenterBtn.style.display = "block";
        playControlsBtn.classList.remove("play");
        playControlsBtn.style.background = `url("./assets/play.svg")`;
        video.pause();
        clearInterval(intervalId);
        controlPanel.style.bottom = "-2rem";
    } else if (!btn.classList.contains("play")) {
        playCenterBtn.style.display = "none";
        playControlsBtn.classList.add("play");
        playControlsBtn.style.background = `url("./assets/pause.svg")`;
        video.play();
        updateProgressBar();
    }
}
playControlsBtn.addEventListener("click", (e) => playPause(e));
video.addEventListener("click", () => {
    if (playControlsBtn.classList.contains("play")) {
        playPause(playControlsBtn);
    }
})
video.addEventListener("ended", () => {
    playControlsBtn.classList.add("play");
    playPause(playControlsBtn);
    watchedTime.textContent = "00:00";
    clearInterval(intervalId);
});

// volume
const muteUnmute = (e) => {
    const btn = e === volumeBtn ? volumeBtn : e.target;
    if (btn.classList.contains("mute")) {
        btn.classList.remove("mute");
        volumeBtn.style.background = `url("./assets/volume-2.svg")`;
        +volumeInput.value === 0 ? volumeInput.value = 1 : volumeInput.value;
    } else if (!btn.classList.contains("mute")) {
        btn.classList.add("mute");
        volumeBtn.style.background = `url("./assets/volume-x.svg")`;
        volumeInput.value = 0;
    }
    video.volume = volumeInput.value;
}
volumeBtn.addEventListener("click", (e) => muteUnmute(e));

const changeVolume = () => {
    if (+volumeInput.value === 0) {
        muteUnmute(volumeBtn);
    } else if (+volumeInput.value > 0) {
        volumeBtn.classList.add("mute");
        muteUnmute(volumeBtn);
    }
}
volumeInput.addEventListener("change", changeVolume);

// speed
const changeSpeed = () => {
    speedContent.textContent = `${speedInput.value}x`;
    video.playbackRate = speedInput.value;
}
speedInput.addEventListener("change", changeSpeed);

// download
const downloadVideo = () => {
    const anchorElement = document.createElement("a");
    anchorElement.href = video.src;
    anchorElement.download = "video";

    document.body.appendChild(anchorElement);
    anchorElement.click();
    
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(video.src);
}
downloadBtn.addEventListener("click", downloadVideo);

// fullscreen
const fullscreenOn = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
}
fullscreenBtn.addEventListener("click", fullscreenOn);

const updateControls = () => {
    if (document.fullscreenElement) {
        video.style.width = "100%";
        controlPanel.style.width = "99.4%";
        controlPanel.style.backgroundColor = "black";
        playCenterBtn.style.backgroundColor = "black";
        fullscreenBtn.style.background = `url("./assets/minimize.svg")`;
        progressBarMark.style.backgroundColor = "#23300c";
    } else {
        video.style.width = "50%";
        controlPanel.style.width = "49.5%";
        controlPanel.style.backgroundColor = "rgba(35, 48, 12, 0.8)";
        playCenterBtn.style.backgroundColor = "rgba(35, 48, 12, 0.8)";
        fullscreenBtn.style.background = `url("./assets/maximize.svg")`;
        progressBarMark.style.backgroundColor = "rgb(3, 3, 3)";
    }
}
videoContainer.addEventListener("fullscreenchange", updateControls);