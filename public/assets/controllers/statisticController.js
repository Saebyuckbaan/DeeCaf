Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");
//google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic);

$(document).ready( function ( event ) {

  drawLineGraph( "caffeineChart" );
  drawLineGraph( "sleepChart" );

});




function drawLineGraph ( id )
{
  var historyObj = queryUserHistory();
  var data;
  var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };

  var ctx = $("#"+id).get(0).getContext("2d");

  switch ( id )
  {
    case "caffeineChart":
    {
      data = {
        labels: historyObj["dateArray"],
        datasets: [
            {
                label: "Caffeine Intake",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: historyObj["intakeArray"]
            },
        ]
      };

      options["scaleLabel"] = "<%=value%> mg";
        var myLineChart = new Chart(ctx).Line(data, options);
    }
    break;
    case "sleepChart" : 
    {
      data = {
          labels: historyObj["dateArray"],
          datasets: [
              {
                  label: "Sleeping Time",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: historyObj["sleepArray"]
              }
          ]
        };
        options["scaleLabel"] = "<%=value%> hrs";
        var myBarChart = new Chart(ctx).Bar(data, options);
    }
    break;
  }


  $("#" + id + "_legends").append(myLineChart.generateLegend());
  if(data == "undefined") {
    $('#statHeader').text("No data inputted yet!");
  }
}



function queryUserHistory()
{
  var currentUser = Parse.User.current();
  var historyObj;
  if( currentUser )
  {
    var intakeHistory = currentUser.get("statistics");
    var dateArray = [];
    var intakeArray = [];
    var sleepArray = [];

    var date;
    $.each( intakeHistory, function( index, value ){
      date = new Date(value["date"]);
      dateString = ( date.getMonth() + 1 ) + "/" + date.getDate() ;
      dateArray.push( dateString );
      intakeArray.push( value["intake"] );
      sleepArray.push( value["sleep"] );
    });

    historyObj = {  "dateArray": dateArray,
                    "intakeArray": intakeArray,
                    "sleepArray": sleepArray };
    //debugger;

    console.log("Date Array = " + dateArray);
    console.log("intake Array = " + intakeArray);
    return historyObj;
  }
}



//--------------- Tab Bar -------------//
$('#table a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})