const cardsContainer = document.querySelector(".wrapper");
const cards = document.querySelectorAll(".card");

const showCard = (e) => {
    cards.forEach((card) => card.style.width = "calc(100% / 5)");
    const clickedImage = e.target;
    cards.forEach((card) => card !== clickedImage ? card.style.width = "calc((100% - 40%) / 4)" : card.style.width = "40%");
}

cardsContainer.addEventListener('click', (e) => showCard(e));