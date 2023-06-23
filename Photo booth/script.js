const video = document.querySelector('.player');
const photos = document.querySelector('.photos');
const takePhotoBtn = document.querySelector(".take-photo");
const snap = document.querySelector('.snap');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

const greenScreenCheckbox = document.querySelector(".header-1");
const ghostEffectController = document.getElementById("ghost");
const splitEffect = document.getElementById("3d");
const colorEffectController = document.getElementById("color");

greenScreenCheckbox.addEventListener("click", () => !greenScreenCheckbox.checked);

const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch((e) => console.log("You need to give an access for your camera", e));
}

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1,1);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        ctx.globalAlpha = ghostEffectController.value;
        let pixels = ctx.getImageData(0, 0, width, height);

        if (greenScreenCheckbox.checked) {
            pixels = greenScreen(pixels);
        }

        if (splitEffect.value > 0) {
            pixels = rgbSplit(pixels);
        }

        if (colorEffectController.value > 0) {
            pixels = colorEffect(pixels);
        }
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

const takePhoto = () => {
    snap.currentTime = 0;
    snap.play();

    const photo = canvas.toDataURL('image/jpeg');
    const link = document.createElement("a");
    link.href = photo;
    link.setAttribute("download", "photo");
    link.classList.add("download");
    link.innerHTML = `<img src="${photo}" alt="photo" />`;
    link.addEventListener("click", () => link.remove());
    photos.append(link);
}
takePhotoBtn.addEventListener("click", takePhoto);

const colorEffect = (pixels) => {
    const colors = [[255, 0, 128], [255, 0, 255], [80, 40, 0], [0, 5, 0], [0, 0, 0], [70, 128, 0],
    [0, 190, 0], [0, 128, 0], [0, 255, 255], [0, 128, 128], [0, 0, 255], [0, 0, 128]];

    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += colors[colorEffectController.value - 1][0]; // r
        colors[colorEffectController.value - 1][1] === 0 ? pixels.data[i + 1] -= colors[colorEffectController.value - 1][1] : pixels.data[i + 1] = colors[colorEffectController.value - 1][1]; // g
        pixels.data[i + 2] = colors[colorEffectController.value - 1][2]; // b
    }

    return pixels;
}

const rgbSplit = (pixels) => {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - (150 * splitEffect.value)] = pixels.data[i] // r
        pixels.data[i + (100 * splitEffect.value)] = pixels.data[i + 1] // g
        pixels.data[i - (50 * splitEffect.value)] = pixels.data[i + 2] // b
    }
    return pixels;
}

const greenScreen = (pixels) => {
    const levels = {};

    document.querySelectorAll('.rgb').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
}

getVideo();
video.addEventListener("canplay", paintToCanvas);