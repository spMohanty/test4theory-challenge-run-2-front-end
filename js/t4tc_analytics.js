
/**
 * Returns Gender percentage data object as computed using `percentage_male_female`
 * which can be consumed by HighCharts
 */
function getGenderPercentageData(percentage_male_female){
    return [
            ['Male', parseFloat(percentage_male_female.rows[1][1])],
            ['Female', parseFloat(percentage_male_female.rows[0][1])],
            ['Unknown',  100 - (parseFloat(percentage_male_female.rows[1][1]) + parseFloat(percentage_male_female.rows[0][1]))]
        ] 
}

/**
 * adds the stats about Users, Sessions and Bounce Rate using number_of_users_session_bounce_rate
 */
function addUsersSessionBounceRate(number_of_users_session_bounce_rate){
    var users = parseInt(number_of_users_session_bounce_rate.rows[0][0]);
    var sessions = parseInt(number_of_users_session_bounce_rate.rows[0][1]);
    var bounceRate = parseFloat(number_of_users_session_bounce_rate.rows[0][2]).toFixed(0);

    $("#n-volunteers").html(users.toString());
    $("#n-sessions").html(sessions.toString());

    $("#p-bounce-rate").html(bounceRate.toString()+" %");
}

/**
 * Adds the top 10 countries based on total volunteers
 */
function addTop10Countries(top_10_countries_by_users){

        $(top_10_countries_by_users.rows).each(function(index, data){
            var country_code = country_code_map[data[0].trim()];
        
            var tr = $('<tr/>')
            var rank = $('<td/>').html("<strong>#"+(index+1)+"</strong>").css("vertical-align", "middle");
            var img = $('<img/>').attr('src', 'flags/flags/flags-iso/shiny/64/'+country_code+".png")
            var img_td = $('<td/>').append(img);
            var countr_name = $('<td/>').html(data[0]).css("vertical-align", "middle").css("font-weight", "400");
            var volunteers = $('<td/>').html(data[1]+" volunteers").css("vertical-align", "middle").css("color", "#2A6EBA");
            tr.append(rank).append(img_td).append(countr_name).append(volunteers);        

            $("#top_10_countries").append(tr);
        });
}
/**
 * Adds top 10 countries based on female users
 */
function addTop10CountriesFemaleUsers(top_10_countries_by_users){

        $(top_10_countries_by_users.rows).each(function(index, data){
            var country_code = country_code_map[data[0].trim()];
        
            var tr = $('<tr/>')
            var rank = $('<td/>').html("<strong>#"+(index+1)+"</strong>").css("vertical-align", "middle");
            var img = $('<img/>').attr('src', 'flags/flags/flags-iso/shiny/64/'+country_code+".png")
            var img_td = $('<td/>').append(img);
            var countr_name = $('<td/>').html(data[0]).css("vertical-align", "middle").css("font-weight", "400");
            var volunteers = $('<td/>').html(data[1]+" volunteers").css("vertical-align", "middle").css("color", "#2A6EBA");
            tr.append(rank).append(img_td).append(countr_name).append(volunteers);        

            $("#top_10_countries_female_users").append(tr);
        });
}

/**
 * Adds Country Map for all Volunteers
 */
function addVolunteersCountryMap(number_of_users_per_country) {
    var number_of_users_per_country_data = []
    var MIN = 1000000;
    var MAX = -1;
    for(var i=0;i<number_of_users_per_country.rows.length;i++){
        var c = number_of_users_per_country.rows[i]
        var data_point = {}
        data_point["hc-key"] = country_code_map[c[0]].toLowerCase()
        data_point["value"] = parseInt(c[1])
        if(parseInt(c[1]) > MAX) {
            MAX = parseInt(c[1]);
        };
        
        if(parseInt(c[1]) < MIN) {;
            MIN = parseInt(c[1]);
        }
        number_of_users_per_country_data.push(data_point);
    }


    // Initiate the chart
    $('#map').highcharts('Map', {

        title : {
            text : ''
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: MIN,
            max: MAX
        },
        series : [{
            data : number_of_users_per_country_data,
            mapData: Highcharts.maps['custom/world'],
            joinBy: 'hc-key',
            name: 'Total Volunteers',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }],
        credits: {
            enabled: false
        }        
    });
}

/**
 * Adds Gender Distribution Chart
 */
function addGenderDistributionChart(percentage_male_female) {
    $('#user_gender').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true
        },
        colors: ['#2f7ed8', '#EB7AB4', '#7AEBB1', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        title: {
            text: '<i class="fa fa-male fa-3x"></i><i class="fa fa-female fa-3x"></i>',
            align: 'center',
            verticalAlign: 'middle',
            y: 50,
            useHTML: true
        },
        tooltip: {
            headerFormat: '{point.key} Volunteers <br/>',
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            innerSize: '50%',
            data: getGenderPercentageData(percentage_male_female)
        }],
        credits: {
            enabled: false
        }        
    });
}

function renderT4TCAnalytics(){
    addTop10CountriesFemaleUsers(top_10_countries_by_users);
    addTop10Countries(top_10_countries_by_users);
    addUsersSessionBounceRate(number_of_users_session_bounce_rate);
    addVolunteersCountryMap(number_of_users_per_country);
    addGenderDistributionChart(percentage_male_female);
}

$(document).ready(function(){
    renderT4TCAnalytics();
})


