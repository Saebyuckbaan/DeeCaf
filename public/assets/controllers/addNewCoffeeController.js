Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready(function ( event ) {

	isUserSignedIn( event );
	appendSwipe( event );
	$(document).ready(function(){
  	$('.bxslider').bxSlider({

  	});
});

});

var companyID;
var beverageID;
var sizeID;
$("#signOut").click(signOut);
$(".company").click( function (event ) {
	event.preventDefault();
	console.log(this.id);
	companyID = this.id;
	selectFromSwipeList ( event, "./beverages");
});
$(".beverage").click( function (event ) { //future class for beverage.handlebars = .beverage
	event.preventDefault();
	console.log(this.id);
	beverageID = this.id;
	selectFromSwipeList ( event, "./sizes");
});
$(".size").click( function (event ) { //future class for size.handlebars = .size
	event.preventDefault();
	selectFromSwipeList ( event, "./");
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
