var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query='

$.ajax(url + "pasta", {
    headers: {
        "X-Mashape-Key": recipeKey,
        "Accept": "application/json" ,
    },
    method: "GET", 
    success: function(data) {
        console.log(data)
    }
})
