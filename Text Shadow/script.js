const wrapper = document.querySelector(".wrapper");
const text = document.querySelector("h1");
const step = 100;

const shadow = (e) => {
    const { offsetWidth: width, offsetHeight: height } = wrapper;
    let { offsetX: x, offsetY: y } = e;

    if (wrapper !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xStep = Math.round((x / width * step) - (step / 2));
    const yStep = Math.round((y / height * step) - (step / 2));
    text.style.textShadow = `${xStep}px ${yStep}px 0 #C70039,
    ${xStep * -1}px ${yStep}px 0 #217824,
    ${yStep}px ${xStep * -1}px 0 #785221,
    ${yStep * -1}px ${xStep}px 0 #287EA4`;
}

wrapper.addEventListener("mousemove", (e) => shadow(e));