const input = document.querySelector(".search");
const listField = document.querySelector(".results");
const mapField = document.getElementById("map");

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
.then((response) => response.json())
.then((data) => cities.push(...data));

function initMap(latitude, longitude) {
    const uluru = { lat: Number(latitude) || 38.894106281215535, lng: Number(longitude) || -77.00914642576586 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
}

const findResult = (value) => {
    const regExp = new RegExp(value, "gi");
    return cities.filter((place) => {
        return place.city.match(regExp) || place.state.match(regExp)
    });
}

const displayResults = () => {
    listField.style.display = "block";
    mapField.style.display = "none";
    listField.innerHTML = "";
    const matchArray = findResult(input.value);
    matchArray.map((place) => {
        const li = document.createElement("li");
        const regex = new RegExp(input.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${input.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${input.value}</span>`);
        li.innerHTML = `
            <span>${cityName}, ${stateName}</span>
            <span>${new Intl.NumberFormat().format(place.population)}</span>
        `;
        li.addEventListener('click', () => {
            listField.style.display = "none";
            mapField.style.display = "block";
            window.initMap(place.latitude, place.longitude);
        })
        listField.appendChild(li);
    })
}

input.addEventListener("keyup", displayResults);