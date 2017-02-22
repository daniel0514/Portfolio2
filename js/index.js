var colors = ['#ffffff', '#ccffff', '#66ffff', '#00ffff', '#ccffcc', '#99ffcc', '#66ffcc', '#00ffcc', '#99ff99', '#66ff99', '#00ff99', '#00cc99'];
var colorsHover = ['#e6e6e6', '#99ffff', '#33ffff', '#00cccc', '#99ff99', '#66ffb3', '#33ffbb', '#00cca3', '#66ff66', '#33ff77', '#00cc7a', '#009973'];


document.addEventListener('DOMContentLoaded', function(){
    for(var i  = 0; i < colors.length; i++){
        const element = document.getElementById(i);
        element.style.background = colors[i];
        element.style.opacity = 0.75;
        const j = i;
        element.addEventListener('mouseover', function(){
            //element.style.background = colorsHover[j];
            element.style.opacity = 1.0;
        });
        element.addEventListener('mouseout', function(){
            //element.style.background = colors[j];
            element.style.opacity = 0.75;
        });
    }

    var elems = document.getElementsByClassName("technology");
    for(var i = 0; i < elems.length; i++){
        var parent = elems[i]
    }
});