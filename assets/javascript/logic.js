

 
var animals = ["red panda", "goat", "dolphin", "giraffe", "bunny", "kitten", "puppy", "unicorn"];



function renderButtons() {

 
  $("#buttons-view").empty();

  
  for (var i = 0; i < animals.length; i++) {

   
    var a = $("<button>");
   
    a.addClass("animal-btn");
    
    a.attr("data-name", animals[i]);
   
    a.text(animals[i]);
    
    $("#buttons-view").prepend(a);
  }
}


$("#add-animal").on("click", function(event) {
  event.preventDefault();
  
  var animal = $("#animal-input").val().trim();

 
  animals.push(animal);

  
  renderButtons();
});


$(document).on("click", ".animal-btn", displayAnimalInfo);


renderButtons();
var sexyNumber = 0;

function displayAnimalInfo() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"; 

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
    	sexyNumber = sexyNumber++;

    	var animalDiv = $("<div class='animal'>");
    	

    	var imgURL = response.data[0].images.downsized.url;
    	var dataStill = response.data[0].images.downsized_still.url;

    	var image = $("<img>").attr("src", imgURL);
    	image.attr('data-still', dataStill);
    	image.attr('data-animate', imgURL);
    	image.attr('data-state', 'animate');
    	image.attr('class', 'animal-image');
    	var sexyId = 'animal-image-' + sexyNumber
    	image.attr('id', sexyId)

    	animalDiv.prepend(image);
    	

    	$("#animals-view").prepend(animalDiv);

    	$('#' + sexyId).on("click", function() {
   	  
    	  var state = $(this).attr("data-state");
    	  
    	  if (state === "still") {
    	    $(this).attr("src", $(this).attr("data-animate"));
    	    $(this).attr("data-state", "animate");
    	  } else {
    	    $(this).attr("src", $(this).attr("data-still"));
    	    $(this).attr("data-state", "still");
    	  }
    	});
    });
};





