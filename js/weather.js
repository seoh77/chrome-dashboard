const API_KEY = config.apikey;

function onGeoOK(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const weatherIcon = document.querySelector(".weather-icon");
      const temp = document.querySelector(".temp");
      const city = document.querySelector(".location");

      const currIcon = data.weather[0].icon.substr(0, 2);
      const currTemp = Math.floor(data.main.temp);
      const currCity = data.name.split("-");
      let WEATHERICONS;

      switch (currIcon) {
        case "01":
          WEATHERICONS = "fa-solid fa-sun";
          break;
        case "02":
          WEATHERICONS = "fa-solid fa-cloud-sun";
          break;
        case "03":
          WEATHERICONS = "fa-solid fa-cloud";
          break;
        case "04":
          WEATHERICONS = "fa-solid fa-cloud-rain";
          break;
        case "09":
          WEATHERICONS = "fa-solid fa-cloud-showers-heavy";
          break;
        case "10":
          WEATHERICONS = "fa-solid fa-cloud-sun-rain";
          break;
        case "11":
          WEATHERICONS = "fa-solid fa-cloud-bolt";
          break;
        case "13":
          WEATHERICONS = "fa-solid fa-snowflake";
          break;
        case "50":
          WEATHERICONS = "fa-solid fa-smog";
          break;
      }

      $(weatherIcon).append('<i class="' + WEATHERICONS + '"></i>');
      temp.innerText = currTemp + "°C";
      city.innerText = currCity[0];
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
