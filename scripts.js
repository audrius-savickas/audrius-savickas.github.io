let form = document.getElementById("form");
let submit = document.getElementById("submit")
let pizzaCount = 0;

if (sessionStorage.getItem("pizzas") != null) {
    let pizzas = JSON.parse(sessionStorage.getItem("pizzas")).pizzas;
    pizzaCount = pizzas.length;
}
form.addEventListener("submit", onSubmit);


// If page is refreshed but pizzas were created, remove the "No pizzas" message and display menu
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
    console.log(event.target["pizza"].value);
    if (event.target["pizza"].value != "") {
        console.log("EMPT");
        selectedPhoto = `pizza${event.target["pizza"].value}.png`;
    }
    else {
        selectedPhoto = "";
    }

    // If new session, set pizzaCount to 0

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
        addtoMenu(name, price, heat, selectedToppings, selectedPhoto, pizzaCount-1);
    }
}

function showMenu () {
    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage).pizzas;
    for (let i = 0; i < pizzas.length; i++) {
        console.log(pizzas[i].photo);
        addtoMenu(pizzas[i].name, pizzas[i].price, pizzas[i].heat, pizzas[i].toppings, pizzas[i].photo, i);
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

function addtoMenu (name, price, heat, selectedToppings, selectedPhoto, pizzaNum) {
    let table = document.getElementById("menu");
    let row = document.createElement("tr");
    let infoCell = document.createElement("td");
    let photoCell = document.createElement("td");

    let imgElement = document.createElement("img");
    let titleElement = document.createElement("div");
    imgElement.src = selectedPhoto;

    row.id = `pizza${pizzaNum}`;
    infoCell.className = "infoCol";
    photoCell.className = "photoCol";
    titleElement.className = "pizzaTitle";

    titleElement.innerHTML += `<h2 class="pizzaName">${name}</h2>`;
    if (heat >= 1) {
        for (let i = 0; i < heat; i++) {
            titleElement.innerHTML += `<img src="hot_pepper.png" class="hotPepper">`;
        }
    }
    infoCell.appendChild(titleElement);
    infoCell.innerHTML += `</div><h3 class="pizzaPrice">Price: ${price}$</h2>`;
    infoCell.innerHTML += `
        <h3 class="pizzaToppings">Toppings:</h3>
        <span class="pizzaHeat">
    `;
    for (let i = 0; i < selectedToppings.length; i++) {
        infoCell.innerHTML += selectedToppings[i];
        if (i + 1 != selectedToppings.length) infoCell.innerHTML += ", ";
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
