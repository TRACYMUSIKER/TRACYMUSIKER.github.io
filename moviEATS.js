var form = document
  .querySelector(".form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    displayContent();
  });

var dropDownShow = document.querySelector(".dropdown");

var displayContent = function() {
  var output = document.querySelector(".output");
  var mainInput = document.querySelector(".main-input");
  var cardList = document.querySelector(".card-list");
  getMovieData(mainInput, output, cardList);
};

var randomArrayItem = function(recipeOptions) {
  return recipeOptions[Math.floor(Math.random() * recipeOptions.length)];
};

var getMoviesAPI = function(input, filteredFood) {
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

var getRecipe = function(food) {
  var recipeApiUrl =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query=";
  $.ajax(recipeApiUrl + food, {
    headers: {
      "X-Mashape-Key": recipeKey,
      Accept: "application/json"
    },
    method: "GET",
    success: function(recipes) {
      var recipeInfo = randomArrayItem(recipes.Recipes);
      createRecipe(recipeInfo);
    }
  });
};

var getMovieData = function(input, output, cardList) {
  var input = input;
  var output = output;
  var card = cardList;

  var filteredFood = function(movie) {
    var foodObject = {
      Adventure: ["chicken", "taco"],
      Comedy: ["pasta", "chicken"],
      Horror: ["taco", "asian"],
      Animation: ["asian", "beef"],
      Drama: ["rice", "potato"],
      Action: ["spicy", "beef"],
      "Sci-Fi": ["spinach", "fish"],
      Crime: ["rice"],
      Sport: ["pizza"],
      Documentory: ["asian"]
    };

    var keys = Object.keys(foodObject);
    var checkMovie = movie.Genre.split(", ");
    if (keys.includes(checkMovie[0])) {
      output.classList.add("show");
      card.textContent = movie.Genre;
      getRecipe();
    } else {
      output.classList.add("show");
      card.textContent = "Genre not found, try again.";
    }
  };
  getMoviesAPI(input, filteredFood);
};

var createRecipe = function(recipe) {
  var recipeImage = document.createElement("img");
  var recipeTitleDisplay = document.createElement("p");
  var recipeLink = document.createElement("a");
  recipeImage.classList.add(".recipe-img");
  recipeTitleDisplay.classList.add(".recipe-title");
  recipeLink.classList.add(".recipe-link");
  recipeImage.setAttribute("src", recipe.image);
  recipeTitleDisplay.textContent = recipe.name;
  recipeLink.setAttribute("href", recipe.link);
  recipeLink.appendChild(recipeTitleDisplay);
  dropDownShow.appendChild(recipeImage);
  dropDownShow.appendChild(recipeLink);
};

var viewRecipeButton = document.querySelector(".viewRecipeButton");
viewRecipeButton.addEventListener("click", function(x) {
  x.preventDefault();
  dropDownShow.classList.remove("dropdownHidden");
});
