const pictureLoaded = document.getElementById("picture");
const image = document.getElementById("image");
const sepiaEffect = document.getElementById("sepia");
const brightnessEffect = document.getElementById("brightness");
const contrastEffect = document.getElementById("contrast");
const grayscaleEffect = document.getElementById("grayscale");
const saturateEffect = document.getElementById("saturate");
const settings = [sepiaEffect, brightnessEffect, contrastEffect, grayscaleEffect, saturateEffect];
const downloadBtn = document.querySelector(".download");

const addImage = () => {
    image.src = URL.createObjectURL(pictureLoaded.files[0]);
    image.crossOrigin = "anonymous";
}
pictureLoaded.addEventListener('change', addImage);

const filterImage = (e) => {
    const suffix = e.target.dataset.sizing || '';
    image.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
}
settings.forEach((effect) => effect.addEventListener('change', (e) => filterImage(e)));

const downloadImage = async() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    context.filter = getComputedStyle(image).filter;
    context.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
    const imageURL = URL.createObjectURL(blob);

    const anchorElement = document.createElement("a");
    anchorElement.href = imageURL;
    anchorElement.download = "filtered-image";

    document.body.appendChild(anchorElement);
    anchorElement.click();
  
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(imageURL);
  });
}

downloadBtn.addEventListener('click', downloadImage);