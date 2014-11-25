/** Document / Page loaded function
 *
 */
$(document).ready(function() {
    $('#containertwo').load('/containertwo', function() {
        //when the container is loaded, add in the bar graph
        var game = "Terraria";
        $.getJSON("/chart/reviews?game=" + game, function(data) {
            makeGameReviewBarGraph(data);
        });
    });

    var player = "Mitchell";
    $.getJSON("/chart/hours?player=" + player, function(data) {
        makeHoursPlayedPieChart(data, player);
    });

});

function makeGameReviewBarGraph(data) {
    $('#barcontainer').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Game Reviews'
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
