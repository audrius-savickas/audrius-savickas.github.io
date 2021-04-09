// Function which checks if form data is valid, otherwise, display error box
export function validateData (name, price, selectedToppings) {
    let isValid = true;
    let errorList = document.getElementById("errorList");
    // Remove all existing error list items
    while (errorList.firstChild) {
        errorList.removeChild(errorList.firstChild);
    }
    if (name.length < 1) { 
        let node = document.createElement("li");
        node.textContent = "Name is required";
        errorList.appendChild(node);
        isValid = false;
    }
    if (price <= 0) {
        let node = document.createElement("li");
        node.textContent = "Price has to be positive";
        errorList.appendChild(node);
        isValid = false;
    }
    if (selectedToppings.length < 2) {
        let node = document.createElement("li");
        node.textContent = "Please select two or more toppings.";
        errorList.appendChild(node);
        isValid = false;
    }
    if (isValid) {
        errorList.style.opacity = 0;
    }
    else {
        errorList.style.opacity = 100;
    }
    return isValid;
}
