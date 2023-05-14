const keys = document.querySelectorAll(".key");

function playSound(event) {
  const keyCode = event.keyCode;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`div[data-key="${keyCode}"]`);
  key.classList.add("playing");
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

keys.forEach((key) => key.addEventListener("transitionend", () => key.classList.contains("playing") && key.classList.remove("playing")));
window.addEventListener("keydown", playSound);