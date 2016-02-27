Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready( function ( event ){

	userHistory(event);

});

function userHistory(event)
{
	var currentUser = Parse.User.current();
	if(currentUser) {
		var history = currentUser.get("drinkHistory");
		if(history.length == 0 )
		{
			$('#nohistory').show();
			$("#History").hide();
		}
		else
		{
			$.each(history, function(index, value){
				$("#list").append("<dt>" + value["size"] + " "
				+ value["name"] + ": " + "</dt>");
				$("#list").append("<dd>" + value["caffeine"] + "mg of caffeine at " + value["date"]
				+ "</dd>");
			});
		}
	}
}
