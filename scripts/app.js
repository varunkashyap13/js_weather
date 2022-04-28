const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;
  // **Destructuring**
  // variable names have to be same names as in data object
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>`;

  // update day/night & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  //   if (weather.IsDayTime) {
  //     timeSrc = "img/day.svg";
  //   } else {
  //     timeSrc = "img/night.svg";
  //   }
  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    // remove d-none class if present
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  // using await bc getCity is an async function
  // can call these external functions bc forecast.js comes before app.js in html
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    // cityDets: cityDets,
    // weather: weather,
    // bc both names are the same can do the following:
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update ui with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

//automatically runs
if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city")).then((data) => {
    updateUI(data);
  });
}
