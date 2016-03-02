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
				var date = new Date ( value["date"] );

				$("#historytable tbody").append("<tr><td>" + value["name"]
												 + "</td><td>" + value["caffeine"]
												 + " mg</td><td>" + ( date.getMonth() + 1 ) + " / " + date.getDate()
												 + "</td></tr>");
			});
		}
	}
}
