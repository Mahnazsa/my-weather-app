let now = new Date ();
let currentTime = document.querySelector("#time-date");

function formatDate (date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
 
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateNow = date.getDate ();

  let formattedDate = `${hour}:${minutes}, ${day} ${month} ${dateNow}`
  return formattedDate;
} 

currentTime.innerHTML =formatDate(now);

function displayWeatherCondition (response) {
  console.log(response.data);
  temperatureValueCelsius = response.data.temperature.current;

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(temperatureValueCelsius);
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#feels_like").innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#weather-description").innerHTML = response.data.condition.description;
  document.querySelector("#icon").setAttribute (
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
}

function searchCity (city) {
  let apiKey = "4c50413a6ac362tb2b6od01fb33f6e87";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}


let search = document.querySelector ("#search-result");
search.addEventListener("submit", handleSubmit);


function exchangeTempFarenheit (event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML= Math.round ((temperatureValueCelsius * 9) / 5 +32);
}

function exchangeTempCelsius (event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round (temperatureValueCelsius);
}


let temperatureValueCelsius = null;



let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener ("click", exchangeTempFarenheit);

let celsius = document.querySelector ("#celsius");
celsius.addEventListener ("click", exchangeTempCelsius);


function searchLocation (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bb596261d5ff560ea3990f6df2eb28d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  }


function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener ("click", getCurrentLocation);



searchCity("tehran");


