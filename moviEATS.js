var url =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=";
var url =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=";

var form = document.querySelector(".form");

//We will use the key and set the value of the food.
var foodObject = {
  Comedy: "hotdog",
  "Horror, Sci-Fi": "taco",
  Drama: "icecream",
  Adventure: "pizza",
  "Sci-fi": "beer",
  "Comedy, Drama": "More beer"
};

const object1 = {
  a: "somestring",
  b: 42,
  c: false
};

// console.log(Object.keys(object1).includes('a'));

form.addEventListener("submit", function(e) {
  e.preventDefault();
  displayContent();
});

var displayContent = function() {
  var output = document.querySelector(".output");
  var mainInput = document.querySelector(".main-input");
  var cardList = document.querySelector(".card-list");
  getMovieData(mainInput, output, cardList);
};

var getMovieData = function(input, output, cardList) {
  var input = input;
  var output = output;
  var card = cardList;

  var filteredFood = function(movie) {
    var keys = Object.keys(foodObject);
    console.log(keys);
    if (keys.includes(movie.Genre)) {
      output.classList.add("show");
      card.textContent = movie.Genre;
    }
  };

  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/?apikey=24ec2260&t=" + input.value,
    success: function(data) {
      var moviesArray = [];
      moviesArray.push(data);
      moviesArray.forEach(filteredFood);
    },
    error: function(error) {
      console.log(error);
    }
  });
};
