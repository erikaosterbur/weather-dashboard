
var APIkey = "13587ddc1a93abaf22f594f3491aed1e";
var cityInput = $("#city");
var searchBtn = $("#searchBtn");
var searchedCitiesContainer = $("#searched-cities-container");
var cityContainer = $("#city-container");
var fiveDayForecastContainer = $("#five-day-forecast-container");
var searchedCities = [];

searchBtn.on("click", function formSubmitHandler(event){
    event.preventDefault();
    var city = cityInput.val().trim()

    if (city) {
      getCity(city);
      addCity(city);
  
    } else {
      alert('Please enter a city name');
    }
})

    // gets lattitude & longitude coordinates and plugs them into the next function
  function getCity(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(queryURL)
    .then(function(response){
      if (response.ok) {
        response.json().then(function(data){
            var lat = data.coord.lat;
            var long = data.coord.lon;
            getCityCoords(lat, long);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error){
      alert('Unable to connect to Weather Dashboard');
    });
};

 // uses entered city coordinates to generate API data
 function getCityCoords(lat, long){
    var geoURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + APIkey;
    fetch(geoURL)
    .then( function(response){
      if (response.ok) {
          response.json().then(function(data){
              console.log(data);
              displayCityData(data);
          })
      } else {
          alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error){
      alert('Unable to connect to Weather Dashboard');
    });
}

function displayCityData(data){
    //displays hidden container
    cityContainer.show();

    //displays searched for city title and date
    var cityTitle = cityInput.val().trim();
    var date = moment().format('l');
    $("#city-title").empty().prepend(cityTitle + " -- " + date);

    //inserts weather icon 
    var iconCode = data.current.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $('#wicon').attr('src', iconURL);
    
    //gets current weather info from API
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var humidity = data.current.humidity;
    var uvi = data.current.uvi;

    //appends weather info to the page
    $("#uv-index").empty().append("UV Index: " + uvi);
    $("#humidity").empty().append("Humidity: " + humidity + "%");
    $("#wind").empty().append("Wind: " + wind + " MPH");
    $("#temp").empty().append("Temp: " + temp + "°F");
}

function addCity(city){
    var currentCities = JSON.parse(localStorage.getItem("allCities")) || [];

    if (!currentCities.includes(city)){
        localStorage.setItem("allCities", JSON.stringify(city));
        currentCities.push(city);
        localStorage.setItem("allCities", JSON.stringify(currentCities));   
    }



    // //NEXT STEPS HERE
    // var cityBtns = $();
    // $("#searched-cities-container").prepend(cityBtns);

};








