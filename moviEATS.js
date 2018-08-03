var form = document.querySelector(".form");
var moviesArray = [];
var foodArray = ['hotdog','taco','pizza','icecream'];
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
    console.log(input);
    var output = output;
    console.log(output)
    var card = cardList;
    console.log(cardList);
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


 //GET food API & Display on page
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
