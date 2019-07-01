//javascript

var svgWidth = 500, svgHeight = 300, barPadding = 60;

//1-1
var data1 = [430,460,480,400];
var barWidth = (svgWidth / data1.length);
var barHeight = (svgHeight / data1.length);

var chart1 = d3.select('#area1')
	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "bar-chart");

chart1.selectAll('rect')
	.data(data1)
	.enter()
	.append('rect')
	.attr("x",0)
	.attr("y",function(d,i) {
		return i * barHeight;
	})
	.attr("width",function(d){
		return d;
	})
	.attr("height",barHeight - 35)

//1-2
var data2 = [275,190,240,100]
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
    .attr("y", function(d) {  
        return svgHeight - d
    })  
    .attr("height", function(d) {  
        return d;  
    })  
    .attr("width", barWidth - barPadding)  
    .attr("transform", function (d, i) {  
         var translate = [barWidth * i, 0];  
         return "translate("+ translate +")";  
    });

//1-3
var data3 = [{'v':180,'p':230},
			{'v':290,'p':260},
			{'v':80,'p':300},
			{'v':60,'p':50},
			{'v':170,'p':220}]
var barWidth = (svgWidth / data3.length);
var barHeight = (svgHeight / data3.length);

var chart3 = d3.select('#area3')
  	.append("svg")
	.attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "bar-chart");

chart3.selectAll("rect")  
    .data(data3)  
    .enter()  
    .append("rect")  
    .attr("y", function(d,i) {  
        return d.p - d.v
    })  
    .attr("height", function(d) {  
        return d.v;  
    })  
    .attr("width", barWidth - barPadding)  
    .attr("transform", function (d, i) {  
         var translate = [barWidth * i, 0];  
         return "translate("+ translate +")";  
    });