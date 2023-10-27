console.log("test");
// Get the root element
var r = document.querySelector(":root");

function getHeight() {
  let divElems = document.querySelectorAll("[data-scaleid]");

  divElems.forEach((divElem) => {
    let elemHgt = divElem.clientHeight;
    myFunction_set(divElem.dataset.scaleid, elemHgt);
  });
}

// Create a function for setting a variable value
function myFunction_set(id, height) {
  // Set the value of variable --blue to another value (in this case "lightblue"
  r.style.setProperty(`--${id}-height`, height + "px");
}

getHeight();
