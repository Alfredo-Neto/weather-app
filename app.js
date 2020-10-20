const apiKey = "9c86b940596734a47534b2367b2e030f";

const main = document.getElementById("main");
const body = document.body.style;
const form = document.getElementById("form");
const search = document.getElementById("search");

function searchWeatherByLocation(searchTerm) {
  const url = (searchTerm) =>
    `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`;

  // Ajax here
  fetch(url(searchTerm), {
    origin: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      printWeatherOnScreen(response);
    })
    .catch((error) =>
      console.log(
        "Não foi possível realizar a busca do Local: " + error.message
      )
    );
}

// Transform Kelvins to Celsius
function KtoC(K) {
  let tempC = K - 273.15;
  return Math.floor(tempC);
}

function printWeatherOnScreen(searchTerm) {
  const temp = KtoC(searchTerm.main.temp);
  const { name } = searchTerm;
  const { icon } = searchTerm.weather[0];
  const { description } = searchTerm.weather[0];

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `${name}<h1><img src="http://openweathermap.org/img/wn/${icon}@2x.png">${temp}°C
  </h1>
  ${description}`;

  main.innerHTML = ""; // cleanup

  dayOrNight(icon);

  main.appendChild(weather);
}

function dayOrNight(icon) {
  iconArray = icon.split("");
  if (iconArray[2] === "d") {
    body.backgroundImage = "url('olly-allars-SIPQ54YLvjk-unsplash.jpg')";
    main.style.color = "#000";
  } else if (iconArray[2] === "n") {
    body.backgroundImage = "url('goncalo-verdasca-tkJztsZAjn8-unsplash.jpg')";
    main.style.color = "#fff";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = search.value;
  if (searchTerm) searchWeatherByLocation(searchTerm);
});
