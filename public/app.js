// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div class='card'><div class='card-body' data-id='" + data[i]._id + "'>" + " <img src='" + data[i].imgURL + "'/>" +  "<h1>" + data[i].title + "</h1>" + "<br />" + "<p>" + data[i].summary + "</p>"  + "<br>" + "<a href='" + data[i].link + "'target='_blank''>"  + data[i].link + "</a></div></div>");
    }
  });
  

  
  // Whenever someone clicks a p tag
  $(document).on("click", ".card-body", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  console.log(thisId + "was clicked")
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' placeholder='subject' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' placeholder='body' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
        else {
            console.log("the note didn't work");
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  