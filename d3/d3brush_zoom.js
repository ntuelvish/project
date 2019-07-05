//javascript
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

function drawChart(data,width,height,id) {
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

	var barWidth = (svgWidth/d3.max(data,function(d){return d.index}) - barPadding)

	chart1.selectAll('line')
		.data(data)
		.enter()
		.append("line")
		.attr("x1", function(d){
			return scaleX(d.index)+barWidth/2
		}) 
		.attr("y1",function(d){
			return svgHeight - scaleY(d.low)
		}) 
		.attr("x2", function(d,i){
			return scaleX(d.index)+barWidth/2
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
		.attr("width", barWidth)
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
	
	// Add brush
	var brush = d3.brushX()
	        .extent( [ [0,0], [500,300] ] )
	      .on("start brush", selectbar)
	      .on("end", brushed)

	d3.select(id).select('svg')
	      .call(brush)

	function selectbar(){
		extent = d3.event.selection
		console.log(extent)

		var scaleData = d3.scaleLinear()
			.domain([0,svgWidth])
			.range([0,d3.max(data,function(d){return d.index})])
		
		console.log(Math.round(scaleData(extent[0])),Math.round(scaleData(extent[1])))
		var newdata = data.slice(Math.round(scaleData(extent[0])),Math.round(scaleData(extent[1]))+1)
		console.log(newdata)
		d3.select('#area2').select('svg').remove()
		drawChart(newdata,500,300,'#area2')		

		start_index = newdata[0].index
		end_index = newdata[newdata.length-1].index
	}

	//adjest the selected area
	function brushed(){
		if (!d3.event.sourceEvent) return; // Only transition after input.
  		if (!d3.event.selection) return; // Ignore empty selections.
		console.log(d3.event.selection)
		console.log(scaleX(start_index),scaleX(end_index))
		d3.select(this)
		    .transition()
		      .call(brush.move, [scaleX(start_index),scaleX(end_index)+barWidth]);
	}

}

//call the function
//input dataset,width,height
drawChart(dataset,500,300,'#area1');

//programmatic control of a d3 brush- specify zoom

function drawChart2(data,width,height,id) {
	var svgWidth = width, svgHeight = height, barPadding = 10, margin = 30;

	//scale
	var scaleX = d3.scaleLinear()
				.domain([d3.min(data,function(d){return d.index}),d3.max(data,function(d){return d.index})])
				.range([0,svgWidth])

	var scaleY = d3.scaleLinear()
				.domain([d3.min(data,function(d){return d.low}),d3.max(data,function(d){return d.high})])
				.range([0,svgHeight])

	//need to be fixed(temperory)
	var scaleY_ax = d3.scaleLinear()
				.domain([d3.min(data,function(d){return d.low}),d3.max(data,function(d){return d.high})])
				.range([svgHeight,0])

	var chart1 = d3.select(id)
			  	.append("svg")
				.attr("width", svgWidth+margin)  
			    .attr("height", svgHeight+margin)  
			    .attr("class", "candlestick-chart")

	var barWidth = (svgWidth/d3.max(data,function(d){return d.index}) - barPadding)

	chart1.selectAll('line')
		.data(data)
		.enter()
		.append("line")
		.attr("x1", function(d){
			return scaleX(d.index)+barWidth/2+margin
		}) 
		.attr("y1",function(d){
			return svgHeight - scaleY(d.low)
		}) 
		.attr("x2", function(d,i){
			return scaleX(d.index)+barWidth/2+margin
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
	    	return scaleX(d.index)+margin
	    })
		.attr("y", function(d){
			return svgHeight - scaleY(Math.max(d.close,d.open))
		})
		.attr("width", barWidth)
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

	//Add axis
	var x_axis = d3.axisBottom()
    	.scale(scaleX)

	var y_axis = d3.axisLeft()
    	.scale(scaleY_ax)

    if(id=="#select"){
	    chart1.append("g")
		    .attr("transform", "translate(" + margin + "," + 0 + ")")
		    .call(y_axis);
	}

	chart1.append("g")
	    .attr("transform", "translate(" + margin + "," + svgHeight + ")")
	    .call(x_axis);

	// Add brush
	var brush = d3.brushX()
	        .extent( [ [0,0], [svgWidth,svgHeight] ] )
	      .on("start brush", selectbar)
	      .on("end", brushed)

	d3.select(id).select('svg')
	      .call(brush)

	function selectbar(){
		extent = d3.event.selection
		console.log(extent)

		var scaleData = d3.scaleLinear()
			.domain([0,svgWidth])
			.range([0,d3.max(data,function(d){return d.index})])
		
		//console.log(Math.round(scaleData(extent[0]-margin)),Math.round(scaleData(extent[1]-margin)))
		var newdata = data.slice(Math.round(scaleData(extent[0]-margin)),Math.round(scaleData(extent[1]-margin))+1)
		console.log(newdata)
		d3.select('#select').select('svg').remove()
		drawChart2(newdata,500,300,'#select')		

		start_index = newdata[0].index
		end_index = newdata[newdata.length-1].index
	}

	//adjest the selected area
	function brushed(){
		if (!d3.event.sourceEvent) return; // Only transition after input.
  		if (!d3.event.selection) return; // Ignore empty selections.
		console.log(d3.event.selection)
		console.log(scaleX(start_index),scaleX(end_index))
		d3.select(this)
		    .transition()
		      .call(brush.move, [scaleX(start_index)+margin,scaleX(end_index)+barWidth+margin]);
	}

}

//call the function
//input dataset,width,height
drawChart2(dataset,500,100,'#mainchart');