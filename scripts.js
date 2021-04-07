let form = document.getElementById("form");
let submit = document.getElementById("submit")
let pizzaCount = parseInt(sessionStorage.getItem("pizzaCount"));;

form.addEventListener("submit", onSubmit);

// If page is refreshed but pizzas are created, remove the "No pizzas" message
if (pizzaCount > 0) {
    document.getElementById("pizzaEmpty").remove();
}

function onSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("nameSubm");
    let price = document.getElementById("priceSubm");
    let heat = document.getElementById("heatSubm");
    let toppings = document.querySelectorAll("input[type='checkbox']");
    let photos = document.querySelectorAll("input[type='radio']");

    // If new session, set pizzaCount to 0
    pizzaCount = sessionStorage.getItem("pizzaCount");
    if (pizzaCount == null) {
        sessionStorage.setItem("pizzaCount", 0);
    }
    pizzaCount = parseInt(sessionStorage.getItem("pizzaCount"));

    if (validateData(name, price, heat, toppings, photos)) {
        // If a pizza is added and "No pizzas" message is displayed, remove it
        if (pizzaCount == 0) {
            document.getElementById("pizzaEmpty").remove();
        }
        addPizzaToSessionStorage(name, price, heat, toppings, photos);
    };
}

function addPizzaToSessionStorage (name, price, heat, toppings, photos) {
    sessionStorage.setItem("pizzaCount", pizzaCount+1); // Increment session pizzaCount by 1
    // If no pizzas in menu, create empty array in session
    if (sessionStorage.getItem("pizzas") == null) {
        sessionStorage.setItem("pizzas", JSON.stringify({
            pizzas: []
        })); 
    }  
    let newPizza = {
        name: name.value,
        price: price.value,
        heat: heat.value,
        toppings: [

        ],
        photo: 0
    }
    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage);
    pizzas.pizzas[pizzaCount] = newPizza;
    sessionStorage.setItem("pizzas", JSON.stringify(pizzas));
    pizzaCount++;
    console.log(sessionStorage);
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
        errorList.style.opacity = 0;
    }
    else {
        errorList.style.opacity = 100;
    }
    return isValid;
}
