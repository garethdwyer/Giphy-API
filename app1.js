$(document).ready(function(){
//
// Create variables
  var moodArray = [ "Angry", "Calm", "Bad", "Cranky", "Depressed","Envious", "Energetic", "Frustrated", "Excited", "Flirty",
"Happy", "Irritated", "Joyful", "Mad", "Mellow", "Rejected", "Silly", "Sad", "Stressed" ];

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
  // Clear previous results
  $(".results").empty();
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
    // Loop through the results and display them.
    // results.data.length
    for (var i = 0; i < 5; i++){

      // Creates a div to hold the gif and appends it to .results
      var gifDiv = $("<div>");
      gifDiv.addClass( "gif-div");

      // var cardSection = $("<div>");
      // cardSection.addClass("card-body");
      // cardSection.attr('id', 'headline');
      // Create a variable for the rating
      var rating = results.data[i].rating;
      console.log(rating);
      var ratingSpan = $('<p>');
      ratingSpan.addClass('gifRating');
      ratingSpan.text("Rating: " + rating);
      var newGif = $('<img>');
      newGif.addClass('gif');
      newGif.attr("src", results.data[i].images.fixed_width.url);
      gifDiv.prepend(ratingSpan);
      gifDiv.prepend(newGif);
      $('.results').append(gifDiv);
   };
  });


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
