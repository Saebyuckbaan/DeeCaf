Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready(function ( event ) {

	isUserSignedIn( event );
	appendSwipe( event )

});

$("#signOut").click(signOut);
$(".list-of-brand").click( function (event ) { 
	event.preventDefault();
	selectFromSwipeList ( event, "./add-new-coffee-coffee.html");
});
$(".list-of-coffee").click( function (event ) { 
	event.preventDefault();
	selectFromSwipeList ( event, "./add-new-coffee-size.html");
});
$(".list-of-size").click( function (event ) { 
	event.preventDefault();
	selectFromSwipeList ( event, "./index.html");
});




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