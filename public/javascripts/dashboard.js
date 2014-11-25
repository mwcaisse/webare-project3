// Loads the content for the first div from a jade template fragment
$(document).ready(function() {
    //populate the container with the jade content
    $('#containertwo').load('/containertwo', function() {
        //register a change handler for the gameoption combobox
        $("#gameoption").change(function() {
            updateGameReviewsChart(this.value);
        });

        //initialize the hours played chart
        updateGameReviewsChart($("#gameoption").val());

    });

    //populate the container with the jade content
    $('#containerthree').load('/containerthree', function() {
        //register a change handler for the gameoption combobox
        $("#playeroption").change(function() {
            updateHoursPlayedChart(this.value);
        });

        //initialize the hours played chart
        updateHoursPlayedChart($("#playeroption").val());
    });

    updateAverageSpentChart();

});

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
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
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