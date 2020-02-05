var dispArray = [];

var settings = {
    "url": "http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&term=weed&location=San Diego",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin":"*",
      "Authorization": "Bearer f8a8rHUaTF8-rGjw6Ap5l3RLMBlUolqUUy7wKupzJ1MDPlSWDctHN4Qh197KOHHmaUEHXNA_5wljb3aJAramwCFqZPoaq7gPHRpCE9a7FLrWpwY9eaw3Mr4vw-g1XnYx"
    },
  };
  
  $.ajax(settings).done(function (response) {
    for (let index = 0; index < 5; index++){
      dispArray[index]=response.businesses[index];
    }
  });

console.log(dispArray);

  
//Need Ajax request to return list of 5 weed dispensaries nearby
    //store the 5 dispensaries as objects in an array 
    //Object needs to Business name, location, photo, rating, price, small description
//Once a business is picked, use that location to bring up 5 restaurants by that location 
    //Object needs to Business name, location, photo, rating, price, small description
