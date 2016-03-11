Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready(function(event) {
  recommend(event);
});

function recommend (event) {
  var currentUser = Parse.User.current();
  var remainingIntake = currentUser.get("remainingCaffeine");
  var maxIntake = currentUser.get("maxCaffeine");
  var beverageList = new Array();

  $.getJSON('beverages', function(data){
    beverageList = data;
    console.log(data);
  });

  console.log(beverageList.length);
  var percentRemaining = remainingIntake/maxIntake;
  console.log(percentRemaining);
  if (percentRemaining >= .5) {
    $('#rec').append("Here are some recommendations:");
    var recDrink = $('<a href=\"#\" id=\"recDrink1\">Grande Caffe Mocha with 175 mg of caffeine</a>');
    $('#rec1').append(recDrink);
    recDrink = $('<a href=\"#\" id=\"recDrink2\">Short Pike\'s Place Roast with 180 mg of caffeine</a>');
    $('#rec2').append(recDrink);
    recDrink = $('<a href=\"#\" id=\"recDrink3\">Venti Teavana Shaken Iced Black Tea with 140 mg of caffeine</a>');
    $('#rec3').append(recDrink);
  } else if (percentRemaining < .5) {
    $('.recommendUser').append("Here are some recommendations: ");
  } else {
    $('.recommendUser').append("Avoid caffeine! Here are some decaffeinated drinks: ");
  }

}

$('#rec1').click(function(event) {
  var currentUser = Parse.User.current();
  var remainingIntake = currentUser.get("remainingCaffeine");
  var maxIntake = currentUser.get("maxCaffeine");

  var currentDate  = new Date();
  var mon          = currentDate.getMonth()+1;
  var day          = currentDate.getDate();
  var year         = currentDate.getFullYear();
  var dateString   = mon + "/" + day + "/" + year;

  var percentRemaining = remainingIntake/maxIntake;
  if(percentRemaining >= .5) {
    var caffeineObj = {
      "name": "Caffe Mocha",
      "bid": "7",
      "cid": "1",
      "caffeine": "175",
      "size": "Grande",
      "date": dateString
    };
    showExceedingWarning(event, caffeineObj);
  }
});
