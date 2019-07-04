//4-1
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

function drawChart1(data,width,height,id) {
	var svgWidth = width, svgHeight = height, barPadding = 10;

	//scale
	var scaleX = d3.scaleLinear()
				.domain([d3.min(dataset,function(d){return d.index}),d3.max(dataset,function(d){return d.index})])
				.range([0,svgWidth])

	var scaleY = d3.scaleLinear()
				.domain([d3.min(dataset,function(d){return d.low}),d3.max(dataset,function(d){return d.high})])
				.range([0,svgHeight])

	var chart1 = d3.select(id)
			  	.append("svg")
				.attr("width", svgWidth)  
			    .attr("height", svgHeight)  
			    .attr("class", "candlestick-chart")
				
	chart1.selectAll('line')
		.data(dataset)
		.enter()
		.append("line")
		.attr("x1", function(d){
			return scaleX(d.index)+(svgWidth/d3.max(dataset,function(d){return d.index}) - barPadding)/2
		}) 
		.attr("y1",function(d){
			return svgHeight - scaleY(d.low)
		}) 
		.attr("x2", function(d,i){
			return scaleX(d.index)+(svgWidth/d3.max(dataset,function(d){return d.index}) - barPadding)/2
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
		.attr("width", function(d){
			return (svgWidth/d3.max(dataset,function(d){return d.index})) - barPadding
		})
		.attr("height", function(d){
		return scaleY(Math.max(d.close,d.open)) - scaleY(Math.min(d.close,d.open))
		})
		//fill in the color based on different value
		.attr("fill",function(d){
			if (d.close > d.open){
				return "red"
			}
			return "green"
		});
		// Add brushing
		d3.select(id).select('svg')
		      .call( d3.brushX()                   
		        .extent( [ [0,0], [500,300] ] )//brush area: start at 0,0 and finishes at width,height
		      )
		
}

//call the function
//input dataset,width,height
drawChart1(dataset,500,300,'#area1');

//4-2
function drawChart2(data,width,height,id) {
	var svgWidth = width, svgHeight = height, barPadding = 10;

	//scale
	var scaleX = d3.scaleLinear()
				.domain([d3.min(data,function(d){return d.index}),d3.max(data,function(d){return d.index})])
				.range([0,svgWidth])

	var scaleY = d3.scaleLinear()
				.domain([d3.min(data,function(d){return d.low}),d3.max(data,function(d){return d.high})])
				.range([0,svgHeight])

	var chart1 = d3.select(id)
			  	.append("svg")
				.attr("width", svgWidth)  
			    .attr("height", svgHeight)  
			    .attr("class", "candlestick-chart")
				
	chart1.selectAll('line')
		.data(data)
		.enter()
		.append("line")
		.attr("x1", function(d){
			return scaleX(d.index)+(svgWidth/d3.max(data,function(d){return d.index}) - barPadding)/2
		}) 
		.attr("y1",function(d){
			return svgHeight - scaleY(d.low)
		}) 
		.attr("x2", function(d,i){
			return scaleX(d.index)+(svgWidth/d3.max(data,function(d){return d.index}) - barPadding)/2
		})
		.attr("y2", function(d){
			return svgHeight - scaleY(d.high)
		})
		
		.attr("stroke-width",2)
		.attr("stroke","black");


	chart1.selectAll("rect")  
	    .data(data)  
	    .enter()  
	    .append("rect")
	    .attr("x", function(d,i){
	    	return scaleX(d.index)
	    })
		.attr("y", function(d){
			return svgHeight - scaleY(Math.max(d.close,d.open))
		})
		.attr("width", function(d){
			return (svgWidth/d3.max(data,function(d){return d.index})) - barPadding
		})
		.attr("height", function(d){
		return scaleY(Math.max(d.close,d.open)) - scaleY(Math.min(d.close,d.open))
		})
		//fill in the color based on different value
		.attr("fill",function(d){
			if (d.close > d.open){
				return "red"
			}
			return "green"
		});
		// Add brushing
	d3.select(id).select('svg')
	      .call( d3.brushX()                     // Add the brush feature using the d3.brush function
	        .extent( [ [0,0], [500,300] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
	      .on("start brush", selectbar)
	      )

	function selectbar(){
		extent = d3.event.selection
		console.log(extent)

		var scaleData = d3.scaleLinear()
			.domain([0,svgWidth])
			.range([0,d3.max(dataset,function(d){return d.index})])
		
		console.log(Math.round(scaleData(extent[0])),Math.round(scaleData(extent[1])))
		var newdata = dataset.slice(Math.round(scaleData(extent[0])),Math.round(scaleData(extent[1]))+1)
		console.log(newdata)
		d3.select('#area3').select('svg').remove()
		drawChart2(newdata,500,300,'#area3');
		

	}

}

//call the function
//input dataset,width,height
drawChart2(dataset,500,300,'#area2');