//Subcell Colors
var colors = ['#CAEBF2', '#A9A9A9', '#FF3B3F', '#EFEFEF', '#96858F', '#6D7993', '#9099A2', '#D5D5D5', '#D7CEC7', '#FEDCD2', '#BFD8D2', '#DCB239'];
var curIndex = 0;

//DOMContentLoaded listener is to replace jQuery's ready() function
document.addEventListener('DOMContentLoaded', function(){
    //When DOM Content is loaded (ready)
    //Assign background color of subcells randomly.
    var elems = document.getElementsByClassName("randomColor");
    //Construct a new color array from original colors array so we can remove a color whenever
    //a cell is assigned its color
    var colorsLeft = colors.slice();
    for(var i  = 0; i < elems.length; i++){
        const element = elems[i];
        //Get random index
        var choice = getRandomInt(0, colorsLeft.length - 1);
        //Assign the subcell the randomly chosen color
        element.style.background = colorsLeft[choice];
        //Remove the color from the array so no subcells will have duplicated colors
        colorsLeft.splice(choice, 1);
    }

    //Draw Pie Charts
    //Get the canvas DOM element
    var canvas = document.getElementsByClassName("technologyPie");
    //Get the DIV element to put legend in
    var legend = document.getElementById("technologyPieLegend");
    //Construct the PieChart object
    var piechart = new PieChart({
        //The canvas DOM object
        canvas: canvas[0],
        //The Pie Split Data
        data: getData(canvas[0].id).pie,
        //The colors to be used in the pie chart
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88"],
        //The DIV DOM object to put legends in
        legend: legend
    });
    piechart.draw();

    showImg(0);

});

var MathRiceball = {
    pie : {
        "Unity" : 50,
        "C#" : 50
    }
}

var OneClickUpload = {
    pie : {
        "Java" : 75,
        "SQL" : 25
    },
    images : ["./img/projects/oneclickupload/OneClickUpload01.png",
        "./img/projects/oneclickupload/OneClickUpload02.png",
        "./img/projects/oneclickupload/OneClickUpload03.png",
        "./img/projects/oneclickupload/OneClickUpload04.png"]
}

var PortfolioV1 = {
    pie : {
        "CSS" : 25,
        "HTML" : 50,
        "JavaScript" : 25
    },
    images : ["./img/projects/portfolio/portfolio1.png",
        "./img/projects/portfolio/portfolio2.png",
        "./img/projects/portfolio/portfolio3.png"]
}

var ParkNEat = {
    pie : {
        "Java" : 100
    }
}

var ShopOnline = {
    pie : {
        "HTML" : 40,
        "PHP" : 30,
        "SQL": 30
    }
}

/**
 * Simple function to get random integers between the minimum and the maximum values
 * @param min : the minimum value
 * @param max : the maximum value
 * @returns {number} : a random integer between min and max
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function to switch displayed image in the gallery
 * @param index :   The Index of the image to show
 */
function showImg(index){
    var imgSlide = document.getElementsByClassName('imageSlide')[0];
    var thumbnails = document.getElementsByClassName('thumbnail');
    var images = getData(imgSlide.id).images;
    if(index >= images.length){
        curIndex = index % images.length;
    } else if (index < 0){
        curIndex = images.length - 1;
    }
    imgSlide.style.opacity = 1;
    fadeOut(imgSlide, 500);
    imgSlide.src = images[curIndex];
    fadeIn(imgSlide, 500);
    for(var i = 0; i < images.length; i++){
        if(i == curIndex){
            thumbnails[curIndex].style.opacity = 1.0;
        }else {
            thumbnails[i].style.opacity = 0.5;
        }
    }
}

/**
 * Increment or Decrement the current index of the image in the gallery
 * @param indexChange   :   The change in the index
 */
function changeImage(indexChange){
    showImg(curIndex += indexChange);
}

/**
 * Function to simulate jQuery's fadeOut function
 * @param element   :   The element to fadeout
 * @param time      :   The total time for the element to fadeout in 10 steps
 */
function fadeOut(element, time){
    if((element.style.opacity = parseFloat(element.style.opacity) - 0.1) > 0){
        setTimeout(fadeOut(element, time), time/10);
    } else {
        element.style.display = "none";
    }
}

/**
 * FUnction to simulate jQuery's fadeIn function
 * @param element   :   The element to fadeIn
 * @param time      :   The total time for the element to fadeIn in 10 steps
 */
function fadeIn(element, time){
    element.style.display = "block";
    if((element.style.opacity = parseFloat(element.style.opacity) + .1) < 1){
        setTimeout(function(){fadeIn(element, time);}, time/10);
    }
}

/**
 * The function to draw one portion of the pie chart
 * @param ctx       :   Context of the canvas
 * @param centerX   :   The X coordinate of the center of the pie chart
 * @param centerY   :   The Y coordinate of the center of the pie chart
 * @param radius    :   Radius of the pie chart
 * @param startAngle:   The starting angle of the pie slice
 * @param endAngle  :   The ending angle of the pie slice
 * @param color     :   The color of the slice
 */
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

/**
 * The constructor of the pie chart
 * options parameters contains the following:
 *      canvas  :   The Canvas DOM object to draw PieChart in
 *      data    :   The data of the pie chart, containing the proportion of each pie slice
 *      colors  :   The colors to be used in the pie chart
 *      legend  :   The DIV DOM object to contain the legend
 */
var PieChart = function(options){
    //Saving variables
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    /**
     * The draw function of the class
     * is to draw the whole pie chart and add legends to the DIV DOM object (legend)
     */
    this.draw = function(){
        var totalValue = 0;
        var color_index = 0;
        // Summing up the total values of the pie chart
        for(var categ in this.options.data){
            var val = this.options.data[categ];
            totalValue += val;
        }

        var start_angle = 0;
        // For each pie section
        for(categ in this.options.data){
            val = this.options.data[categ];
            // Measure the angle of the section
            var slice_angle = 2 * Math.PI * val / totalValue;

            // Determine the location of the text for the section
            var pieRadius = Math.min(this.canvas.width/2, this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2 ) * Math.sin(start_angle + slice_angle/2);

            // Draw the slice
            drawPieSlice(this.ctx, this.canvas.width/2, this.canvas.height/2, Math.min(this.canvas.width/2, this.canvas.height/2), start_angle, start_angle+slice_angle, this.colors[color_index%this.colors.length]);

            // Draw the text for the section
            var labelText = Math.round(100 * val / totalValue);
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(labelText + "%", labelX, labelY);

            //Increment the start_angle and color index
            start_angle += slice_angle;
            color_index++;
        }

        // If legend is included in the options
        if(this.options.legend){
            color_index = 0;
            var legendHTML = "";
            // For each section
            for(categ in this.options.data){
                // Add the color and the name of the section to the legend
                legendHTML += '<div><span style="display:inline-block;width:20px;background-color:'+this.colors[color_index++]+';">&nbsp;</span> ' + categ + '</div>';
                this.options.legend.innerHTML = legendHTML;
            }
        }
    }
}

/**
 * Simple function to get the corresponding project data with ID
 * @param id    : The ID of the Canvas DOM object
 * @returns {*} : The Project Data
 */
function getData(id){
    if(id.includes("OneClickUpload")){
        return OneClickUpload;
    } else if(id.includes("PortfolioV1")){
        return PortfolioV1;
    } else if(id.includes("MathRiceball")){
        return MathRiceball;
    } else if(id.includes("ParkNEat")){
        return ParkNEat;
    } else if(id.includes("ShopOnline")){
        return ShopOnline;
    } else {
        return null;
    }
}