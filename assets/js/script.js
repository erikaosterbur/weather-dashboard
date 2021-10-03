var APIkey = "13587ddc1a93abaf22f594f3491aed1e";
var cityInput = $("#city");
var searchBtn = $("#searchBtn");
var searchedCitiesContainer = $("#searched-cities-container");
var cityContainer = $("#city-container");
var fiveDayForecastContainer = $("#five-day-forecast-container");
var searchedCities = [];
var currentCities = JSON.parse(localStorage.getItem("allCities")) || [];

//hides five day forecast container and displays search history buttons
$(document).ready (function() {
  fiveDayForecastContainer.hide();
  setCityBtns(currentCities);
});

//displays previously searched-for city buttons to the page and click function
function setCityBtns(){
  for (var i = 0; i < currentCities.length; i++){
    var cityBtns = $('<button type="button" class="btn btn-info btn-lg my-2">'+ currentCities[i] + '</button>');
    cityBtns.on("click", function(){
      var city = $(this).text();
      getCity(city);
    })
    addCityBtns(cityBtns);
  }
}

//search button click function
searchBtn.on("click", function formSubmitHandler(event){
    event.preventDefault();
    var city = cityInput.val().toUpperCase().trim();

    if (city){
      getCity(city);
    } else {
      alert('Please enter a city name');
    }
})

    // gets lattitude & longitude coordinates and plugs them into the next function
  function getCity(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(queryURL)
    .then(function(response){
      if (response.ok) {
        response.json().then(function(data){
            var lat = data.coord.lat;
            var long = data.coord.lon;
            getCityCoords(lat, long, city);
            addCity(city);
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
 function getCityCoords(lat, long, city){
    var geoURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + APIkey;
    fetch(geoURL)
    .then(function(response){
      if (response.ok) {
          response.json().then(function(data){
              console.log(data);
              displayCityData(data, city);
              displayFiveDay1(data);
              displayFiveDay2(data);
              displayFiveDay3(data);
              displayFiveDay4(data);
              displayFiveDay5(data);
          })
      } else {
          alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error){
      alert('Unable to connect to Weather Dashboard');
    });
}

function displayCityData(data, city){
    //displays hidden container
    cityContainer.show();

    //displays searched for city title and date
    var cityTitle = city;
    var date = moment().format('l');
    $("#city-title").empty().prepend(cityTitle + " -- " + date);

    //inserts weather icon 
    var iconCode = data.current.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
    $('#wicon').attr('src', iconURL);
    
    //gets current weather info from API
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var humidity = data.current.humidity;
    var uvi = data.current.uvi;

    //empties any current cities and appends weather info to the page
    $("#uv-index").empty().append("UV Index: " + uvi);
    $("#humidity").empty().append("Humidity: " + humidity + "%");
    $("#wind").empty().append("Wind: " + wind + " MPH");
    $("#temp").empty().append("Temp: " + temp + "°F");

    if (uvi <= 2) {
      $("#uv-index").removeClass().addClass("favorable");
    }
    else if (uvi > 2 && uvi <= 5) {
      $("#uv-index").removeClass().addClass("moderate");
    }
    else
      $("#uv-index").removeClass().addClass("severe");
}

function addCity(city){
    if (!currentCities.includes(city)){
        localStorage.setItem("allCities", JSON.stringify(city));
        currentCities.push(city);
        localStorage.setItem("allCities", JSON.stringify(currentCities));   
    }
};

function addCityBtns(cityBtns){
            cityBtns.appendTo('#searched-cities-container');
}

function displayFiveDay1(data){
  //displays hidden container
  fiveDayForecastContainer.show();

  //displays date
  var date1 = moment().add(1, 'days').format('l');
  $("#date-1").empty().prepend(date1);

  //inserts weather icon 
  var iconCode1 = data.daily[0].weather[0].icon;
  var iconURL1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
  $('#wicon-1').attr('src', iconURL1);
  
  //gets weather info from API
  var temp1 = data.daily[0].temp.day;
  var wind1 = data.daily[0].wind_speed;
  var humidity1 = data.daily[0].humidity;

  //empties any previous content and appends weather info to the page
  $("#humidity-1").empty().append("Humidity: " + humidity1 + "%");
  $("#wind-1").empty().append("Wind: " + wind1 + " MPH");
  $("#temp-1").empty().append("Temp: " + temp1 + "°F");
}

function displayFiveDay2(data){
  //displays hidden container
  fiveDayForecastContainer.show();

  //displays date
  var date2 = moment().add(2, 'days').format('l');
  $("#date-2").empty().prepend(date2);

  //inserts weather icon 
  var iconCode2 = data.daily[1].weather[0].icon;
  var iconURL2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
  $('#wicon-2').attr('src', iconURL2);
  
  //gets weather info from API
  var temp2 = data.daily[1].temp.day;
  var wind2 = data.daily[1].wind_speed;
  var humidity2 = data.daily[1].humidity;

  //empties any previous content and appends weather info to the page
  $("#humidity-2").empty().append("Humidity: " + humidity2 + "%");
  $("#wind-2").empty().append("Wind: " + wind2 + " MPH");
  $("#temp-2").empty().append("Temp: " + temp2 + "°F");
}

function displayFiveDay3(data){
  //displays hidden container
  fiveDayForecastContainer.show();

  //displays date
  var date3 = moment().add(3, 'days').format('l');
  $("#date-3").empty().prepend(date3);

  //inserts weather icon 
  var iconCode3 = data.daily[2].weather[0].icon;
  var iconURL3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
  $('#wicon-3').attr('src', iconURL3);
  
  //gets weather info from API
  var temp3 = data.daily[2].temp.day;
  var wind3 = data.daily[2].wind_speed;
  var humidity3 = data.daily[2].humidity;

  //empties any previous content and appends weather info to the page
  $("#humidity-3").empty().append("Humidity: " + humidity3 + "%");
  $("#wind-3").empty().append("Wind: " + wind3 + " MPH");
  $("#temp-3").empty().append("Temp: " + temp3 + "°F");
}

function displayFiveDay4(data){
  //displays hidden container
  fiveDayForecastContainer.show();

  //displays date
  var date4 = moment().add(4, 'days').format('l');
  $("#date-4").empty().prepend(date4);

  //inserts weather icon 
  var iconCode4 = data.daily[3].weather[0].icon;
  var iconURL4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
  $('#wicon-4').attr('src', iconURL4);
  
  //gets weather info from API
  var temp4 = data.daily[3].temp.day;
  var wind4 = data.daily[3].wind_speed;
  var humidity4 = data.daily[3].humidity;

  //empties any previous content and appends weather info to the page
  $("#humidity-4").empty().append("Humidity: " + humidity4 + "%");
  $("#wind-4").empty().append("Wind: " + wind4 + " MPH");
  $("#temp-4").empty().append("Temp: " + temp4 + "°F");
}

function displayFiveDay5(data){
  //displays hidden container
  fiveDayForecastContainer.show();

  //displays date
  var date5 = moment().add(5, 'days').format('l');
  $("#date-5").empty().prepend(date5);

  //inserts weather icon 
  var iconCode5 = data.daily[4].weather[0].icon;
  var iconURL5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
  $('#wicon-5').attr('src', iconURL5);
  
  //gets weather info from API
  var temp5 = data.daily[4].temp.day;
  var wind5 = data.daily[4].wind_speed;
  var humidity5 = data.daily[4].humidity;

  //empties any previous content and appends weather info to the page
  $("#humidity-5").empty().append("Humidity: " + humidity5 + "%");
  $("#wind-5").empty().append("Wind: " + wind5 + " MPH");
  $("#temp-5").empty().append("Temp: " + temp5 + "°F");
}