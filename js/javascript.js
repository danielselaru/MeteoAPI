import { API_KEY } from "./api_key.js";

const header_div = document.querySelector(".header");
const detalii_div = document.querySelector(".detalii");
const day_div = document.querySelector(".day");
const api_city_1 = document.querySelector("#id_city");
const header_data = document.querySelector(".header_data");


console.log(api_city_1);

const date_div = document.querySelector(".date");
const inputDate = document.querySelector("#birthday");
inputDate.addEventListener("input", show);

function show() {
  let selectedDate = inputDate.value;
  header_data.innerHTML = `<p>${selectedDate}</p>`
}

api_city_1.addEventListener("change", getInputValue);


function getInputValue(event) {
  day_div.innerHTML = ""
  let value_city = api_city_1.value;
  console.log(event.target.value);
  apifunction(value_city);
}

function apifunction(value_city) {
  const verif_city = value_city ? value_city : "Bucharest";
  const API = `https://api.openweathermap.org/data/2.5/forecast?q=${verif_city}&lang=ro&appid=${API_KEY}`;
  console.log(API);
  fetch(API)
    .then((response) => response.json())
    .then((json) => getCity(json));
}
apifunction();

function getCity(json) {
  detalii_div.innerHTML = ""
  console.log(json);
  let city_name = json.city.name;
  let list = json.list;
  let header_day = [];

  list.forEach((element) => {
    let weather = element.weather;
    let description = weather[0].description;
    console.log(weather[0].icon)
    let icon = weather[0].icon
    let date = new Date(element.dt_txt);
    let hours = date.getHours();
    let month = date.getMonth() + 1;
    let days = date.getDate() + "." + month;
    let temp =element.main.temp;
    let temperature = (temp - 273.15).toFixed(2);
    let temperature_min = (element.main.temp_min-273.15).toFixed(2);
    let temperature_max = (element.main.temp_max-273.15).toFixed(2);
    let humidity = element.main.humidity;
    let pressure = element.main.pressure;
    let temperature_feels_like = (element.main.feels_like-273.15).toFixed(2);

    header_day.push(days);
    console.log(days);
    detalii_div.innerHTML += `
      <div class="weather">
        <div>
        <p>In data ${days} la ora ${hours} vremea va fi ${description}.</p>
        <p>Temperatura va fi ${temperature} grade. Temperatura minima : ${temperature_min}, temperatura maxima : ${temperature_max} </p>
        <p>Se resimt ${temperature_feels_like} grade , umiditate : ${humidity} , presiune atmosferica : ${pressure}</p>
        </div>
        <img src="./images/${icon}.png" />
      </div>
       `;
  });
  let day = new Set(header_day);
  let x = Array.from(day);
  
  // for (let i = 0; i < x.length; i++) {
  //   const det = document.createElement("div")
  //   day_div.appendChild(det)
    
  //   day_div.innerHTML += `
  //   <p >
  //       ${x[i]}
  //   </p>
    
  //   `    
  // }
    
  header_div.innerHTML = `
    <p>
        ${city_name}
    </p>`;
  // console.log(json.list)
}

