let form = document.getElementById("form");
let submit = document.getElementById("submit")
let pizzaCount = 0;

if (sessionStorage.getItem("pizzas") != null) {
    let pizzas = JSON.parse(sessionStorage.getItem("pizzas")).pizzas;
    pizzaCount = pizzas.length;
}
form.addEventListener("submit", onSubmit);

showMenu();

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
    if (event.target["pizza"].value != "") {
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
        addtoMenu(name, price, heat, selectedToppings, selectedPhoto, pizzaCount-1);
    };
}

function showMenu () {
    if (pizzaCount > 0) {
        if (document.getElementById("pizzaEmpty")) {
            document.getElementById("pizzaEmpty").remove();
        }
    }
    else {
        showEmptyMenu();
        return;
    }

    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage).pizzas;
    for (let i = 0; i < pizzas.length; i++) {
        addtoMenu(pizzas[i].name, pizzas[i].price, pizzas[i].heat, pizzas[i].toppings, pizzas[i].photo, i);
    }
}

function addPizzaToSessionStorage (name, price, heat, selectedToppings, selectedPhoto) {
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
    pizzas.pizzas.push(newPizza);
    sessionStorage.setItem("pizzas", JSON.stringify(pizzas));
}

function addtoMenu (name, price, heat, selectedToppings, selectedPhoto, pizzaNum) {
    let table = document.getElementById("menu");
    let row = document.createElement("tr");
    let removeCell = document.createElement("td");
    let infoCell = document.createElement("td");
    let photoCell = document.createElement("td");

    let imgElement = document.createElement("img");
    let titleElement = document.createElement("div");
    imgElement.src = selectedPhoto;

    row.id = `pizza${pizzaNum}`;
    removeCell.className = "removeCol";
    infoCell.className = "infoCol";
    photoCell.className = "photoCol";
    titleElement.className = "pizzaTitle";

    removeCell.innerHTML = `
        <button id="btn${pizzaNum}" class="removeBtn" type="button" onclick="deleteRow(id)">Remove pizza</button>
    `;

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
    `;
    for (let i = 0; i < selectedToppings.length; i++) {
        infoCell.innerHTML += selectedToppings[i];
        if (i + 1 != selectedToppings.length) infoCell.innerHTML += ", ";
    }
    infoCell.innerHTML += `</span>`;
    photoCell.appendChild(imgElement);

    row.appendChild(removeCell);
    row.appendChild(infoCell);
    row.appendChild(photoCell);
    table.appendChild(row);
    sortTableIds();
    sortMenu(document.getElementById("sortSel"));
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

function deleteRow (id) {
    let tr = document.querySelector(`#${id}`).parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    deletePizzaFromSessionStorage(id);
}

function deletePizzaFromSessionStorage (id) {
    pizzaNum = id.match(/\d+/)[0];
    let pizzaStorage = JSON.parse(sessionStorage.getItem("pizzas"));
    let pizzas = pizzaStorage.pizzas;
    delete pizzas[pizzaNum];
    pizzas = pizzas.filter(function (el) {
        return el != null;
    });
    pizzaStorage.pizzas = pizzas;
    sessionStorage.setItem("pizzas", JSON.stringify(pizzaStorage));
    pizzaCount--;
    sortTableIds(pizzaNum);
    if (pizzaCount <= 0) showEmptyMenu();
}

function sortTableIds (pizzaNum){
    // Iterate through all pizza rows, and if pizza's id is higher than deleted pizza's id, decrement it by 1
    let rows = document.getElementById("menu").childNodes;
    for (let i = 1; i < rows.length; i++) {
        let id = rows[i].id.match(/\d+/)[0];
        if (id > pizzaNum) {
            rows[i].firstChild.childNodes[1].id = `btn${id - 1}`;
            rows[i].id = `pizza${id - 1}`;
        }
    }
}

function showEmptyMenu () {
    const pizzaEmpty = document.createElement("p");
    pizzaEmpty.id = "pizzaEmpty";
    pizzaEmpty.innerHTML = "It is empty :(";
    document.getElementById("pizzaEmptyDiv").append(pizzaEmpty);
}

function sortMenu (selectObject) {
    let value = selectObject.value;
    let rows, i, x, y, shouldSwitch;
    let table = document.getElementById("menu");
    let switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            if (value == "name") {
                x = rows[i].getElementsByClassName("pizzaName")[0];
                y = rows[i + 1].getElementsByClassName("pizzaName")[0];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (value == "price") {
                let x = parseFloat(rows[i].getElementsByClassName("pizzaPrice")[0].innerHTML.match(/\d+.\d*/)[0]);
                let y = parseFloat(rows[i + 1].getElementsByClassName("pizzaPrice")[0].innerHTML.match(/\d+.\d*/)[0]);
                //console.log(rows[i].getElementsByClassName("pizzaPrice")[0].innerHTML.match(/\d+.\d*/)[0]);
                //console.log(`${x}, ${y}`);
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (value == "heat") {
                let x = rows[i].getElementsByClassName("hotPepper").length;
                let y = rows[i + 1].getElementsByClassName("hotPepper").length;
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
