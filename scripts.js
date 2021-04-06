let form = document.getElementById("form");
let submit = document.getElementById("submit")

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("nameSubm");
    let price = document.getElementById("priceSubm");
    let heat = document.getElementById("heatSubm");
    let toppings = document.querySelectorAll("input[type='checkbox']");
    let photos = document.querySelectorAll("input[type='radio']");

    validateData(name, price, heat, toppings, photos);
}

function validateData (name, price, heat, toppings, photos) {
    let isValid = true;
    let errorList = document.getElementById("errorList");
    // Remove all error list items
    while (errorList.firstChild) {
        errorList.removeChild(errorList.firstChild);
    }
    if (name.value.length < 1) { 
        let node = document.createElement("li");
        node.textContent = "Name required";
        errorList.appendChild(node);
        isValid = false;
    }
    if (price.value <= 0) {
        let node = document.createElement("li");
        node.textContent = "Value has to be positive";
        errorList.appendChild(node);
        isValid = false;
    }
    let checked = 0;
    toppings.forEach(function(topping) {
        if (topping.checked) {
            checked++;
        }
    });
    if (checked < 2) {
        let node = document.createElement("li");
        node.textContent = "Two or more toppings have to be added";
        errorList.appendChild(node);
        isValid = false;
    }
    if (isValid) {

    }
}
