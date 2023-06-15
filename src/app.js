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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
        <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/w/${
              forecastDay.weather[0].icon
            }.png" id="forecastIcon" title="" width="36"/>
                <div class="forecastTemp">
                <span class="forecastHigh"><strong>${Math.round(
                  forecastDay.temp.max
                )}°  </strong></span>
                <span class="forecastLow">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                </div>
        
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);

  celTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("kettering");

let searchWeather = document.querySelector("#enterCity");
searchWeather.addEventListener("submit", handleSubmit);
