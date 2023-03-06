var searchCity = document.querySelector('#search-button');
var cityName = document.querySelector('#cityName');
var cityCountSpan = document.querySelector('#city-count')

var cityCount = []

function saveToLocalStorage (city) {
    let localStorageData = JSON.parse(localStorage.getItem ('city'))
    if (localStorageData === null) {
        localStorageData = [];
        localStorageData.push(city)
    } else {
        localStorageData.push (city)
    }

    localStorage.setItem('city', JSON.stringify(localStorageData))
}

function populateSearchHistory() { 
    cityCountSpan.innerHTML = "";

    let localStorageData = JSON.parse(localStorage.getItem ('city'))
    if (localStorageData != null) {
        for (var i = 0; i < localStorageData.length; i++) {

            var city = localStorageData[i];
    
            var historyButton = document.createElement("button");
            historyButton.textContent = city;
            historyButton.addEventListener('click', function(event) {
                event.preventDefault();
                let cityName = event.target.innerHTML;
                getApi(cityName)

            })
    
            cityCountSpan.appendChild(historyButton);
        }

    }
}

//This will fetch latitude and longitude by city
function getApi(cityNameVal) {


    //Requests lat/lon from user city input
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameVal + "&limit=1&appid=27da570459e0dbef2f6562c7c304faf3";
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        //console.log(data)
        getWeather(data[0]);
        getToday(data[0])


        function getToday () {

            console.log(data[0]);

            var lat = data[0].lat;
            var lon = data[0].lon;

            console.log(lat);
            console.log(lon);
            

            var requestUrlCurrentForecast = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=27da570459e0dbef2f6562c7c304faf3";

            fetch(requestUrlCurrentForecast)
            .then(function (response) {
            return response.json();
            })
    
            .then(function(data){
            console.log(data)

            var todayIcon = data.weather[0].icon
            var thisIcon = "http://openweathermap.org/img/w/" + todayIcon + ".png";
            console.log(thisIcon);
            var todayTemp = data.main.temp;
            // Formula to change Kelvin to Fahrenheit
            var thisTemp = (((todayTemp-273.15)*9/5)+32);
            // .toFixed function does not lets numbers after decimel exceed two digits
            var todayFTemp = thisTemp.toFixed(2);
            console.log(todayFTemp);
            var humidToday = data.main.humidity;
            console.log(humidToday);
            var windToday = data.wind.speed;
            console.log(windToday);
            date = new Date().toLocaleDateString();
           

            //Appends weather results to HTML
            document.getElementById("weather-today").innerHTML = "Today in " + cityNameVal + " (" + date + ") " + "<div id='icon'><img id='wicon' src="+ thisIcon +" alt=></div>" + " Temp: " + todayFTemp + "<br>" + " Humidity: " + humidToday + "<br>" + " Wind Speed: " + windToday + " MPH";

            //var array = [cityNameVal, date, thisIcon, todayFTemp, humidToday, windToday]

            //Saves today's weather to local storage
           // localStorage.setItem('Today', array);


            

            })
        }


//Fetches weather information by longitude and latitude
        function getWeather () {

            console.log(data[0]);

            var lat = data[0].lat;
            var lon = data[0].lon;

            console.log(lat);
            console.log(lon);


            var requestNewUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=27da570459e0dbef2f6562c7c304faf3";

            fetch(requestNewUrl)
            .then(function (response) {
            return response.json();
            })
    
            .then(function(data){
            console.log(data)

            let targetElement = ["Zero", "One", "Two", "Three", "Four" ];
            let index = 0

            for (let i = 4; i<data.list.length; i+=8) {

                var date = data.list[i].dt_txt;
            console.log(date);
            var icon = data.list[i].weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            console.log(icon);
            var temp = data.list[i].main.temp;
            // Formula to change Kelvin to Fahrenheit
            var newTemp = (((temp-273.15)*9/5)+32);
            // .toFixed function does not lets numbers after decimel exceed two digits
            var FTemp = newTemp.toFixed(2);
            console.log(FTemp);
            var humid = data.list[i].main.humidity;
            console.log(humid);
            var wind = data.list[i].wind.speed;
            console.log(wind);
            console.log(index)
            console.log(targetElement[index])
            //Appends weather results to HTML
            document.getElementById(`weather-${targetElement[index]}`).innerHTML = " Date: " + date +"<div id='icon'><img id='wicon' src="+ iconurl +" alt=></div>" + " Temp: " + FTemp + " Humidity: " + humid + " Wind Speed: " + wind + " MPH";
            index++
            }

            
            })   

        }

       
           
    })
       
   
  

}

function init (e) {
       e.preventDefault()
    //Takes the value of the user input for city
    var cityNameVal = cityName.value
    console.log(cityNameVal);

    saveToLocalStorage(cityNameVal)
    populateSearchHistory()
    getApi(cityNameVal)

}

populateSearchHistory()

//Event listener for search button on HTML to fetch API information and start function
searchCity.addEventListener('click', init);
// cityCountSpan.addEventListener('click', getApi);
    
//search without lat/lon
//style buttons on top of each other
//Do not repeat city name in search history
