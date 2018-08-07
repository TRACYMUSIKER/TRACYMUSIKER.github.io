var form = document
  .querySelector(".form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    var input = document.querySelector(".main-input");
    getMoviesAPI(input.value);
  });

  var foodObject = {
    Adventure: ["chicken", "taco"],
    "Comedy": ["pasta", "chicken"],
    Horror: ["taco", "asian"],
    Animation: ["asian", "beef"],
    Drama: ["rice", "potato"],
    Action: ["spicy", "beef"],
    "Sci-Fi": ["spinach", "fish"],
    Crime: ["rice"],
    Sport: ["pizza"],
    Documentory: ["asian"]
  };

var dropDownShow = document.querySelector(".dropdown");

var randomArrayItem = function(recipeOptions) {
  return recipeOptions[Math.floor(Math.random() * recipeOptions.length)];
  console.log(recipeOptions);
};

var getRecipe = function(food) {
  var recipeKey = "8bWerKz0i7mshVJxyR6nNJRIX7h7p1nFb5mjsnWGGkg3FQ4YkD";
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


var getMoviesAPI = function(input) {
  var output = document.querySelector(".output");
  var movieGenre = document.querySelector(".movie-genre");
  var keys = Object.keys(foodObject);
  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/?apikey=24ec2260&t=" + input,
    success: function(movie) {
      var checkMovie = movie.Genre.split(", ");
      if (keys.includes(checkMovie[0])) {
        movieGenre.textContent = movie.Genre;
        output.setAttribute('class', 'show');
        getRecipe(randomArrayItem(foodObject[checkMovie[0]]));
      } else {
        movieGenre.textContent = "Genre not found, try again.";
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
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
  dropDownShow.setAttribute('class', 'dropdown');
  dropDownShow.appendChild(recipeLink);
};

var viewRecipeButton = document.querySelector(".viewRecipeButton");
viewRecipeButton.addEventListener("click", function(x) {
  x.preventDefault();
  dropDownShow.classList.remove("dropdownHidden");
});
