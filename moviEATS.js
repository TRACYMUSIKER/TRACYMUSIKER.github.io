var form = document.querySelector(".form");
var moviesArray = [];
var foodArray = ['hotdog','taco','pizza','icecream'];

form.addEventListener("submit", function(e) {
  e.preventDefault();
  createElements();
});

var createElements = function() {
  var output = document.querySelector(".output");
  var mainInput = document.querySelector(".main-input");
  var cardList = document.createElement("div");
  cardList.classList.add("card-list");
  output.appendChild(cardList);
  getMovieData(mainInput, output, cardList);
};

//GET food API & Display on page
var getMovieData = function(userInput, result, card) {
  var input = userInput;
  var movieResult = result;
  var newCard = card;
  $.ajax({
    type: "GET",
    url: `http://www.omdbapi.com/?apikey=24ec2260&t=${input.value}`,
    success: function(data) {
      moviesArray.push(data);
      moviesArray.forEach(function(movie) {
        if (movie.Genre === 'Comedy, Drama') {
          newCard.textContent = movie.Title;
          movieResult.appendChild(newCard);
          console.log(movie);
        } else {
          console.log(movie.Genre);
        }
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
};

var getMoviesAPI = function() {
  $.ajax({
    type:'GET',
    url:`http://www.omdbapi.com/?apikey=24ec2260&t`,
    success: function(data) {
      moviesArray.push(data);
      moviesArray.forEach(function(movies){
        return movies;
      })
    },
    error: function(error) {
      console.log(error);
    }
  })
}

getMoviesAPI();

//filter by the food and set it to the movie genre.