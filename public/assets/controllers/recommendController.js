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
  if (percentRemaining > 0) {
    $('#rec').append("Here are some recommendations:");
    var recDrink = $('<a id=\"recDrink1\">Grande Caffe Mocha with 175 mg of caffeine</a>');
    $('#rec1').append(recDrink);
    recDrink = $('<a id=\"recDrink2\">Short Pike\'s Place Roast with 180 mg of caffeine</a>');
    $('#rec2').append(recDrink);
    recDrink = $('<a id=\"recDrink3\">Venti Teavana Shaken Iced Black Tea with 140 mg of caffeine</a>');
    $('#rec3').append(recDrink);
  } else {
    $('#rec').append("Here are some decaffeinated drinks: ");
    var recDrink = $('<a id=\"recDrink1\">Grande Ginger Ale</a>');
    $('#rec1').append(recDrink);
    recDrink = $('<a id=\"recDrink2\">Grande Teavana Shaken Iced Green Tea Lemonade</a>');
    $('#rec2').append(recDrink);
    recDrink = $('<a id=\"recDrink3\">Strawberry Smoothie</a>');
    $('#rec3').append(recDrink);
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
  var caffeineObj;

  var percentRemaining = remainingIntake/maxIntake;
  if(percentRemaining > 0) {
    caffeineObj = {
      "name": "Caffe Mocha",
      "bid": "7",
      "cid": "1",
      "caffeine": "175",
      "size": "Grande",
      "date": dateString
    };
  } else {
    caffeineObj = {
      "name": "Ginger Ale",
      "bid": "10",
      "cid": "1",
      "caffeine": "0",
      "size": "Grande",
      "date": dateString
    };
  }
  showExceedingWarning(event, caffeineObj);
});

$('#rec2').click(function(event) {
  var currentUser = Parse.User.current();
  var remainingIntake = currentUser.get("remainingCaffeine");
  var maxIntake = currentUser.get("maxCaffeine");

  var currentDate  = new Date();
  var mon          = currentDate.getMonth()+1;
  var day          = currentDate.getDate();
  var year         = currentDate.getFullYear();
  var dateString   = mon + "/" + day + "/" + year;
  var caffeineObj;

  var percentRemaining = remainingIntake/maxIntake;
  if(percentRemaining > 0) {
    caffeineObj = {
      "name": "Pike Place Roast",
      "bid": "5",
      "cid": "1",
      "caffeine": "180",
      "size": "Short",
      "date": dateString
    };
  } else {
    caffeineObj = {
      "name": "TeavanaÂ® Shaken Iced Green Tea Lemonade",
      "bid": "3",
      "cid": "1",
      "caffeine": "0",
      "size": "Grande",
      "date": dateString
    };
  }
  showExceedingWarning(event, caffeineObj);
});

$('#rec3').click(function(event) {
  var currentUser = Parse.User.current();
  var remainingIntake = currentUser.get("remainingCaffeine");
  var maxIntake = currentUser.get("maxCaffeine");

  var currentDate  = new Date();
  var mon          = currentDate.getMonth()+1;
  var day          = currentDate.getDate();
  var year         = currentDate.getFullYear();
  var dateString   = mon + "/" + day + "/" + year;
  var caffeineObj;

  var percentRemaining = remainingIntake/maxIntake;
  if(percentRemaining > 0) {
    caffeineObj = {
      "name": "TeavanaÂ® Shaken Iced Black Tea",
      "bid": "3",
      "cid": "1",
      "caffeine": "140",
      "size": "Venti",
      "date": dateString
    };
  } else {
    caffeineObj = {
      "name": "Strawberry Smoothie",
      "bid": "9",
      "cid": "1",
      "caffeine": "0",
      "size": "One Size",
      "date": dateString
    };
  }
  showExceedingWarning(event, caffeineObj);
});
