/** Document / Page loaded function
 *
 */
$(document).ready(function() {
    $('#containertwo').load('/containertwo', makeBarGraph);
});

function makeBarGraph() {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Game Reviews'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45
            }
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
            data: [1, 0, 4]
        }]
    });
}

