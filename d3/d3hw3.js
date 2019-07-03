//javascript

var svgWidth = 500, svgHeight = 300, barPadding = 75;

//3-1
var dataset = [{"index":  0, "open": 68.5, "high": 69, "low":  68.3, "close":  68.8},
    {"index":  1, "open": 68.8, "high": 72, "low": 68.8, "close": 71.8},
    {"index":  2, "open": 70.4, "high": 71.5, "low": 70.4, "close": 70.6},
    {"index":  3, "open": 70, "high": 70, "low": 69.5, "close": 69.8},
    {"index":  4, "open": 70.2, "high": 70.2, "low":  69.4, "close":  69.9},
    {"index":  5, "open": 69.2, "high": 69.6, "low":  68.6, "close":  69},
    {"index":  6, "open": 69, "high":  69, "low":  67.8, "close":  68.3},
    {"index":  7, "open": 68, "high":  69, "low":  68, "close":  69},
    {"index":  8, "open": 69.1, "high": 69.2, "low":  68.8, "close": 68.8},
    {"index":  9, "open": 68.8, "high": 68.8, "low": 67.8, "close": 68},
    {"index": 10, "open": 68.3, "high": 68.3, "low": 67.4, "close": 67.5},
    {"index": 11, "open": 68.8, "high": 68.8, "low": 68, "close": 68},
    {"index": 12, "open": 68, "high": 68, "low":  67.2, "close":  68},
    {"index": 13, "open": 67.2, "high": 67.5, "low": 67.2, "close": 67.2},
    {"index": 14, "open": 67.2, "high": 67.2, "low": 67, "close": 67.1},
    {"index": 15, "open": 67.1, "high": 67.3, "low": 66.5, "close": 67.1},
    {"index": 16, "open": 67.3, "high": 68.2, "low": 67.3, "close": 67.5},
    {"index": 17, "open": 67.5, "high": 67.9, "low": 67.3, "close": 67.5},
    {"index": 18, "open": 67.1, "high": 67.1, "low": 66.6, "close": 67},
    {"index": 19, "open": 66.8, "high": 67.2, "low": 66.5, "close": 67.2}]

var chart1 = d3.select('#area1')
  	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "candlestick-chart");

//scale
var scaleX = d3.scaleLinear()
			.domain([d3.min(dataset,function(d){return d.index}),d3.max(dataset,function(d){return d.index})])
			.range([0,svgWidth])

var scaleY = d3.scaleLinear()
			.domain([d3.min(dataset,function(d){return d.low}),d3.max(dataset,function(d){return d.high})])
			.range([0,svgHeight])

console.log("輸出的值 = " + scaleY(70) + scaleX(15))

			
chart1.selectAll('line')
	.data(dataset)
	.enter()
	.append("line")
	.attr("x1", function(d){
		return scaleX(d.index)+8
	}) 
	.attr("y1",function(d){
		return svgHeight - scaleY(d.low)
	}) 
	.attr("x2", function(d,i){
		return scaleX(d.index)+8
	})
	.attr("y2", function(d){
		return svgHeight - scaleY(d.high)
	})
	
	.attr("stroke-width",2)
	.attr("stroke","black");


chart1.selectAll("rect")  
    .data(dataset)  
    .enter()  
    .append("rect")
    .attr("x", function(d,i){
    	return scaleX(d.index)
    })
	.attr("y", function(d){
		return svgHeight - scaleY(Math.max(d.close,d.open))
	})
	.attr("width", 16)
	.attr("height", function(d){
	return scaleY(Math.max(d.close,d.open)) - scaleY(Math.min(d.close,d.open))
	})
	//fill in the color based on different value
	.attr("fill",function(d){
		if ((d.close-d.open) > 0){
			return "red"
		}
		return "green"
	}); 

//3-2
function drawChart(data) {
	var svgWidth = 500, svgHeight = 300, barPadding = 75;
	var chart1 = d3.select('#chart')
  	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "candlestick-chart");

	//scale
	var scaleX = d3.scaleLinear()
				.domain([d3.min(dataset,function(d){return d.index}),d3.max(dataset,function(d){return d.index})])
				.range([0,svgWidth])

	var scaleY = d3.scaleLinear()
				.domain([d3.min(dataset,function(d){return d.low}),d3.max(dataset,function(d){return d.high})])
				.range([0,svgHeight])

	console.log("輸出的值 = " + scaleY(70) + scaleX(15))

				
	chart1.selectAll('line')
		.data(dataset)
		.enter()
		.append("line")
		.attr("x1", function(d){
			return scaleX(d.index)+8
		}) 
		.attr("y1",function(d){
			return svgHeight - scaleY(d.low)
		}) 
		.attr("x2", function(d,i){
			return scaleX(d.index)+8
		})
		.attr("y2", function(d){
			return svgHeight - scaleY(d.high)
		})
		
		.attr("stroke-width",2)
		.attr("stroke","black");


	chart1.selectAll("rect")  
	    .data(dataset)  
	    .enter()  
	    .append("rect")
	    .attr("x", function(d,i){
	    	return scaleX(d.index)
	    })
		.attr("y", function(d){
			return svgHeight - scaleY(Math.max(d.close,d.open))
		})
		.attr("width", 16)
		.attr("height", function(d){
		return scaleY(Math.max(d.close,d.open)) - scaleY(Math.min(d.close,d.open))
		})
		//fill in the color based on different value
		.attr("fill",function(d){
			if ((d.close-d.open) > 0){
				return "red"
			}
			return "green"
		}); 
}

//call the function
drawChart(dataset);