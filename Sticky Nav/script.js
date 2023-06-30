const nav = document.getElementById("main");
const topOfNav = nav.offsetTop;

const fixNav = () => {
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + "px";
        document.body.classList.add("fixed");
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove("fixed");
    }
    console.log(topOfNav);
}

window.addEventListener("scroll", fixNav);