
var viewRecipeButton = document.querySelector(".viewRecipeButton");
var form = document
  .querySelector(".form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    var input = document.querySelector('.main-input');

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
      var checkMovie = movie.Genre.split(", ");
      var theMovieGenre = checkMovie[0];
      getRecipe(randomArrayItem(foodObject.theMovieGenre));
    }
  //   error: function(error) {
  //     console.log(error);
  //   }
  // }),
});

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
      console.log(recipes.Recipes);
      createRecipe(recipeInfo);
    }
  });
};

var getMovieData = function(input) {
  var input = document.querySelector(".main-input");
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

viewRecipeButton.addEventListener("click", function(x) {
  x.preventDefault();
  dropDownShow.classList.remove("dropdownHidden");
};