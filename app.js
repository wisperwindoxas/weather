const searchBtn = document.querySelector("#search");
const plusBtn = document.querySelector("#plus");
const searchEnter = document.querySelector(".searchEnter");
const loupe = document.querySelector("#loupe");
const cityDate = document.querySelector(".city_date h1");
let dateInfo = document.querySelectorAll(".date_info span");
let degres = document.querySelector(".degres span");
let veribleD = document.querySelector(".verible_degres h4");
let weatherMin = document.querySelector(".weatherMin");
let weatherMax = document.querySelector(".weatherMax");
let weatherBlock = document.querySelector(".weather_block");
let inputMenu = document.querySelector("#inputMenu");
let languageShow = document.querySelector(".languageShow");
let languageList = document.querySelector(".languageList");
let languageFlag = document.querySelectorAll(".languageList img");
let weather_menu = document.querySelector(".weather_menu");
let menu_left = document.querySelector(".menuLeft");
let icons = document.querySelector('.icons img')



cityDate.innerHTML = localStorage.getItem("countryName");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPu1fvZtZMZxJI9lh65L-BWbYR3p8JNBw",
  authDomain: "weather-app-476ff.firebaseapp.com",
  databaseURL: "https://weather-app-476ff-default-rtdb.firebaseio.com",
  projectId: "weather-app-476ff",
  storageBucket: "weather-app-476ff.appspot.com",
  messagingSenderId: "1020379210021",
  appId: "1:1020379210021:web:a16e06e850d517b4befacc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const db = getDatabase();

window.onload = function () {
  const dbRef = ref(db);

  get(child(dbRef, "week")).then((snapshot) => {
       snapshot.val().forEach(week =>{
         correctWeek(week)
       })
  });
  get(child(dbRef, "month")).then((snapshot) => {
    snapshot.val().forEach((month) => {
      correctMonth(month)
    });
  });
    get(child(dbRef, "countrys")).then(async (snapshot) => {
      createP(await snapshot.val())
      getCorrectCountryName(await snapshot.val())
  });


};

let apiKey = "d4c1fb4a076e8375fee04a869ddb00e6";

languageShow.addEventListener("click", () => {
  languageList.classList.toggle("listShow");
  languageFlag.forEach((item) => {
    item.addEventListener("click", () => {
      languageShow.classList.add("langShow");
      localStorage.setItem("src", item.getAttribute("src"));
      languageShow.setAttribute("src", localStorage.getItem("src"));
      localStorage.setItem("lang", item.getAttribute("data-lang"));
      languageList.classList.remove("listShow");
    });
    languageShow.classList.remove("langShow");
  });
  
});

weather_menu.addEventListener("click", () => {
  menu_left.classList.toggle("menuLeftShow");
});

localStorage.getItem("countryName")
languageShow.setAttribute("src", localStorage.getItem("src"));

let weekDay = new Date().getDay();
let months = new Date().getMonth();
let day = new Date().getDate();
let year = new Date().getFullYear();

dateInfo[2].innerHTML = day;
dateInfo[3].innerHTML = year;


function correctWeek(weeks) {

  languageFlag[0].addEventListener("click", () =>{
    dateInfo[0].innerHTML = weeks.eng[weekDay]
  })
  languageFlag[1].addEventListener("click", () =>{
    dateInfo[0].innerHTML = weeks.rus[weekDay]
  })
  languageFlag[2].addEventListener("click", () =>{
    dateInfo[0].innerHTML = weeks.uzb[weekDay]
  })
  if(localStorage.getItem("lang") === 'eng'){
    dateInfo[0].innerHTML = weeks.eng[weekDay]
  }
  if(localStorage.getItem("lang") === 'rus'){
    dateInfo[0].innerHTML = weeks.rus[weekDay]
  }
  if(localStorage.getItem("lang") === 'uzb'){
    dateInfo[0].innerHTML = weeks.uzb[weekDay]
  }
     
}


plusBtn.addEventListener("click", () => {
  plusBtn.classList.toggle("plusClick");
  inputMenu.classList.remove("menuShow");
  searchEnter.classList.toggle("showSearch");
  loupe.classList.toggle("loupe");
  searchBtn.addEventListener("click", () => {
    inputMenu.classList.toggle("menuShow");
  });
});

function createP(country) {
  country.forEach(countName => {
    
   
      let p = document.createElement('p')
      p.setAttribute('data-lang', countName.eng)
      inputMenu.appendChild(p)
  })


  inputMenu.querySelectorAll("p").forEach((item) => {
   
    item.addEventListener("click",  () => {
      let getNameCounter = item.getAttribute("data-lang");
      localStorage.setItem("countryName", getNameCounter);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem(
          "countryName"
        )}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          getWeatherInfo(data);
          changePhoto(data);
        });
      inputMenu.classList.remove("menuShow");
      if(localStorage.getItem("lang") === "rus") {
        let rusCountry = item.innerHTML;
        localStorage.setItem('rusCountryName', rusCountry)
        cityDate.innerHTML = rusCountry;

      } else {
        cityDate.innerHTML = localStorage.getItem("countryName");
      }
    });
  });


  
  
}




function correctMonth(month) {
  languageFlag[0].addEventListener("click", () =>{
    dateInfo[1].innerHTML = month.eng[months]
    cityDate.innerHTML = localStorage.getItem("countryName");
    
  })
  languageFlag[1].addEventListener("click", () =>{
    dateInfo[1].innerHTML = month.rus[months]
    cityDate.innerHTML = localStorage.getItem("rusCountryName");
  })
  languageFlag[2].addEventListener("click", () =>{
    dateInfo[1].innerHTML = month.uzb[months]
  
  })
  if(localStorage.getItem("lang") === 'eng'){
    dateInfo[1].innerHTML = month.eng[months]
  }
  if(localStorage.getItem("lang") === 'rus'){
    dateInfo[1].innerHTML = month.rus[months]
  }
  if(localStorage.getItem("lang") === 'uzb'){
    dateInfo[1].innerHTML = month.uzb[months]
  }
}

cityDate.innerHTML = localStorage.getItem("countryName");




async function getCorrectCountyDegree(){
  
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem(
      "countryName"
    )}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => degres.innerHTML = Math.round(data.main.temp - 273) );
}

getCorrectCountyDegree()

function getCorrectCountryName(countNames) {
    let allP = document.querySelectorAll("#inputMenu p");
    languageFlag[0].addEventListener("click", ()=>{
        countNames.forEach((item, index) =>{
          allP[index].innerHTML = item.eng
        })
    })
    languageFlag[1].addEventListener("click", ()=>{
        countNames.forEach((item, index) =>{
          allP[index].innerHTML = item.rus
        })
    })
    languageFlag[2].addEventListener("click", ()=>{
        countNames.forEach((item, index) =>{
          allP[index].innerHTML = item.rus
        })
    })

    if(localStorage.getItem("lang") === 'eng'){
      countNames.forEach((item, index) =>{
        allP[index].innerHTML = item.eng
      })
    }
    if(localStorage.getItem("lang") === 'rus'){
      countNames.forEach((item, index) =>{
        allP[index].innerHTML = item.rus
      })
    }
    if(localStorage.getItem("lang") === 'uzb'){
      countNames.forEach((item, index) =>{
        allP[index].innerHTML = item.rus
      })
    }
}

loupe.addEventListener("click", () => {
  inputMenu.classList.toggle("menuShow");

  localStorage.setItem("countryName", searchBtn.value);
  cityDate.innerHTML = localStorage.getItem("countryName");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBtn.value}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => getWeatherInfo(data));

  searchBtn.value = "";
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    inputMenu.classList.toggle("menuShow");
    localStorage.setItem("countryName", searchBtn.value);
    cityDate.innerHTML = localStorage.getItem("countryName");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBtn.value}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        getWeatherInfo(data);
        changePhoto(data);
      });

    searchBtn.value = "";
  }
});

function getWeatherInfo(data) {
  degres.innerHTML = Math.round(data.main.temp - 273);
  veribleD.innerHTML = data.weather[0].description;
  weatherMin.innerHTML = Math.round(data.main.temp_min - 273);
  weatherMax.innerHTML = Math.round(data.main.temp_max - 273);
}

function correctWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem(
      "countryName"
    )}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      degres.innerHTML = Math.round(data.main.temp - 273);
      veribleD.innerHTML = data.weather[0].description;
      weatherMin.innerHTML = Math.round(data.main.temp_min - 273);
      weatherMax.innerHTML = Math.round(data.main.temp_max - 273);
      changePhoto(data);
    });
  cityDate.innerHTML = localStorage.getItem("countryName");
}

correctWeather();

function getPhoto(url) {
  weatherBlock.style.background = `url(${url})`;
  weatherBlock.style.backgroundSize = "cover";
  weatherBlock.style.transition = "all .4s";
}

function changePhoto(data) {
  if (data.weather[0].description === "clear sky") {
    icons.setAttribute('src', 'Icon/clear-sky.png')
    getPhoto(
      "https://phonoteka.org/uploads/posts/2021-04/1618831461_15-phonoteka_org-p-letnii-fon-vertikalnii-20.jpg"
    );
  }

  if (data.weather[0].description === "sunny") {
    icons.setAttribute('src', 'Icon/sunny.png')
    getPhoto(
      "https://phonoteka.org/uploads/posts/2021-04/1618831461_15-phonoteka_org-p-letnii-fon-vertikalnii-20.jpg"
    );
  }

  if (data.weather[0].description === "few clouds") {
    icons.setAttribute('src', 'Icon/cloudy.png')
    getPhoto(
      "https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    );
  }

  if (data.weather[0].description === "light rain") {
    icons.setAttribute('src', 'Icon/light-rain.png')
    getPhoto(
      "https://images.pexels.com/photos/2609106/pexels-photo-2609106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }

  if (data.weather[0].description === "moderate rain") {
    icons.setAttribute('src', 'Icon/rain.png')
    getPhoto(
      "https://images.pexels.com/photos/2609106/pexels-photo-2609106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }

  if (data.weather[0].description === "overcast clouds") {
    icons.setAttribute('src', 'Icon/clear-sky.png')
    getPhoto(
      "https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }

  if (data.weather[0].description === "broken clouds") {
    icons.setAttribute('src', 'Icon/cloud.png')
    getPhoto(
      "https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }

  if (data.weather[0].description === "scattered clouds") {
    icons.setAttribute('src', 'Icon/scattered-thunderstorms.png')
    getPhoto(
      "https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }
  if (data.weather[0].description === "mist") {
    icons.setAttribute('src', 'Icon/mist.png')
    getPhoto(
      "https://im0-tub-ru.yandex.net/i?id=77d554370aa7f90592691613e50a4b4a-l&ref=rim&n=13&w=1080&h=1350"
    );
  }
  if (data.weather[0].description === "light snow") {
    icons.setAttribute('src', 'Icon/snowing.png')
    getPhoto(
      "http://adwallpapers.xyz/uploads/posts/244597-sunlight-trees-forest-water-nature-reflection-snow-winter-branch-green-morning-Freezing-light-tree-autumn-leaf-weather-plant-season-atmospheric-phenomenon-woody-plant-cl.jpg"
    );
  }
  if (data.weather[0].description === "snow") {
    icons.setAttribute('src', 'Icon/snowing.png')
    getPhoto(
      "https://c4.wallpaperflare.com/wallpaper/590/262/493/christmas-winter-4k-wallpaper-preview.jpg"
    );
  }
}

cityDate.innerHTML = localStorage.getItem("countryName");
languageShow.setAttribute("src", localStorage.getItem("src"));

if(localStorage.getItem("lang") === 'rus'){
  cityDate.innerHTML = localStorage.getItem("rusCountryName");
}else{
  cityDate.innerHTML = localStorage.getItem("countryName");
}
