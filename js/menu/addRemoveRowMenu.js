import {sortMenu, sortTableIds} from "./sortMenu.js";
import {deletePizzaFromSessionStorage} from "../storage/addDeletePizzaStorage.js";

// Function which creates a new pizza and pushes it to pizza menu and then session storage
export function addRowToMenu (name, price, heat, selectedToppings, selectedPhoto, pizzaNum) {
    let table = document.getElementById("menu");
    let row = document.createElement("tr");
    let removeCell = document.createElement("td");
    let infoCell = document.createElement("td");
    let photoCell = document.createElement("td");

    let imgElement = document.createElement("img");
    let titleElement = document.createElement("div");
    imgElement.src = `./img/${selectedPhoto}`;
    imgElement.alt = "";

    row.className = "menuRows";
    row.id = `pizza${pizzaNum}`;
    removeCell.className = "removeCol";
    infoCell.className = "infoCol";
    photoCell.className = "photoCol";
    titleElement.className = "pizzaTitle";

    removeCell.innerHTML = `
        <button id="btn${pizzaNum}" class="removeBtn" type="button" onclick="deleteRowFromMenu(id)">Remove pizza</button>
    `;

    titleElement.innerHTML += `<h2 class="pizzaName">${name}</h2>`;
    if (heat >= 1) {
        for (let i = 0; i < heat; i++) {
            titleElement.innerHTML += `<img src="./img/hot_pepper.png" class="hotPepper">`;
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

// Function which deletes the table's row in which the pizza is in
export function deleteRowFromMenu (id) {
    let ok = confirm("Remove this pizza?");
    if (ok) {
        let tr = document.querySelector(`#${id}`).parentNode.parentNode;
        tr.parentNode.removeChild(tr);
        deletePizzaFromSessionStorage(id);
    }
}
