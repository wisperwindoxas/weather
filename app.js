const searchBtn = document.querySelector('#search')
const plusBtn = document.querySelector('#plus')
const searchEnter = document.querySelector('.searchEnter')
const loupe = document.querySelector('#loupe')
const cityDate = document.querySelector('.city_date h1')
let dateInfo = document.querySelectorAll('.date_info span')
let degres = document.querySelector('.degres span')
let veribleD = document.querySelector('.verible_degres h4')
let weatherMin = document.querySelector('.weatherMin')
let weatherMax = document.querySelector('.weatherMax')
let weatherBlock = document.querySelector('.weather_block')
let inputMenu = document.querySelector('#inputMenu')
let languageShow = document.querySelector('.languageShow')
let languageList = document.querySelector('.languageList')
let languageFlag = document.querySelectorAll('.languageList img')

let apiKey = 'b3ca8e4ee6743dcd22bd966d73eed8d1'

let tf = true

languageShow.addEventListener('click' ,() =>{
    languageList.classList.toggle('listShow')
    languageFlag.forEach(item =>{
        item.addEventListener('click' , () =>{
            languageShow.classList.add('langShow')
            localStorage.setItem('src', item.getAttribute('src'))
            languageShow.setAttribute('src', localStorage.getItem('src'))
            languageList.classList.remove('listShow')
            correctWeek()
            localStorage.setItem('lang', item.getAttribute('data-lang'))
        })
        languageShow.classList.remove('langShow')
    })
})

function correctWeek(){
    fetch("http://localhost:3000/week")
    .then((response) => response.json())
    .then((data) => 
        data.forEach(week =>{
            if(localStorage.getItem("lang") === "eng"){
                dateInfo[1].innerHTML = week.eng[weekDay - 1]
            }
            if(localStorage.getItem("lang") === "rus"){
                dateInfo[1].innerHTML = week.rus[weekDay - 1]
            }
            if(localStorage.getItem("lang") === "uzb"){
                dateInfo[1].innerHTML = week.uzb[weekDay - 1]
            }
        })
    )
}



languageShow.setAttribute('src', localStorage.getItem('src'))

fetch("http://localhost:3000/countrys")
.then((response) => response.json())
.then((data) => getCountryName(data))

function getCountryName(data){
    data.forEach(item => {
        let p = document.createElement('p')
        p.innerHTML = item.eng
        inputMenu.append(p)
        p.setAttribute('data-count', item.eng)
    });
}

plusBtn.addEventListener('click', () =>{
    plusBtn.classList.toggle('plusClick')
    searchEnter.classList.toggle('showSearch')
    loupe.classList.toggle('loupe')
    searchBtn.addEventListener('click', () =>{
        inputMenu.classList.toggle('menuShow')

        inputMenu.querySelectorAll('p').forEach(item =>{
            item.addEventListener('click', () =>{
                let getNameCounter = item.getAttribute('data-count')
                localStorage.setItem('countryName', getNameCounter)
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('countryName')}&appid=${apiKey}`)
                    .then((response) => response.json())
                    .then((data) => {getWeatherInfo(data);changePhoto(data)})
                inputMenu.classList.remove('menuShow')
                cityDate.innerHTML = localStorage.getItem('countryName')
            })             
        })
    })
})

let weekDay = new Date().getDay()
let month = new Date().getMonth()
let day = new Date().getDate()
let year = new Date().getFullYear()


loupe.addEventListener('click', () =>{
    inputMenu.classList.toggle('menuShow')
    localStorage.setItem('countryName', searchBtn.value)
    cityDate.innerHTML = localStorage.getItem('countryName')
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchBtn.value}&appid=${apiKey}`)
    .then((response) => response.json() )
    .then((data) => getWeatherInfo(data));

    searchBtn.value = ""
})

window.addEventListener('keydown', (e) =>{
    if(e.code === 'Enter'){
        inputMenu.classList.toggle('menuShow')
        localStorage.setItem('countryName', searchBtn.value)
        cityDate.innerHTML = localStorage.getItem('countryName')
       
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchBtn.value}&appid=${apiKey}`)
        .then((response) => response.json() )
        .then((data) => {
            getWeatherInfo(data)
            changePhoto(data)});
        
        searchBtn.value = ""
    }
})


function getWeatherInfo(data){
    degres.innerHTML = Math.round(data.main.temp - 273)
    veribleD.innerHTML = data.weather[0].description
    weatherMin.innerHTML = Math.round(data.main.temp_min - 273)
    weatherMax.innerHTML = Math.round(data.main.temp_max - 273)
}



function correctWeather(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('countryName')}&appid=${apiKey}`)
    .then((response) => response.json() )
    .then((data) => {
        degres.innerHTML = Math.round(data.main.temp - 273)
        veribleD.innerHTML = data.weather[0].description
        weatherMin.innerHTML = Math.round(data.main.temp_min - 273)
        weatherMax.innerHTML = Math.round(data.main.temp_max - 273)
        changePhoto(data)
    });
    cityDate.innerHTML = localStorage.getItem('countryName')
}




function getPhoto(url){
    weatherBlock.style.background = `url(${url})`
    weatherBlock.style.backgroundSize = 'cover'
    weatherBlock.style.transition = 'all .4s'
}

function changePhoto(data){
    if(data.weather[0].description === "clear sky"){
        getPhoto('https://phonoteka.org/uploads/posts/2021-04/1618831461_15-phonoteka_org-p-letnii-fon-vertikalnii-20.jpg')
    }

    if(data.weather[0].description === "sunny"){
        getPhoto('https://phonoteka.org/uploads/posts/2021-04/1618831461_15-phonoteka_org-p-letnii-fon-vertikalnii-20.jpg')
    }

    if(data.weather[0].description === "few clouds"){
        getPhoto('https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
    }

    if(data.weather[0].description === "light rain"){
        getPhoto('https://images.pexels.com/photos/2609106/pexels-photo-2609106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    }

    if(data.weather[0].description === "moderate rain"){
        getPhoto('https://images.pexels.com/photos/2609106/pexels-photo-2609106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    }

    if(data.weather[0].description === "overcast clouds"){
        getPhoto('https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    }

    if(data.weather[0].description === "broken clouds"){
        getPhoto('https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    }

    if(data.weather[0].description === "scattered clouds"){
        getPhoto('https://images.pexels.com/photos/7292745/pexels-photo-7292745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    }
    if(data.weather[0].description === "mist"){
        getPhoto('https://im0-tub-ru.yandex.net/i?id=77d554370aa7f90592691613e50a4b4a-l&ref=rim&n=13&w=1080&h=1350')
    }
}


cityDate.innerHTML = localStorage.getItem('countryName')