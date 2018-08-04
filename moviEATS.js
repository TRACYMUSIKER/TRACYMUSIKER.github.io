
var recipeApiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query='
var form = document.querySelector(".form")

var foodObject = 
  {
  Comedy: ["pasta", "chicken"],
  "Horror, Sci-Fi": ["taco", "asian"],
  Drama: ["rice", "potato"],
  Adventure: ["spicy", "beef"],
  "Sci-fi": ["spinach", "fish"],
  "Comedy, Drama": ["creamy", "ravioli"]
};

var dropDownShow = document.querySelector('.dropdown');

var moviesArray = [];
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

      $.ajax({
        type: "GET",
        url: `http://www.omdbapi.com/?apikey=24ec2260&t=${input.value}`,
        success: function(data) {
          moviesArray.push(data);
          moviesArray.forEach(function(movie) {
            if( movie.Genre === "Comedy, Drama") {
                output.classList.add('show');
                card.textContent = movie.Title;

            }
          
          });
        },
        error: function(error) {
          console.log(error);
        }
      });
    };
    // ${foodArray.genre}

var randomArrayItem = function(recipeOptions) {
  return recipeOptions[Math.floor(Math.random()*recipeOptions.length)];
}


var getRecipe = function(food) {
  $.ajax(recipeApiUrl + food, {
    headers: {
        "X-Mashape-Key": recipeKey,
        "Accept": "application/json" ,
    },
    method: "GET", 
    success: function(recipes) {
        var recipeInfo = randomArrayItem(recipes.Recipes);
        createRecipe(recipeInfo);
    }
  })
}
console.log(getRecipe('tamales'));
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

var createRecipe = function(recipe) {
  var recipeImage = document.createElement('img');
  var recipeTitleDisplay = document.createElement('p');
  var recipeLink = document.createElement('a')
  recipeImage.classList.add('.recipe-img');
  recipeTitleDisplay.classList.add('.recipe-title')
  recipeLink.classList.add('.recipe-link');
  recipeImage.setAttribute('src', recipe.image);
  recipeTitleDisplay.textContent = recipe.name;
  recipeLink.setAttribute('href', recipe.link);
  recipeLink.appendChild(recipeTitleDisplay);
  dropDownShow.appendChild(recipeImage);
  dropDownShow.appendChild(recipeLink);
}
)
var viewRecipeButton = document.querySelector('.viewRecipeButton')
viewRecipeButton.addEventListener("click", function(x){
  x.preventDefault();
  dropDownShow.classList.remove('dropdownHidden');

})

