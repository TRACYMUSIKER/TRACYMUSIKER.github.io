var recipeApiUrl =
"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query=";


var form = document
  querySelector(".form")
  .addEventListener('submit',function(e){
  e.preventDefault();
  var input = document.querySelector(".main-input");
  getMoviesApi(input.value);
});

var dropDownShow = document.querySelector(".dropdown");

var randomArrayItem = function(recipeOptions) {
  return recipeOptions[Math.floor(Math.random() * recipeOptions.length)];
};

var getMoviesAPI = function(input) {
  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/?apikey=24ec2260&t=" + input,
    success: function(data) {
      getRecipe(randomArrayItem(foodObject[movie.Genre]));
    },
    error: function(error) {
      console.log(error);
    }
  });
};

var foodObject = {
  "Horror, Thriller": ["chicken", "taco"],
  Comedy: ["pasta", "chicken"],
  "Horror, Sci-Fi": ["taco", "asian"],
  "Adventure, Drama, Fantasy": ["asian", "beef"],
  "Action, Adventure, Sci-Fi": ["rice"],
  Drama: ["rice", "potato"],
  "Drama, Fantasy, Romance": ["potato"],
  "Action, Adventure, Fantasy": ["spicy", "beef"],
  "Animation, Adventure, Comedy": ["rice", "potato"],
  "Sci-Fi": ["spinach", "fish"],
  "Drama, Romance": ["ravioli"],
  "Comedy, Drama": ["creamy", "ravioli"],
  "Comedy, Fantasy": ["taco", "pasta"],
  "Drama, History, Romance": ["asian", "pasta"],
  "Action, Comedy, Crime": ["creamy"],
  "Drama, Sport": ["fish", "beef"]
};


var getRecipe = function(food) {
  console.log(food);
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
  var input = document.querySelector(".main-input");
  getMoviesAPI(input);
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
