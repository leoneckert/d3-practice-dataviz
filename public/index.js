// https://vincentarelbundock.github.io/Rdatasets/doc/lme4/sleepstudy.html

var title = "Reaction times in a sleep deprivation study";
var dataSet_url = "https://vincentarelbundock.github.io/Rdatasets/csv/lme4/sleepstudy.csv";
var x_axis_parameter = 'Days';
var y_axis_parameter =  'Reaction';
// var title = "No Idea what This is";
// var dataSet_url = "https://vincentarelbundock.github.io/Rdatasets/csv/texmex/winter.csv";
// var x_axis_parameter = 'O3';
// var y_axis_parameter =  'PM10';



document.getElementById('headline').innerHTML = title;


d3.csv(dataSet_url, function(data){
	// console.log(data);
	var individualDays = _.groupBy(data, x_axis_parameter);
	console.log(individualDays);
	meanTimeByDay = {}

	_.each(individualDays, function(dataOfDay,day){
		// console.log(dataOfDay);
		// console.log(day);
		var timesByDay = _.map(
			_.pluck(dataOfDay, y_axis_parameter), function(string){
				return Number(string);
			});
		// console.log(timesByDay);
		var timeSum = timesByDay.reduce(function(a,b){
			return a + b; 
		});
		// console.log("Day" + day + ":  " + timeSum);
		meanTimeByDay[day] = timeSum/dataOfDay.length;
	});
	console.log(meanTimeByDay);

	var w = window.innerWidth - window.innerWidth/2;
	var h = window.innerHeight - 100;

	var svgContainer = d3.select('#dataviz').append('svg')
											.attr('width', w)
											.attr('height', h);
		
	// "25" below should be the amount of data points
	var numElems = 0
	var maxValue = 0;
	_.countBy(meanTimeByDay, function(a) {
		numElems += 1;
		if(a>maxValue){
			maxValue = a;
		}
	});

	
	scaleX = d3.scale.linear().domain([0,numElems-1]).range([0,w]),
	// "12" below should be the max value
	scaleY = d3.scale.linear().domain([0,maxValue]).range([h-21,0+h/3]),

	poly = [{"x":0.0, "y":0.0}];
	var x_pos = 0;
	_.each(meanTimeByDay, function(a,b){
		console.log(a);
		console.log(b);
		poly.push({"x":x_pos, "y":a});
		x_pos += 1;
	});


	poly.push({"x":numElems-1, "y":0.0});
	console.log(poly)
	
	

	svgContainer.selectAll("polygon")
    .data([poly])
    .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) { 
        	return [scaleX(d.x),scaleY(d.y)].join(","); 
        }).join(" ");
    })
    .attr("stroke","black")
    .attr("stroke-width",2);

    svgContainer.append('text').attr('x', 2).attr('y', h-4).attr("color","black").text("x-axis: \"" + x_axis_parameter + "\", y-axis: \"" + y_axis_parameter + "\"");

	


});