var form = document
  .querySelector(".form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    var input = document.querySelector('.main-input');
    getMoviesAPI(input.value);
  });

var dropDownShow = document.querySelector(".dropdown");

var randomArrayItem = function(recipeOptions) {
  return recipeOptions[Math.floor(Math.random() * recipeOptions.length)];
  console.log(recipeOptions);
};

var getMoviesAPI = function(input) {
  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/?apikey=24ec2260&t=" + input,
    success: function(movie) {
      getRecipe(randomArrayItem(foodObject[movie.Genre]));
    },
    error: function(error) {
      console.log(error);
    }
  });
};

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

var getMovieData = function(input) {
  var input = document.querySelector(".main-input");
  getMoviesApi(input);
}

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
