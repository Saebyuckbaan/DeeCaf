Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

function test ( event )
{
	var currentUser = Parse.User.current();
	if( currentUser )
	{
		var history = currentUser.get ( "drinkHistory");
		$.each( history, function (index, value ){
			console.log ( index + " " + value["name"] );

		});

	}

}