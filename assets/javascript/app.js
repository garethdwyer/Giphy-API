$(document).ready(function(){
//
// Create variables
  var moodArray = ["Angry", "Annoyed", "Apathetic", "Calm",  "Cranky", "Dreamy", "Envious","Flirty", "Frustrated", "Giddy","Irritated", "Joyful",
"Mad", "Mellow",  "Peaceful", "Silly", "Sad", "Stressed", "Weird" ];

var API_KEY = "78MKQW8dDk5dGF0NrGR1bQa0rRV79wkP";

// Create topics from array
function displayButtons(){
  // Clear the buttons to prevent duplicates.
  $(".buttonSection").empty();
  for( var i=0; i< moodArray.length; i++){
    //
    var gifBtn = $("<button>");
    gifBtn.addClass( "btn-group mood mr-2 btn-secondary" );
    gifBtn.attr("data-mood", moodArray[i]);
    gifBtn.append(moodArray[i]);
    $(".buttonSection").append(gifBtn);
  };
};

$(".buttonSection").on("click", ".btn-secondary", function(event) {
  event.preventDefault();

  // Ajax query
  var mood = $(this).data("mood");
  console.log("Mood - " + mood );
  // var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&limit=10&api_key=" + API_KEY;
  console.log("Query: " + queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(results) {
    console.log(results);
    // Clear previous results
    $("#results").empty();
    // Loop through the results and display them.
    // results.data.length
    for (var i = 0; i < results.data.length; i++){


      var gifDiv = $("<div>").addClass("card");
      var newGif = $('<img>').addClass('gif card-img-top img-fluid')
                             .attr("src", results.data[i].images.fixed_height_still.url)
                             .attr("data-paused",results.data[i].images.fixed_height_still.url)
                             .attr("data-playing",results.data[i].images.original.url)
                             .attr("data-state", "paused");
      var ratingDiv = $('<div>').addClass('gifRating card-block');
      var cardTitle = $('<h4>').addClass("card-title text-center")
                               .text("Rating: " + results.data[i].rating);
      //
      gifDiv.append(newGif);
      gifDiv.append(ratingDiv);
      gifDiv.append(cardTitle);
      $('#results').append(gifDiv);
   };
  });

});

    // When the Gif is clicked it will move it
    $("#results").on("click", ".gif", function (){
      var state = $(this).attr("data-state");
      console.log("State-" + state + " This - " + this);
      if (state === "paused") {
        console.log("Paused-" + state + " This - " + this);
        $(this).attr("src", $(this).attr("data-playing"))
        $(this).attr("data-state", "playing")

      } else {
        console.log("Playing-" + state + " This - " + this);
        $(this).attr("src", $(this).attr("data-paused"))
        $(this).attr("data-state", "paused")
      }
  });

// When the add button is clicked a new mood is added.
  $("#addBtn").on("click",function(event){
    event.preventDefault();
    // Create a new Button for the mood added.
    var addBtn = $("#add").val().trim();
    moodArray.push(addBtn);
    $(".submit").val("");
    console.log( "New Array: " + moodArray );
    displayButtons();
  });


displayButtons();
console.log( "Array: " + moodArray );


});
