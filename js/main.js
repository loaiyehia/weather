var cityInput = document.querySelector("input");

var date = new Date();

console.log(date);
var day = date.toLocaleDateString("en", { dateStyle: "long" });
var weekDay = date.toLocaleDateString("en", { weekday: "long" });
document.getElementById("weekday").innerHTML = weekDay;
document.getElementById("day").innerHTML = day;
// document.getElementById("weekday-2").innerHTML = weekDay;
// document.getElementById("weekday-3").innerHTML = weekDay;
var tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById("weekday-2").innerHTML = tomorrow.toLocaleDateString(
  "en",
  { weekday: "long" }
);

var afterTomorrow = new Date();

afterTomorrow.setDate(afterTomorrow.getDate() + 2);
document.getElementById("weekday-3").innerHTML =
  afterTomorrow.toLocaleDateString("en", { weekday: "long" });

var weatherArray = [];
var cityName;

cityInput.addEventListener("input", function () {
  foreCast(cityInput.value);
});

async function foreCast(city) {
  try {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6b670937eb37478a8a4202822241406&days=3&q=${city}`
    );
    var finialData = await response.json();
    // console.log(finialData.forecastday);
    cityName = finialData.location.name;
    console.log(cityName);
    weatherArray = finialData.forecast.forecastday;
    console.log(weatherArray);
    console.log(weatherArray[0].date);
    display1();
    display2();
    display3();
  } catch (error) {
    console.log(error);
  }
}

function display1() {
  document.getElementById("city").innerHTML = cityName;
  document.getElementById("tempday").innerHTML = weatherArray[0].day.maxtemp_c;
  document
    .getElementById("day1-image")
    .setAttribute("src", `https:${weatherArray[0].day.condition.icon}`);
  document.getElementById("text-1").innerHTML =
    weatherArray[0].day.condition.text;
  document.getElementById("humidity").innerHTML =
    weatherArray[0].day.avghumidity;
  document.getElementById("wind").innerHTML = weatherArray[0].day.maxwind_mph;
}

function display2() {
  document.getElementById("tempday-2").innerHTML =
    weatherArray[1].day.maxtemp_c;
  document.getElementById("low1").innerHTML = weatherArray[1].day.mintemp_c;
  document
    .getElementById("day2-image")
    .setAttribute("src", `https:${weatherArray[1].day.condition.icon}`);
  document.getElementById("text-2").innerHTML =
    weatherArray[1].day.condition.text;
}

function display3() {
  document
    .getElementById("day3-image")
    .setAttribute("src", `https:${weatherArray[2].day.condition.icon}`);
    document.getElementById("tempday-3").innerHTML =
    weatherArray[2].day.maxtemp_c;
    document.getElementById("low2").innerHTML = weatherArray[2].day.mintemp_c;
    document.getElementById("text-3").innerHTML =
    weatherArray[2].day.condition.text;
}
