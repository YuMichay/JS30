const input = document.querySelector(".search");
const listField = document.querySelector(".results");

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
.then((response) => response.json())
.then((data) => cities.push(...data));

const findResult = (value) => {
    const regExp = new RegExp(value, "gi");
    return cities.filter((place) => {
        return place.city.match(regExp) || place.state.match(regExp)
    });
}

const displayResults = () => {
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
        listField.appendChild(li);
    })
}

input.addEventListener("keyup", displayResults);