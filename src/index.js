function formatDate(date) {
  let now = date.getDate();
  let currentMonth = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentMonth];
  let year = date.getFullYear();

  return `${month}, ${now}, ${year}`;
}

function formatHours(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
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
          <div class="weather-forecast-date">${formatDate(
            new Date(forecastDay.dt * 1000)
          )}</div>
          <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt="" 
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}º </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}º </span>
          </div>
        </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  document.querySelector("#city1").innerHTML = "#city-input".value;
  searchCity(cityInput);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);
let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = formatHours(currentTime);

searchCity("Kyiv");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
function searchLocation(position) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/3.0/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function chooseParis(event) {
  event.preventDefault();
  searchCity("Paris");
}

function chooseLondon(event) {
  event.preventDefault();
  searchCity("London");
}

function chooseRome(event) {
  event.preventDefault();
  searchCity("Rome");
}

function chooseMadrid(event) {
  event.preventDefault();
  searchCity("Madrid");
}
function chooseBerlin(event) {
  event.preventDefault();
  searchCity("Berlin");
}

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", chooseParis);

let londonButton = document.querySelector("#london-button");
londonButton.addEventListener("click", chooseLondon);

let romeButton = document.querySelector("#rome-button");
romeButton.addEventListener("click", chooseRome);

let madridButton = document.querySelector("#madrid-button");
madridButton.addEventListener("click", chooseMadrid);

let berlinButton = document.querySelector("#berlin-button");
berlinButton.addEventListener("click", chooseBerlin);
