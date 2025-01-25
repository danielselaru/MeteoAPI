import { API_KEY } from "./api_key.js";

// const date = new Date();
// console.log(date.getDate()+ ' / ' + date.getMonth()+1);
// const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
// const formattedDate = formatter.format(date);
// console.log(formattedDate);

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

    header_day.push(days);
    console.log(days);
    detalii_div.innerHTML += `
        <div class="weather">
        <p>In data ${days} la ora ${hours} vremea va fi ${description}</p>
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
