var settings = {
    "url": "https://api.yelp.com/v3/businesses/search?name=&location=San Diego",
    "method": "GET",
    "timeout": 0,
    "headers": {
    "Authorization": "Bearer f8a8rHUaTF8-rGjw6Ap5l3RLMBlUolqUUy7wKupzJ1MDPlSWDctHN4Qh197KOHHmaUEHXNA_5wljb3aJAramwCFqZPoaq7gPHRpCE9a7FLrWpwY9eaw3Mr4vw-g1XnYx"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });