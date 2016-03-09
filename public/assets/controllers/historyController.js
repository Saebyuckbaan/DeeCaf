Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready( function ( event ){

	userHistory(event);
	$(".remove-btn").click(removeHistory);
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
			var count = 0;
			$.each(history, function(index, value){
				var date = new Date ( value["date"] );

				$("#historytable tbody").append("<tr><td>" + value["name"]
												 + "</td><td>" + value["caffeine"]
												 + " mg</td><td>" + ( date.getMonth() + 1 ) + " / " + date.getDate()
												 + "</td>" + "<td><a id=\"" + count 
												 + "\" class=\"btn btn-icon-only remove-btn default\">"
												 +"<i class=\"fa fa-times\"></i></a></td></tr>"
												 );

				$("#historytable tbody #"+count).data("date", date );
				$("#historytable tbody #"+count).data("name", value["name"] );

				count ++;
			});
		}
	}
}





function removeHistory( event )
{
	event.preventDefault();

	var currentUser  = Parse.User.current();
	var todaysDate   = new Date();
	
	var coffeeName   = $(this).data("name");
	var intakeDate   = new Date($(this).data("date"));
	
	var drinkHistory = currentUser.get("drinkHistory");
	var statistics   = currentUser.get("statistics");
	var todaysIntake = currentUser.get("todayscaffeine");
	var caffeineValue;

	todaysDate.setHours(0,0,0,0);

	//debugger;
	//if selected coffee is one that consumed today
	if ( intakeDate.getTime() == todaysDate.getTime() )
	{

		//Remove from drink History
		$.each( drinkHistory, function( key, value ) 
		{
			if ( coffeeName === value["name"] )
			{
				//get the caffeine value to subtract
				caffeineValue = value["caffeine"];
				
				//remove specific item (index, numbe of item)
				drinkHistory.splice( key, 1 );

				//reduce today's intake
				todaysIntake -= caffeineValue;
				
				//return false breaks the loop
				return false;
			}
		});

		//Set New Values
		currentUser.set("drinkHistory", drinkHistory);
		currentUser.set("todayscaffeine", todaysIntake);
		
		//Push new user data into Parse.com DB
		currentUser.save().then( function ( ) { location.reload();});

	}
	else
	{
		//Remove from drink History
		$.each( drinkHistory, function( key, value ) 
		{
			if ( coffeeName === value["name"] )
			{
				//get the caffeine value to subtract
				caffeineValue = value["caffeine"];

				//remove specific item (index, numbe of item)
				drinkHistory.splice( key, 1 );

				//return false breaks the loop
				return false;
			}
		});

		//Subtract caffeine intake from Statistics
		$.each( statistics, function( key, value ) 
		{
			var date = new Date( value["date"] );

			if ( intakeDate.getTime() === date.getTime() )
			{
				//decrease amount 
				value["intake"] -= caffeineValue;

				//return false breaks the loop
				return false;
			}
		});

		//Set New Values
		currentUser.set("drinkHistory", drinkHistory);
		currentUser.set("statistics", statistics);
		
		//Push new user data into Parse.com DB
		currentUser.save().then( function ( ) { location.reload();});

	}
}
