import { WEATHER_API_KEY } from "./variables.mjs";

// elements
const clock = document.getElementById("clock");
const background = document.getElementById("background");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const conditions = document.getElementById("conditions");
const weather = document.getElementById("weather");
const body = document.getElementsByTagName("BODY")[0];

const image = {
  defaultImage: "./default.jpg",
  nextImage: localStorage.getItem("bgImage"),
  setImage: (image) => (background.style.backgroundImage = `url('${image}')`),
};

const start = () => {
  setBg();
  getWeather();

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

const fetchImageBase64 = async (url) => {
  const response = await fetch(url);
  const { imageData } = await response.json();
  return imageData;
};

const saveNextImage = async () => {
  const data = await fetchImageBase64(
    "https://misc-api-rose.vercel.app/api/image"
  );
  localStorage.setItem("bgImage", data);
};

const getWeather = async () => {
  const url = new URL("https://misc-api-rose.vercel.app/api/weather");

  const results = await fetch(url);
  const data = await results.json();

  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temp.innerText = `${Math.round(data.main.temp)}°`;
  conditions.innerText = `- ${data.weather[0].description}`;
  weather.classList = "fade";
};

start();
