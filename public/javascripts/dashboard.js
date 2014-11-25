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
});

function makeGameReviewBarGraph(data) {
    $('#container').highcharts({
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

