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
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `<strong>${response.data.name}</strong>`;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dayTimeElement = document.querySelector("#currentDayTime");
  dayTimeElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
