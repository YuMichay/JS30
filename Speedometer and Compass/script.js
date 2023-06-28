const arrow = document.querySelector(".arrow");
const speed = document.getElementById("speed");

navigator.geolocation.watchPosition((data) => {
    speed.textContent = !data.coords.speed ? "0" : data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
    alert("You need to give the access for geolocation");
});