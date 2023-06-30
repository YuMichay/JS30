const message = new SpeechSynthesisUtterance();
const voicesDropdown = document.getElementById("voice");
const options = document.querySelectorAll('[type="range"], textarea');
const speakButton = document.querySelector('.speak');
const stopButton = document.querySelector('.stop');

let voices = [];

message.text = document.querySelector("textarea").value || document.querySelector("textarea").placeholder;

const getVoices = (e) => {
    voices = e.target.getVoices();
    voicesDropdown.innerHTML = voices.map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
}

const setVoice = (e) => {
    message.voice = voices.find((voice) => voice.name === e.target.value);
    toggle();
}

const toggle = (startOver = true) => {
    speechSynthesis.cancel();

    if (!message.voice) {
        message.voice = voices.find((voice) => voice.name === voicesDropdown.firstChild.value);
    }

    if (startOver) {
        speechSynthesis.speak(message);
    }
}

const setOption = (e) => {
    const input = e.target;
    message[input.name] = input.value;
    toggle();
}

speechSynthesis.addEventListener("voiceschanged", (e) => getVoices(e));
voicesDropdown.addEventListener("change", (e) => setVoice(e));
options.forEach((option) => option.addEventListener("change", (e) => setOption(e)));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));