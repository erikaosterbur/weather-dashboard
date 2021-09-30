
// search button has event listener
    // fetches data from API - one request or two
    // add div for current weather & populate it
    // add div of divs for five-day forecast
    // add classes for UV Index
    // add little pictures of weather
    // create button for searched cities with event listener that sends back to query for search bar


var APIkey = "13587ddc1a93abaf22f594f3491aed1e";
var cityInput = $("#city");
var searchBtn = $("#searchBtn");
var searchedCitiesContainer = $("#searched-cities-container");
var cityContainer = $("city-container");
var fiveDayForecastContainer = $("#five-day-forecast-container");


searchBtn.on("click", function formSubmitHandler(event){
    event.preventDefault();
    var city = cityInput.val().trim()

    if (city) {
      getCity(city);
  
    } else {
      alert('Please enter a city name');
    }
})

  function getCity(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(queryURL)
    .then(function(response){
      if (response.ok) {
        response.json().then(function(data){
            console.log(data, city);
          displayCity(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error){
      alert('Unable to connect to Weather Dashboard');
    });
};

function displayCity(data, city){
    if (city.length === 0) {
        cityContainer.textContent = 'No city found.';
        return;
      }

    //append city name & date to container

    console.log(data.main.temp);
    

}


