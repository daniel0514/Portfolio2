$(document).ready(function(){
    //Get the projects info from Node.js server
    $.ajax({
        url: 'http://localhost:8000/projects', success: function(result){
            //Once retrieved data, start adding Projects divs into the website
            console.log(result);
            var object = result;
            insertProjectDivs(object);
        }
    });

    //For other elements, set the style and hover effects
    var elements = $(".cell");
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
        for(i = data.length-1; i >= 0; i--){
            //Create the project div
            var a = createProjectCell(data[i]);
            //Project divs should be inserted before the last Links Div
            a.insertAfter($('#beforeProjects'));
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
    var newProject = $("<a></a>");
    newProject.attr('href', data.page);
    //Create the project Div
    var newProjectDiv = $("<div></div>");

    //Setting the style of the Div
    setStyle(newProjectDiv, 0.75);

    //Adding Hover Effect of the Div
    addHoverEffect(newProjectDiv, data);
    newProjectDiv.addClass("cell project");
    //Adding the Div element to the link
    $(newProject).append(newProjectDiv);
    //Create the content of the Div element through the function createProjectInnerDiv
    //and add it to the Div
    $(newProjectDiv).append(createProjectInnerDiv(data));
    return newProject;
}

/**
 * The function to create the content div for mouseOff
 * The content would include a title and icons of technology used
 * @param data              : The data used to create the element
 * @returns {HTMLElement}   : The Element created
 */
function createProjectInnerDiv(data){
    // The main Div to contain the paragraph and images
    var newProjectInfoDiv = $("<div></div>");
    // The main paragraph for the title of the project
    var paragraph = $('<p></p>');
    $(paragraph).html(data.name);
    //Adding the paragraph to the Div Element
    $(newProjectInfoDiv).append(paragraph);
    //Now adding icons of the project
    var icons = data.technology.icons
    for(j = 0; j < icons.length; j++){
        //For each icon, create an img element and add it to the Div element
        var technologyImg = $("<img/>");
        $(technologyImg).attr("src", getTechnologyPath(icons[j]))
        newProjectInfoDiv.append(technologyImg);
    }
    return newProjectInfoDiv;
}

/**
 * Similar to createProjectInnerDiv but this function will create the Div content when mouse is hovered over
 * @param data              : The data used to create the element
 * @returns {HTMLElement}   : The element created
 */
function createProjectHoverInnerDiv(data){
    var newProjectInfoDiv = $("<div></div>");
    //The paragraph will now contain the brief description of the project
    var paragraph = $("<p></p>");;
    paragraph.html(data.descriptions.brief);
    newProjectInfoDiv.append(paragraph);
    //The unordered list will contain Strings of technology used
    var ul = $('<ul></ul>');;
    ul.html("Technlogy: ");
    var hovers = data.technology.hover
    for(j = 0; j < hovers.length; j++){
        //For each technology, add it to the list
        const list = $('<li></li>');;
        list.html(hovers[j]);
        ul.append(list);
    }
    newProjectInfoDiv.append(ul);
    return newProjectInfoDiv;
}

