var searchCity = document.querySelector('#search-button');
var cityName = document.querySelector('#cityName');

//This will fetch latitude and longitude by city
function getApi() {
    var cityNameVal = cityName.value
    console.log(cityNameVal);
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameVal + "&limit=1&appid=27da570459e0dbef2f6562c7c304faf3";
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
        getWeather(data[0]);

//This will fetch weather by longitude and latitude
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
            })       

        }

    })
  

}

searchCity.addEventListener('click', getApi)