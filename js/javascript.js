import { API_KEY } from "./api_key.js";

// const date = new Date();
// console.log(date.getHours() + '/' +date.getDate());
// const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
// const formattedDate = formatter.format(date);
// console.log(formattedDate);

// let myset = new Set();
// Append new elements to the
// set using add() method
// myset.add(23);
// console.log(myset)

const header_div = document.querySelector(".header");
const detalii_div = document.querySelector(".detalii");
const day_div = document.querySelector(".day");
const api_city_1 = document.querySelector("#id_city");
console.log(api_city_1);
const btn = document.querySelector(".button");

btn.addEventListener("click", getInputValue);

// let value_city = 'Bucharest'
function getInputValue() {
  day_div.innerHTML=""
  let value_city = api_city_1.value;
  console.log(value_city);
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
  detalii_div.innerHTML=""
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
    let hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let month = date.getMonth() + 1;
    let days = date.getDate() + "." + month;
   
    header_day.push(days);
    console.log(days);
    detalii_div.innerHTML += `
        <div class="weather">
        <p>In data ${days} la ora  ${hours} vremea va fi ${description}</p>
        <img src="./images/${icon}.png" />
        </div>
        `;
  });
  let day = new Set(header_day);
  let x = Array.from(day);
  
  for (let i = 0; i < x.length; i++) {
    const det = document.createElement("div")
    day_div.appendChild(det)
   
    day_div.innerHTML += `
    <p >
        ${x[i]}
    </p>
    
    `    
  }
    
  header_div.innerHTML = `
    <p>
        ${city_name}
    </p>`;
  // console.log(json.list)
}
