const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lineWidthInput = document.getElementById("size");
const colorInput = document.getElementById("color");
const multicolorInput = document.getElementById("multicolor");

let isDrawing = false;
let isMulticolor = false;
let lastX = 170;
let lastY = 10;
let hue = 0;

canvas.width = window.innerWidth - 170;
canvas.height = window.innerHeight - 10;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth - 160;
    canvas.height = window.innerHeight - 10;
})

ctx.strokeStyle = colorInput.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = lineWidthInput.value;

function draw(e) {
    if (!isDrawing) return;
    if (multicolorInput.hasAttribute("checked")) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        hue++;
    } else {
        ctx.strokeStyle = colorInput.value;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    if (hue > 360) {
        hue = 0;
    }
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

const changeWidth = (e) => {
    ctx.lineWidth = e.target.value;
}
lineWidthInput.addEventListener("change", (e) => changeWidth(e));

const changeColor = (e) => {
    ctx.strokeStyle = e.target.value;
}
colorInput.addEventListener("change", (e) => changeColor(e));

const onMulticolor = (e) => {
    multicolorInput.toggleAttribute("checked");
    if (e.target.hasAttribute("checked")) {
        isMulticolor = true;
        colorInput.disabled = true;
    } else {
        isMulticolor = false;
        colorInput.disabled = false;
    }
}
multicolorInput.addEventListener("click", (e) => onMulticolor(e));
