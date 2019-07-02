//javascript

var svgWidth = 500, svgHeight = 300, barPadding = 75;

//2-1
var data1 = [{'o':40, 'c':150},
			{'o':100, 'c':200},
			{'o':130, 'c':230},	
			{'o':50, 'c':170}]
var chart1 = d3.select('#area1')
	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "line-chart");

chart1.selectAll('line')
	.data(data1)
	.enter()
	.append("line")
	.attr("x1", function(d,i){
		return (i+1)*100 - 30;
	})
	.attr("y1",function(d){
		return d.o;
	})
	.attr("x2", function(d,i){
		return (i+1)*100 - 30;
	})
	.attr("y2", function(d){
		return d.c;
	})
	
	.attr("stroke-width",2)
	.attr("stroke","black");

//2-2
var data2 = [{'v':80, 'p':40, 'o':20, 'c':150},
			{'v':140, 'p':30, 'o':100, 'c':200},
			{'v':130,'p':170, 'o':130, 'c':230},
			{'v':60,'p':65, 'o':30, 'c':170}]
var barWidth = (svgWidth / data2.length);
var barHeight = (svgHeight / data2.length);

var chart2 = d3.select('#area2')
  	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "bar-chart");

chart2.selectAll("rect")  
    .data(data2)  
    .enter()  
    .append("rect")  
    .attr("y", function(d,i) {  
        return d.p 
    })  
    .attr("height", function(d) {  
        return d.v;  
    })  
    .attr("width", barWidth - barPadding)  
    .attr("transform", function (d, i) {  
         var translate = [barWidth * i, 0];  
         return "translate("+ translate +")";  
    });

chart2.selectAll('line')
	.data(data2)
	.enter()
	.append("line")
	.attr("x1", function(d,i){
		return (svgWidth/4)*(i+1)-100;
	})
	.attr("y1",function(d){
		return d.o;
	})
	.attr("x2", function(d,i){
		return (svgWidth/4)*(i+1)-100;
	})
	.attr("y2", function(d){
		return d.c;
	})
	
	.attr("stroke-width",2)
	.attr("stroke","black");

//2-3
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

var chart3 = d3.select('#area3')
  	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "bar-chart");

chart3.selectAll('line')
	.data(dataset)
	.enter()
	.append("line")
	.attr("x1", function(d,i){
		return (i+1)*svgWidth/20+8
	})
	.attr("y1",function(d){
		return (72-d.low)*60
	})
	.attr("x2", function(d,i){
		return (i+1)*svgWidth/20+8
	})
	.attr("y2", function(d){
		return (72-d.high)*60
	})
	
	.attr("stroke-width",2)
	.attr("stroke","black");

chart3.selectAll("rect")  
    .data(dataset)  
    .enter()  
    .append("rect")
    .attr("x", function(d,i){
    	return (i+1)*svgWidth/20
    })
	.attr("y", function(d){
		return (72-Math.max(d.close,d.open))*60
	})
	.attr("width", 16)
	.attr("height", function(d){
		return (Math.abs(d.close - d.open))*60
	})
	.attr("fill",function(d){
		if ((d.close-d.open) > 0){
			return "red"
		}
		return "green"
	});  

