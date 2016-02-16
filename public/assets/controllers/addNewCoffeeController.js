Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready(function ( event ) {

	isUserSignedIn( event );
	appendSwipe( event );
	$(document).ready(function(){
  	$('.bxslider').bxSlider({

  	});
});

});


var sizeID;

$("#signOut").click(signOut);

// Company ( Brand ) selection is Step 1
$(".company").click( function (event ) {
	event.preventDefault();
	var companyID;

	//console.log(this.id);
	companyID = this.id;
	selectFromSwipeList ( event, "./types" + "?" + "cid=" + companyID);
});

// Type of Beverage selection is Step 2
$(".type").click( function (event ) {
	event.preventDefault();
	var beverageType;

	//console.log(this.id);
	beverageType = this.id;
	selectFromSwipeList ( event, "./beverages" + "?" + "type=" + beverageType);
});

// Beverage Selection is Step 3
$(".beverage").click( function (event ) { //future class for beverage.handlebars = .beverage
	event.preventDefault();
	//console.log(this.id);

	var beverageName;
	beverageName = this.id;
	selectFromSwipeList ( event, "./sizes"+ "?" + "name=" + beverageName);
});

//Size Selection is Step 4
$(".size").click( function (event ) { //future class for size.handlebars = .size
	event.preventDefault();

	// CAFFEINE INTAKE ADD FUNCTION! 
	console.log( $(this).val());
	incrementCaffeineIntake( event, $(this).val() );

});

$


function signOut( event ) {


	var currentUser = Parse.User.current();

	if (currentUser) {
		//log out when user is sign in
		alert("You are successfully sign out");
	    Parse.User.logOut();
	} else {
	    // show the signup or login page
	    alert("You have to sign in first");
	}

	window.location.href = "./sign-in.html";

	var currentUser = Parse.User.current();  // this will now be null

}



function isUserSignedIn ( event ) {

	var currentUser = Parse.User.current();

	if ( !currentUser ) {
	    // show the signup or login page
	    alert("You have to sign in first");
		window.location.href = "./sign-in.html";
	}
	else
	{
		//show name after user

	}

}

function appendSwipe ( event ) {
	// pure JS
	var elem = document.getElementById('mySwipe');
	window.mySwipe = Swipe(elem, {
	  // startSlide: 4,
	  // auto: 3000,
	  // continuous: true,
	  // disableScroll: true,
	  // stopPropagation: true,
	  // callback: function(index, element) {},
	  // transitionEnd: function(index, element) {}
	});
}


function selectFromSwipeList ( event, url ) {
	window.location.href = url;
}




function incrementCaffeineIntake( event, caffeine ) {
	//Call current user
	var currentUser = Parse.User.current();
	var newCaffeine = currentUser.get( "todayscaffeine") + Number(caffeine);
	var todaysDate  = new Date();

	//Update information
	console.log( newCaffeine );
	currentUser.set("todayscaffeine",newCaffeine);
	currentUser.set("lastInputTime", todaysDate);
	currentUser.save(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	   	selectFromSwipeList ( event, "/");

	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}