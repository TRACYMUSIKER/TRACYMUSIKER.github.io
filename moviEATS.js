var keysObjt = {
  recipeKey: (typeof process !== 'undefined' ? process.env.RECIPEKEY : recipeKey),
  movieKey:  (typeof process !== 'undefined' ? process.env.MOVIEKEY : movieKey)
}

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
};

var getRecipe = function(food) {
  var recipeApiUrl =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query=";
  $.ajax(recipeApiUrl + food, {
    headers: {
      "X-Mashape-Key": keysObjt.recipeKey,
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
  while (dropDownShow.firstChild) {
    dropDownShow.removeChild(dropDownShow.firstChild);
}

  fetch("http://www.omdbapi.com/?apikey=" + keysObjt.movieKey + "&t=" + input)
  .then(function(res){
    return res.json();
  })
  .then(function(movie){
    var checkMovie = movie.Genre.split(", ");
    if (keys.includes(checkMovie[0])) {
      movieGenre.textContent = movie.Genre;
      output.setAttribute('class', 'show output');
      for (i = 0; i < 4; i++) {
        getRecipe(randomArrayItem(foodObject[checkMovie[0]]));
      }
    } else {
      movieGenre.textContent = movie.Genre;
      getRecipe('salami');
    }
  });
}

var createRecipe = function(recipe) {
  var eachRecipeDiv = document.createElement("div");
  var linkDiv = document.createElement("div");
  var recipeImage = document.createElement("img");
  var recipeTitleDisplay = document.createElement("p");
  var recipeLink = document.createElement("a");
  eachRecipeDiv.classList.add("recipe-parent");
  recipeImage.classList.add("recipe-img");
  recipeTitleDisplay.classList.add("recipe-title");
  recipeLink.classList.add("recipe-link");
  linkDiv.classList.add("link-div");
  recipeImage.setAttribute("src", recipe.image);
  recipeTitleDisplay.textContent = recipe.name;
  recipeLink.setAttribute("href", recipe.link);
  recipeLink.textContent = "Click here for Recipe"
  // recipeLink.appendChild(recipeTitleDisplay);
  console.log(recipe.link);
  linkDiv.appendChild(recipeLink);
  eachRecipeDiv.appendChild(recipeTitleDisplay);
  eachRecipeDiv.appendChild(recipeImage);
  eachRecipeDiv.appendChild(linkDiv);
  dropDownShow.setAttribute('class', 'dropdown');
  dropDownShow.appendChild(eachRecipeDiv);
};




// var viewRecipeButton = document.querySelector(".viewRecipeButton");
// viewRecipeButton.addEventListener("click", function(x) {
//   x.preventDefault();
//   dropDownShow.classList.remove("dropdownHidden");
// });
