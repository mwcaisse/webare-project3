// Loads the content for the first div from a jade template fragment
$(document).ready(function() {

    /** Loads container two */
    loadContainer2();

    //populate the container with the jade content
    $('#containerthree').load('/containerthree', function() {
        //register a change handler for the gameoption combobox
        $("#playeroption").change(function() {
            updateHoursPlayedChart(this.value);
        });

        //initialize the hours played chart
        updateHoursPlayedChart($("#playeroption").val());
    });

    //populate the container with the jade content
    $('#containerfour').load('/containerfour', function() {
        //register a change handler for the gameoption combobox
        $("#scatterplotcontainer").change(function() {
            updateAverageSpentChart(this.value);
        });

        //initialize the hours played chart
        updateAverageSpentChart($("#scatterplotcontainer").val());
    });

    /** Called when the user clicks the submit button */
    $("#butSubmitForm").click(function() {
        var game = $("#txtGame").val();
        var score = $("#txtScore").val();
        var company = $("#txtCompany").val();

        //the data to post
        var data = {
            game: game,
            score: score,
            company: company
        };

        //the post call to push the data over
        $.ajax({
            async: true,
            url: "/create/review",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json"
        }).done(function(data) {
            if (data) {
                loadContainer2();
            }
            else {
                alert("Failed to post data!");
            }
            //clear all the old fields after post
            $("#txtGame").val("");
            $("#txtScore").val("");
            $("#txtCompany").val("");
        });

    });

});

function loadContainer2() {
    $('#containertwo').load('/containertwo', function() {
        //register a change handler for the gameoption combobox
        $("#gameoption").change(function() {
            updateGameReviewsChart(this.value);
        });

        //initialize the hours played chart
        updateGameReviewsChart($("#gameoption").val());

    });
}

/** Updates / creates the game reviews chart, fetching fresh data
 *
 * @param game The game to create the chart for
 */
function updateGameReviewsChart(game) {
    $.getJSON("/chart/reviews?game=" + game, function(data) {
        makeGameReviewBarGraph(data, game);
    });
}
/** Updates / fetches the data for the hours played chart
 *
 * @param player The player to update the chart for
 */
function updateHoursPlayedChart(player) {
    $.getJSON("/chart/hours?player=" + player, function(data) {
        makeHoursPlayedPieChart(data, player);
    });
};

/** Updates the average spent chart
 *
 */
function updateAverageSpentChart() {
    $.getJSON("/chart/spent", function(data) {
        makeAmountSpentScatterPlot(data);
    });
}

/**
 * populates barcontainer with a pie chart relating to the game review
 * @param data the data from the database
 */
function makeGameReviewBarGraph(data, game) {
    $('#barcontainer').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Reviews for ' + game
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Rating'
            }
        },
        series: [{
            name: 'Company',
            data: data
        }]
    });
}

/**
 * populates piecontainer with pie chart relating to hours played per person per game
 * @param data the data from the database
 * @param player the player being represented
 */
function makeHoursPlayedPieChart(data, player) {
    $('#piecontainer').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: player
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Hours played',
            data: data
        }]
    });
}

/**
 * populates scatterplotcontainer with a scatter plot relating to average spent
 * @param data the data from the database
 */
function makeAmountSpentScatterPlot(data) {
    //console.log("Making Spent ScatterPlot: " + JSON.stringify(data));
    $('#scatterplotcontainer').highcharts({
        title: {
            text: 'Average Amount Spent per Month',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Average Spent (USD)'
            },
            min: 0,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valuePrefix: '$'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: data
    });
}
