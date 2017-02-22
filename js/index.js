var colors = ['#ffffff', '#ccffff', '#66ffff', '#00ffff', '#ccffcc', '#99ffcc', '#66ffcc', '#00ffcc', '#99ff99', '#66ff99', '#00ff99', '#00cc99'];
var contentMouseOver = [
    '<div><p>Project OneClickUpload</p><img src="./img/skills/Android_Icon.png"/><img src="./img/skills/Java_Icon.png"/></div>',
    '<div><p>Project Portfolio v1</p><img src="./img/skills/HTML_Icon.png"/><img src="./img/skills/CSS_Icon.png"/><img src="./img/skills/JS_Icon.png"/><img src="./img/skills/Bootstrap_Icon.png"/></div>',
    '<div><p>Project Math Riceball</p><img src="./img/skills/UNITY_Icon.png"/><img src="./img/skills/CSharp_Icon.png"/></div>',
    '<div><p>Project ParkNEat</p><img src="./img/skills/Java_Icon.png"/><img src="./img/skills/SQL_Icon.png"/></div>',
    '<div><p>Project Shop Online!</p><img src="./img/skills/PHP_Icon.png"/><img src="./img/skills/SQL_Icon.png"/><img src="./img/skills/HTML_Icon.png"/></div>'
];


document.addEventListener('DOMContentLoaded', function(){
    for(var i  = 0; i < colors.length; i++){
        const element = document.getElementById(i);
        element.style.background = colors[i];
        element.style.opacity = 0.75;
        const j = i;
        element.addEventListener('mouseover', function(){
            element.style.opacity = 1.0;
        });
        element.addEventListener('mouseout', function(){
            element.style.opacity = 0.75;
        });
    }

    var elems = document.getElementsByClassName("project");
    for(var i = 0; i < elems.length; i++){
        hoverContentSwap(elems[i], "", contentMouseOver[i]);
    }
});

function hoverContentSwap(elem, mouseOverContent, mouseOutContent){
    elem.addEventListener("mouseover", function(){
        elem.innerHTML = mouseOverContent;
        console.log("mouseover" + mouseOverContent);
    });
    elem.addEventListener("mouseout", function(){
        elem.innerHTML = mouseOutContent;
        console.log("mouseout" + mouseOutContent);
    });
}