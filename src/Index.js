let now = new Date();
function getDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return day;
}
function getTime() {
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var temp = (minutes < 10 ? "0" : "") + minutes;
  return `${hour}:${temp}`;
}
let date = document.querySelector("#date");
date.innerHTML = `${getDay()} ${getTime()}`;

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#searchCityInput`);

  let units = "metric";
  let apiKey = "f2301ba492968c3302dbd963926e40f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function showWeather(weather) {
  console.log(weather);
  let temperatureValue = Math.round(weather.data.main.temp);

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperatureValue;

  showCity(weather.data.name);
}
function showCity(cityValue) {
  let city = document.querySelector("#city");
  city.innerHTML = cityValue;
}

let formSearchCity = document.querySelector("#search-city");
formSearchCity.addEventListener("submit", citySearch);

function currentCityWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "92030bd4fbf5b53c36e529ff0bce0abb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentCityWeather);
