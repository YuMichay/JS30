window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recogrition = new SpeechRecognition();
recogrition.interimResults = true;

let p = document.createElement("p");
const screenResults = document.querySelector(".speech");
screenResults.appendChild(p);

recogrition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement("p");
        screenResults.appendChild(p);
    }
});

recogrition.addEventListener("end", () => recogrition.start());
recogrition.start()