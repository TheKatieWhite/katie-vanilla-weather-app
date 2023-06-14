function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  return `Updated ${day} ${hours}:${minutes}, `;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#tempNow");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = `<strong>${response.data.name}</strong>`;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dayTimeElement = document.querySelector("#currentDayTime");
  dayTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("title", response.data.weather[0].description);

  fLink.innerHTML = "<a style='color:#3ebdff'> °F </a>";
  cLink.innerHTML = "<a style='color: blue'> °C </a>";

  celTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahTemp(event) {
  event.preventDefault();
  let fahTemp = (celTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#tempNow");
  temperatureElement.innerHTML = Math.round(fahTemp);
  fLink.innerHTML = "<a style='color:blue'> °F </a>";
  cLink.innerHTML = "<a style='color:#3ebdff'> °C </a>";
}

function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNow");
  temperatureElement.innerHTML = Math.round(celTemp);
  fLink.innerHTML = "<a style='color:#3ebdff'> °F </a>";
  cLink.innerHTML = "<a style='color: blue'> °C </a>";
}
search("kettering");

let celTemp = null;

let searchWeather = document.querySelector("#enterCity");
searchWeather.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#fah");
fLink.addEventListener("click", showFahTemp);

let cLink = document.querySelector("#cel");
cLink.addEventListener("click", showCelTemp);
