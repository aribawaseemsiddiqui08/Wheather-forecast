const API_KEY = "8bd0d554e8a29a6de5beafd0e8a5821c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") getWeather(city);
  }
});

async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) { showError(); return; }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError();
  }
}

function displayWeather(data) {
  errorMsg.style.display = "none";
  weatherCard.style.display = "block";

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("countryCode").textContent = data.sys.country;
  document.getElementById("date").textContent = getFormattedDate();
  document.getElementById("temperature").textContent = Math.round(data.main.temp);
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
  document.getElementById("feelsLike").textContent = `${Math.round(data.main.feels_like)}°C`;
}

function showError() {
  weatherCard.style.display = "none";
  errorMsg.style.display = "block";
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}