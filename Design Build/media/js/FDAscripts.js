$(document).ready(function () {
    google.setOnLoadCallback();
    document.getElementById("dashboard").style.display = 'block';
})



var FDA = (function () {
    var _term = [];
    var _react = [];
    
    function setStage(stageName, chartType, filter, target) {
        if (stageName === "dashboard") {
            google.setOnLoadCallback(function () {
                createBarChart("term", "termbody");
                createBarChart("react", "reactbody");
                window.location.hash = "";
            });             
        } else if(stageName === "react") {
            google.setOnLoadCallback(function () {
                createBarChart("react", "reactbody");
                window.location.hash = "";
            }); 
        } else if(stageName === "term") {
            google.setOnLoadCallback(function () {
                createBarChart("term", "termbody");
                window.location.hash = "";
            }); 
        }
   }

    function getServiceData(serviceUrl, callback) {
        $.ajax({
            "dataType": "json",
            "async": false,
            "url": serviceUrl ,
            "success": function (response) {
                return callback(response);
            }
        });
    }

    function createBarChart(type, target) {
            if (type === "term") {
                var drugArr = [ "IBUPROFEN", "ASPIRIN", "LIPITOR", "PREDNISONE", "ZOLOFT", "ALBUTEROL", "ALPRAZOLAM", "CYMBALTA", "SYNTHROID", "ZOCOR" ];
            if (_term.length == 0) {
                getServiceData('https://api.fda.gov/drug/event.json?search=patient.patientsex:2+AND+patient.patientonsetage:%5b55+TO+90%5d&count=patient.drug.medicinalproduct.exact', function (response) {
                    _term = response;
                });
            }
            var result = [];
            $.each(_term.results, function (key, val) {
            if(jQuery.inArray( val.term, drugArr) != -1)
            {
                 result.push([val.term, val.count]);
            }
            });

            result.sort();
            var termChartData = new google.visualization.DataTable();
            termChartData.addColumn('string', 'Term');
            termChartData.addColumn('number', 'Count')
            termChartData.addRows(result);
            var options = {
                backgroundColor: { fill: 'transparent' },
                hAxis: {
                    title: 'Count',
                    minValue: 0
                },
                vAxis: {
                    title: 'Drug'
                },
                pieHole: 0.4,
                chartArea: {
                    top: "5%",
                    height: "90%",
                    width: "90%"
                }
            };


           

            var termChart = new google.visualization.PieChart(document.getElementById(target));
            var select = function selectHandler() {
                var selectedItem = termChart.getSelection()[0];
                if (selectedItem) {
                    var value = termChartData.getValue(selectedItem.row, 0);

                }
            }
            google.visualization.events.addListener(termChart, 'select', select);

            termChart.draw(termChartData, options);
        }
            else if (type === "react") {
var reactionArr = [ "VOMITING", "HEADACHE", "DYSPNOEA", "DRUG INEFFECTIVE", "NAUSEA", "PYREXIA", "OFF LABEL USE", "OVERDOSE", "FATIGUE", "DIZZINESS", "DIARRHOEA" ];
            if (_react.length == 0) {
                getServiceData('https://api.fda.gov/drug/event.json?search=patient.patientsex:2+AND+patient.patientonsetage:[55+TO+90]&count=patient.reaction.reactionmeddrapt.exact', function (response) {
                    _react = response;
                });
            }
            var result = [];
            $.each(_react.results, function (key, val) {
            if(jQuery.inArray( val.term, reactionArr) != -1)
            {
                 result.push([val.term, val.count]);
            }
            });

            result.sort();
            var reactChartData = new google.visualization.DataTable();
            reactChartData.addColumn('string', 'Term');
            reactChartData.addColumn('number', 'Count')
            reactChartData.addRows(result);
            var options = {
                backgroundColor: { fill: 'transparent' },
                hAxis: {
                    title: 'Count',
                    minValue: 0
                },
                vAxis: {
                    title: 'Reaction'
                },
                chartArea: {
                    top: "5%",
                    height: "90%",
                    width: "90%"
                }
            };
           
            var reactChart = new google.visualization.PieChart(document.getElementById(target));
            var select = function selectHandler() {
                var selectedItem = reactChart.getSelection()[0];
                if (selectedItem) {
                    var value = reactChartData.getValue(selectedItem.row, 0);

                }
            }
            google.visualization.events.addListener(reactChart, 'select', select);

            reactChart.draw(reactChartData, options);
        }

}
   return {
        setStage: setStage,
        createBarChart: createBarChart,
    };
})();