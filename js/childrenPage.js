//Subcell Colors
var curIndex = 0;
var projects = [];

$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:8000/projects', success: function(result){
            //Once retrieved data, start adding Projects divs into the website
            projects = result;

            //Draw Pie Charts
            //Get the canvas DOM element
            var canvas = $(".technologyPie");
            //Get the DIV element to put legend in
            var legend = $("#technologyPieLegend");
            //Construct the PieChart object
            var piechart = new PieChart({
                //The canvas DOM object
                canvas: canvas[0],
                //The Pie Split Data
                data: getData(canvas[0].id).technology.proportion,
                //The colors to be used in the pie chart
                colors:["#fde23e","#f16e23", "#57d9ff","#937e88"],
                //The DIV DOM object to put legends in
                legend: legend
            });
            piechart.draw();

            try{
                showImg(0);
            } catch(err){
                //Do nothing since if there's no image for project, ignore showImg(0)
            }
            $(".paragraph1").html(getData(canvas[0].id).descriptions.paragraph1);
            $(".paragraph2").html(getData(canvas[0].id).descriptions.paragraph2);

        }
    })

    //Assign background color of subcells randomly.
    var elems = $(".randomColor");
    //Construct a new color array from original colors array so we can remove a color whenever
    //a cell is assigned its color
    for(var i  = 0; i < elems.length; i++){
        const element = elems[i];
        setStyle(element, 1);
    }


});

/**
 * Function to switch displayed image in the gallery
 * @param index :   The Index of the image to show
 */
function showImg(index){
    var imgSlide = $('.imageSlide')[0];
    var thumbnails = $('.thumbnail');
    var images = getData(imgSlide.id).images;
    if(index >= images.length){
        curIndex = index % images.length;
    } else if (index < 0){
        curIndex = images.length - 1;
    }
    imgSlide.style.opacity = 1;
    $.when($(imgSlide).fadeOut(500)).done(function(){
        imgSlide.src = 'img/projects/' + images[curIndex];
        $(imgSlide).fadeIn(500);
        for(var i = 0; i < images.length; i++){
            if(i == curIndex){
                thumbnails[curIndex].style.opacity = 1.0;
            }else {
                thumbnails[i].style.opacity = 0.5;
            }
        }});
}

/**
 * Increment or Decrement the current index of the image in the gallery
 * @param indexChange   :   The change in the index
 */
function changeImage(indexChange){
    showImg(curIndex += indexChange);
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
                this.options.legend.html(legendHTML);
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
    for(i = 0; i < projects.length; i++){
        if(id.includes(projects[i].name.replace(/[^a-z0-9+]+/gi, ''))){
            return projects[i];
        }
    }
    return null;
}