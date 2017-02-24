var colors = ['#ffffff', '#ccffff', '#66ffff', '#00ffff', '#ccffcc', '#99ffcc', '#66ffcc', '#00ffcc', '#99ff99', '#66ff99', '#00ff99', '#00cc99'];



document.addEventListener('DOMContentLoaded', function(){
    for(var i  = 0; i < colors.length; i++){
        const element = document.getElementById("cell_" + i);
        element.style.background = colors[i];
        element.style.opacity = 0.75;
        element.addEventListener('mouseover', function(){
            element.style.opacity = 1.0;
        });
        element.addEventListener('mouseout', function(){
            element.style.opacity = 0.75;
        });
    }

    var elems = document.getElementsByClassName("project");
    for(var i = 0; i < elems.length; i++){
        hoverContentSwap(elems[i], projects[i].htmlContentHover, projects[i].htmlContent);
    }
});

function hoverContentSwap(elem, mouseOverContent, mouseOutContent){
    elem.addEventListener("mouseover", function(){
        elem.innerHTML = mouseOverContent;
    });
    elem.addEventListener("mouseout", function(){
        elem.innerHTML = mouseOutContent;
    });
}

var oneClickUpload = {
    title: "OneClickUpload",
    htmlContent: '<div><p>Project OneClickUpload</p><img src="./img/skills/Android_Icon.png"/><img src="./img/skills/Java_Icon.png"/><img src="./img/skills/SQL_Icon.png"/></div>',
    htmlContentHover: '<div><p>Android app to upload photo to multiple social media platforms simutaneously</p><ul>Technology: <li>Android</li><li>Java</li><li>SQLite Database</li></ul></div>'
};

var portfoliov1 = {
    title: "Portfolio V1",
    htmlContent: '<div><p>Project Portfolio v1</p><img src="./img/skills/HTML_Icon.png"/><img src="./img/skills/CSS_Icon.png"/><img src="./img/skills/JS_Icon.png"/><img src="./img/skills/Bootstrap_Icon.png"/></div>',
    htmlContentHover:  '<div><p>The very first responsive Bootstrap website to serve as my web portfolio.</p><ul>Technology: <li>HTML5</li><li>CSS</li><li>JavaScript</li><li>Bootstrap</li></ul></div>'
};

var mathRiceball = {
    title: "Math Riceball",
    htmlContent: '<div><p>Project Math Riceball</p><img src="./img/skills/UNITY_Icon.png"/><img src="./img/skills/CSharp_Icon.png"/></div>',
    htmlContentHover: '<div><p>An Unity Game created during 2015 Windows 10 Game Jam by a group of four students </p><ul>Technology: <li>Unity</li><li>C#</li><li>Visual Studio</li></ul></div>'
};

var parkNEat = {
    title: "ParkNEat",
    htmlContent: '<div><p>Project ParkNEat</p><img src="./img/skills/Java_Icon.png"/><img src="./img/skills/SQL_Icon.png"/></div>',
    htmlContentHover: '<div><p>A Web Application to display restaurants along with their ratings/comments on Google Map and nearby parking spots.</p><ul>Technology: <li>Java</li><li>NoSQL database</li><li>Google Web Toolkit</li></ul></div>'
};

var shopOnline = {
    title: "Shop Online!",
    htmlContent: '<div><p>Project Shop Online!</p><img src="./img/skills/PHP_Icon.png"/><img src="./img/skills/SQL_Icon.png"/><img src="./img/skills/HTML_Icon.png"/></div>',
    htmlContentHover: '<div><p>A Website that serves as an online shopping platform and inventory management system.</p><ul>Technology: </ul><li>PHP</li><li>MySQL database</li><li>HTML5</li></div>'

};

var projects = [oneClickUpload, portfoliov1, mathRiceball, parkNEat, shopOnline];