const moreBtns = document.querySelectorAll(".more-btn");
const lessBtns = document.querySelectorAll(".less-btn");
const facts = document.querySelectorAll(".facts");
const sections = document.querySelectorAll(".profile");
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerList = document.querySelector(".burger-list");
const header = document.querySelector("header");
const images = document.querySelectorAll(".profile__img");

const showFacts = () => {
    facts.forEach((list) => {
        list.querySelectorAll("li").forEach((fact, index) => {
            if (index > 10) {
                fact.style.display = "none";
            }
        })
    });
    moreBtns.forEach((btn) => btn.style.listStyle = "none");
}
showFacts();

const backScroll = (index) => {
    const point = sections[index].getClientRects()[0].top;
    window.scrollBy(0, point - 60);
}

const showMoreLess = (e) => {
    const showOrLessBtn = e.target.classList[0].slice(0,4);
    const clickedBtn = e.target.id.slice(e.target.id.length - 1);
    if (showOrLessBtn === "more") {
        facts[+clickedBtn].querySelectorAll("li").forEach((fact) => {
            fact.style.display = "";
        });
        moreBtns[+clickedBtn].style.display = "none";
        lessBtns[+clickedBtn].style.display = "block";
    } else if (showOrLessBtn === "less") {
        showFacts();
        moreBtns[+clickedBtn].style.display = "block";
        lessBtns[+clickedBtn].style.display = "none";
        backScroll(+clickedBtn);
    }
}
moreBtns.forEach((btn) => btn.addEventListener("click", (e) => showMoreLess(e)));
lessBtns.forEach((btn) => btn.addEventListener("click", (e) => showMoreLess(e))); 

const showBurger = () => {
    burgerMenu.classList.toggle("hide");
    burgerList.classList.toggle("hide");
    header.classList.toggle("overflow");
    burger.classList.toggle("opened");
}
burger.addEventListener("click", showBurger);
burgerList.addEventListener("click", showBurger);

const debounce = (func, wait = 15, immediate = true) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
};

const translateImages = () => {
    images.forEach((image) => {
        // starting point for showing image
        const scrollTo = (window.scrollY + window.innerHeight) - image.height / 2;
        const imageBottom = image.offsetTop + image.height;
        const ifHalfShown = scrollTo > image.offsetTop - 400;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (ifHalfShown && isNotScrolledPast) {
            image.classList.add("active");
        } else {
            image.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", debounce(translateImages));