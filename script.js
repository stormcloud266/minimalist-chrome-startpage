// elements
const clock = document.getElementById("clock");
const background = document.getElementById("background");
const body = document.getElementsByTagName("BODY")[0];

const image = {
  defaultImage: "./default.jpg",
  nextImage: localStorage.getItem("bgImage"),
  setImage: (image) => (background.style.backgroundImage = `url('${image}')`),
};

const start = () => {
  setBg();
  body.classList = "fade";
  setInterval(
    (function setClock() {
      const time = new Date().toLocaleTimeString().slice(0, -6);
      clock.textContent = time;
      return setClock;
    })(),
    500
  );
  saveNextImage();
};

const setBg = () => {
  if (!image.nextImage) {
    image.setImage(image.defaultImage);
  } else {
    image.setImage(image.nextImage);
  }
};

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const saveNextImage = () => {
  toDataURL("https://source.unsplash.com/collection/2310706/2400x1600").then(
    (dataUrl) => {
      localStorage.setItem("bgImage", dataUrl);
    }
  );
};

start();
