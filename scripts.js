let form = document.getElementById("form");
let submit = document.getElementById("submit")
let pizzaCount = 0;

if (sessionStorage.getItem("pizzas") != null) {
    let pizzas = JSON.parse(sessionStorage.getItem("pizzas")).pizzas;
    pizzaCount = pizzas.length;
}

form.addEventListener("submit", onSubmit);


// If page is refreshed but pizzas are created, remove the "No pizzas" message
if (pizzaCount > 0) {
    document.getElementById("pizzaEmpty").remove();
    showMenu();
}

function onSubmit(event) {
    event.preventDefault();

    const name = event.target.elements.nameSubm.value;
    const price = event.target.elements.priceSubm.value;
    const heat = event.target.elements.heatSubm.value;
    let selectedToppings = [];
    let selectedPhoto;

    // Get selected toppings
    const toppings = ["Cheese", "Mushrooms", "Pickles", "Tomatoes", "Bell pepper", "Beef", "Bacon", "Chicken"];
    toppings.forEach(topping => {
        if (event.target.elements[topping].checked) {
            selectedToppings.push(topping);
        }
    });
    // Get selected photo
    event.target.elements["pizza"];
    console.log(event.target["pizza"].value);
    selectedPhoto = `pizza${event.target["pizza"].value}.png`;

    // If new session, set pizzaCount to 0
    pizzaCount = sessionStorage.getItem("pizzaCount");
    if (pizzaCount == null) {
        sessionStorage.setItem("pizzaCount", 0);
    }
    pizzaCount = parseInt(sessionStorage.getItem("pizzaCount"));

    if (validateData(name, price, selectedToppings)) {
        // If a pizza is added and "No pizzas" message is displayed, remove it
        if (pizzaCount == 0) {
            document.getElementById("pizzaEmpty").remove();
        }
        addPizzaToSessionStorage(name, price, heat, selectedToppings, selectedPhoto);
        pizzaCount++;
    };
    if (pizzaCount > 0) {
        console.log(selectedPhoto);
        addtoMenu(name, price, heat, selectedToppings, selectedPhoto);
    }
}

function showMenu () {
    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage).pizzas;
    for (let i = 0; i < pizzas.length; i++) {
        console.log("ALIO");
        addtoMenu(pizzas[i].name, pizzas[i].price, pizzas[i].heat, pizzas[i].toppings, pizzas[i].photo);
    }
}

function addPizzaToSessionStorage (name, price, heat, selectedToppings, selectedPhoto) {
    sessionStorage.setItem("pizzaCount", pizzaCount+1); // Increment session pizzaCount by 1
    // If no pizzas in menu, create empty array in session
    if (sessionStorage.getItem("pizzas") == null) {
        sessionStorage.setItem("pizzas", JSON.stringify({
            pizzas: []
        })); 
    }  
    let newPizza = {
        name: name,
        price: price,
        heat: heat,
        toppings: [...selectedToppings],
        photo: selectedPhoto
    };
    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage);
    pizzas.pizzas[pizzaCount] = newPizza;
    sessionStorage.setItem("pizzas", JSON.stringify(pizzas));
}

function addtoMenu (name, price, heat, selectedToppings, selectedPhoto) {
    let table = document.getElementById("menu");
    let row = document.createElement("tr");
    let infoCell = document.createElement("td");
    let photoCell = document.createElement("td");

    let imgElement = document.createElement("img");
    imgElement.src = selectedPhoto;

    infoCell.className = "infoCol";
    photoCell.className = "photoCol";

    infoCell.innerHTML = `
        <h2 class="pizzaName">${name}</h2>
        <h3 class="pizzaPrice">Price: ${price}$</h2>
    `;
    if (heat >= 1) {
        infoCell.innerHTML += `<span class="pizzaHeat"> Heat:`;
        for (let i = 0; i < heat; i++) {
            infoCell.innerHTML += `
                <img src="hot_pepper.png" class="hotPepper">
            `;
        }
        infoCell.innerHTML += `</span>`;
    }
    infoCell.innerHTML += `
        <h3 class="pizzaToppings">Toppings:</h3>
        <span class="pizzaHeat">
    `;
    for (let i = 0; i < selectedToppings.length; i++) {
        infoCell.innerHTML += selectedToppings[i] + "  ";
    }
    infoCell.innerHTML += `</span>`;
    photoCell.appendChild(imgElement);

    row.appendChild(infoCell);
    row.appendChild(photoCell);
    table.appendChild(row);
}

function validateData (name, price, selectedToppings) {
    let isValid = true;
    let errorList = document.getElementById("errorList");
    // Remove all error list items
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
        node.textContent = "Value has to be positive";
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
