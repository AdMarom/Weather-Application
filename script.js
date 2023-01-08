var searchCity = document.querySelector('#search-button');
var cityName = document.querySelector('#cityName');

//This will fetch latitude and longitude by city
function getApi() {

    //Takes the value of the user input for city
    var cityNameVal = cityName.value
    console.log(cityNameVal);

    //Saves city to local storage
    localStorage.setItem('city', cityNameVal);

    //Shows search history from local storage on HTML
    document.getElementById("show-results").innerHTML = localStorage.city;

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

            var date = data.list[4].dt_txt;
            console.log(date);
            var icon = data.list[4].weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            console.log(icon);
            var temp = data.list[4].main.temp;
            // Formula to change Kelvin to Fahrenheit
            var newTemp = (((temp-273.15)*9/5)+32);
            // .toFixed function does not lets numbers after decimel exceed two digits
            var FTemp = newTemp.toFixed(2);
            console.log(FTemp);
            var humid = data.list[4].main.humidity;
            console.log(humid);
            var wind = data.list[4].wind.speed;
            console.log(wind);
            //Appends weather results to HTML
            document.getElementById("weather-Zero").innerHTML = " Date: " + date +"<div id='icon'><img id='wicon' src="+ iconurl +" alt=></div>" + " Temp: " + FTemp + " Humidity: " + humid + " Wind Speed: " + wind + " MPH";

            var dateOne = data.list[12].dt_txt;
            console.log(dateOne);
            var iconOne = data.list[12].weather[0].icon
            var iconurlOne = "http://openweathermap.org/img/w/" + iconOne + ".png";
            console.log(icon);
            var tempOne = data.list[12].main.temp;
            var newTempOne = (((tempOne-273.15)*9/5)+32);
            var FTempOne = newTempOne.toFixed(2);
            console.log(FTempOne);
            var humidOne = data.list[12].main.humidity;
            console.log(humidOne);
            var windOne = data.list[12].wind.speed;
            console.log(windOne);
            document.getElementById("weather-One").innerHTML = "Date: " + dateOne +"<div id='icon'><img id='wicon' src="+ iconurlOne +" alt=></div>" + " Temp: " + FTempOne + " Humidity: " + humidOne + " Wind Speed: " + windOne + " MPH";
            
            var dateTwo = data.list[20].dt_txt;
            console.log(dateTwo);
            var iconTwo = data.list[20].weather[0].icon
            var iconurlTwo = "http://openweathermap.org/img/w/" + iconTwo + ".png";
            console.log(iconTwo);
            var tempTwo = data.list[20].main.temp;
            var newTempTwo = (((tempTwo-273.15)*9/5)+32);
            var FTempTwo = newTempTwo.toFixed(2);
            console.log(FTempTwo);
            var humidTwo = data.list[20].main.humidity;
            console.log(humidTwo);
            var windTwo = data.list[20].wind.speed;
            console.log(windTwo);
            document.getElementById("weather-Two").innerHTML = "Date: " + dateTwo +"<div id='icon'><img id='wicon' src="+ iconurlTwo +" alt=></div>" + " Temp: " + FTempTwo + " Humidity: " + humidTwo + " Wind Speed: " + windTwo + " MPH";
            
            var dateThree = data.list[28].dt_txt;
            console.log(dateThree);
            var iconThree = data.list[28].weather[0].icon
            var iconurlThree = "http://openweathermap.org/img/w/" + iconThree + ".png";
            console.log(iconThree);
            var tempThree = data.list[28].main.temp;
            var newTempThree = (((tempThree-273.15)*9/5)+32);
            var FTempThree = newTempThree.toFixed(2);
            console.log(FTempThree);
            var humidThree = data.list[28].main.humidity;
            console.log(humidThree);
            var windThree = data.list[28].wind.speed;
            console.log(windThree);
            document.getElementById("weather-Three").innerHTML =  "Date: " + dateThree +"<div id='icon'><img id='wicon' src="+ iconurlThree +" alt=></div>" + " Temp: " + FTempThree + " Humidity: " + humidThree + " Wind Speed: " + windThree + " MPH";
            
            var dateFour = data.list[36].dt_txt;
            console.log(dateFour);
            var iconFour = data.list[36].weather[0].icon
            var iconurlFour = "http://openweathermap.org/img/w/" + iconFour + ".png";
            console.log(icon);
            var tempFour = data.list[36].main.temp;
            var newTempFour = (((tempFour-273.15)*9/5)+32);
            var FTempFour = newTempFour.toFixed(2);
            console.log(FTempFour);
            var humidFour = data.list[36].main.humidity;
            console.log(humidFour);
            var windFour = data.list[36].wind.speed;
            console.log(windFour);
            document.getElementById("weather-Four").innerHTML = "Date: " + dateFour +"<div id='icon'><img id='wicon' src="+ iconurlFour +" alt=></div>" + " Temp: " + FTempFour + " Humidity: " + humidFour + " Wind Speed: " + windFour + " MPH";
            })    

        }

       
           
    })
       
   
  

}
//Event listener for search button on HTML to fetch API information and start function
searchCity.addEventListener('click', getApi)