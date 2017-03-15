var colors = ['#CAEBF2', '#A9A9A9', '#FF3B3F', '#EFEFEF', '#96858F', '#6D7993', '#9099A2', '#D5D5D5', '#D7CEC7', '#FEDCD2', '#BFD8D2', '#DCB239'];


/**
 * The listener for DOMContentLoaded, similar to jQuery's ready() function
 */
document.addEventListener('DOMContentLoaded', function(){
    //Get the projects info from Node.js server
    httpGetAsync('http://localhost:8000/projects', function(data){
        //Once retrieved data, start adding Projects divs into the website
        var object = JSON.parse(data);
        insertProjectDivs(object);
    });
    //For other elements, set the style and hover effects
    var elements = document.getElementsByClassName("cell");
    for(var i  = 0; i < elements.length; i++){
        const element = elements[i];
        addHoverEffect(element, null);
        setStyle(element);
    }

});

/**
 * Main Method to add Project Divs to the website
 * @param data  :   The projects data from the server
 */
function insertProjectDivs(data){
    //Only add divs when there's data
    if(data.length > 0){
        var afterProjectNode = document.getElementById('afterProjects');
        for(i = 0; i < data.length; i++){
            //Create the project div
            var a = createProjectCell(data[i]);
            //Project divs should be inserted before the last Links Div
            afterProjectNode.parentNode.insertBefore(a, afterProjectNode);
        }
    }
}

/**
 * The function create a single project Div element
 * @param data              : The Data used to create the element
 * @returns {HTMLElement}   : The link DOMElement containing the project div
 */
function createProjectCell(data){
    //Creating the link element to contain the Project Div
    var newProject = document.createElement('a');
    newProject.href = data.page;
    //Create the project Div
    var newProjectDiv = document.createElement('div');

    //Setting the style of the Div
    setStyle(newProjectDiv);

    //Adding Hover Effect of the Div
    addHoverEffect(newProjectDiv, data);
    newProjectDiv.className = "cell project";
    //Adding the Div element to the link
    newProject.appendChild(newProjectDiv);
    //Create the content of the Div element through the function createProjectInnerDiv
    //and add it to the Div
    newProjectDiv.appendChild(createProjectInnerDiv(data));
    return newProject;
}

/**
 * Simple function to set the style of the element
* @param elem  : The element to be changed
 */
function setStyle(elem){
    //Randomly choose a color from the color pool
    var choice = getRandomInt(0, colors.length - 1);
    elem.style.background = colors[choice];
    elem.style.opacity = 0.75;
    //Remove the color from the color pool so no two colors are the same
    colors.splice(choice, 1);
}

/**
 * The function to create the content div for mouseOff
 * The content would include a title and icons of technology used
 * @param data              : The data used to create the element
 * @returns {HTMLElement}   : The Element created
 */
function createProjectInnerDiv(data){
    // The main Div to contain the paragraph and images
    var newProjectInfoDiv = document.createElement('div');
    // The main paragraph for the title of the project
    var paragraph = document.createElement('p');
    paragraph.innerHTML = data.name
    //Adding the paragraph to the Div Element
    newProjectInfoDiv.appendChild(paragraph);
    //Now adding icons of the project
    var icons = data.technology.icons
    for(j = 0; j < icons.length; j++){
        //For each icon, create an img element and add it to the Div element
        var technologyImg = document.createElement('img');
        technologyImg.src = getTechnologyPath(icons[j]);
        newProjectInfoDiv.appendChild(technologyImg);
    }
    return newProjectInfoDiv;
}

/**
 * Similar to createProjectInnerDiv but this function will create the Div content when mouse is hovered over
 * @param data              : The data used to create the element
 * @returns {HTMLElement}   : The element created
 */
function createProjectHoverInnerDiv(data){
    var newProjectInfoDiv = document.createElement('div');
    //The paragraph will now contain the brief description of the project
    var paragraph = document.createElement('p');
    paragraph.innerHTML = data.descriptions.brief;
    newProjectInfoDiv.appendChild(paragraph);
    //The unordered list will contain Strings of technology used
    var ul = document.createElement('ul');
    ul.innerHTML = "Technlogy: ";
    var hovers = data.technology.hover
    for(j = 0; j < hovers.length; j++){
        //For each technology, add it to the list
        const list = document.createElement('li');
        list.innerHTML = hovers[j];
        ul.appendChild(list);
    }
    newProjectInfoDiv.appendChild(ul);
    return newProjectInfoDiv;
}

/**
 * The function to add hover effect to the Div element
 * @param div   : The element to apply the effects on
 * @param data  : The data containing the effect
 */
function addHoverEffect(div, data){
    if(data != null){
        //Only project cells will come with data
        div.addEventListener('mouseover', function(){
            div.style.opacity = 1.0;
            div.innerHTML = "";
            //when mouseover, change the div content to HoverInnerDiv
            div.appendChild(createProjectHoverInnerDiv(data));
        });
        div.addEventListener('mouseout', function(){
            div.style.opacity = 0.75;
            div.innerHTML = "";
            //when mouseout, change the div content back to the original InnerDiv
            div.appendChild(createProjectInnerDiv(data));
        });
    } else {
        //Else if data is null, the divs will be simple cells
        //and we only need to apply mouseover opacity effect
        div.addEventListener('mouseover', function(){
            div.style.opacity = 1.0;
        });
        div.addEventListener('mouseout', function(){
            div.style.opacity = 0.75;
        });
    }
}

/**
 * Simple function to get the image path of the technology
 */
function getTechnologyPath(tech){
    if(tech.includes("Android")){
        return "./img/skills/Android_Icon.png";
    } else if(tech.includes("Java")){
        return "./img/skills/Java_Icon.png";
    } else if(tech.includes("SQL")){
        return "./img/skills/SQL_Icon.png";
    } else if(tech.includes("HTML")){
        return "./img/skills/HTML_Icon.png";
    }  else if(tech.includes("CSS")){
        return "./img/skills/CSS_Icon.png";
    } else if(tech.includes("JavaScript")){
        return "./img/skills/JS_Icon.png";
    } else if(tech.includes("BootStrap")){
        return "./img/skills/Bootstrap_Icon.png";
    } else if(tech.includes("Unity")){
        return "./img/skills/UNITY_Icon.png";
    } else if(tech.includes("CSharp")){
        return "./img/skills/CSharp_Icon.png";
    } else if(tech.includes("PHP")){
        return "./img/skills/PHP_Icon.png";
    } else {
        console.log(tech);
        return null;
    }
}

/**
 * The HHTP Async GET function to get the data from Node.js
 * @param url       : The url of the server
 * @param callback  : The callback function
 */
function httpGetAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url);
    xmlHttp.send();
}

/**
 * Simple function to get random integer between the min and max value
 * @param min           : The minimal number
 * @param max           : The maximum number
 * @returns {number}    : Random Integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
