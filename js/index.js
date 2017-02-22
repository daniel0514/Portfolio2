var colors = ['#ffffff', '#ccffff', '#66ffff', '#00ffff', '#ccffcc', '#99ffcc', '#66ffcc', '#00ffcc', '#99ff99', '#66ff99', '#00ff99', '#00cc99'];
var colorsHover = ['#e6e6e6', '#99ffff', '#33ffff', '#00cccc', '#99ff99', '#66ffb3', '#33ffbb', '#00cca3', '#66ff66', '#33ff77', '#00cc7a', '#009973'];

$(document).ready(function(){
    for(i  = 0; i < 12; i++){
        var element = document.getElementById(i);
        $(element).css('background-color', colors[i]);
    }
});


for(i  = 0; i < 12; i++){
    const element = document.getElementById(i);
    const j = i;
    $(element).hover(function(){
            $(element).css('background-color', colorsHover[j]);
            console.log("on " + j);
        },
        function(){
            $(element).css('background-color', colors[j]);
            console.log("off " + j);
        });
}