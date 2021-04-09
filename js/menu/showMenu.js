import {addRowToMenu} from "./addRemoveRowMenu.js";

// Function which displays pizza menu: either empty, or with pizzas
export function showMenu (pizzaCount) {
    if (pizzaCount == 0) {
        showEmptyMenu();
        return;
    }
    let pizzaStorage = sessionStorage.getItem("pizzas");
    let pizzas = JSON.parse(pizzaStorage).pizzas;
    for (let i = 0; i < pizzas.length; i++) {
        addRowToMenu(pizzas[i].name, pizzas[i].price, pizzas[i].heat, pizzas[i].toppings, pizzas[i].photo, i);
    }
}

// Function which displays empty pizza menu text
export function showEmptyMenu () {
    if (document.getElementById("pizzaEmpty")) return;
    const pizzaEmpty = document.createElement("p");
    pizzaEmpty.id = "pizzaEmpty";
    pizzaEmpty.innerHTML = "It is empty :(";
    document.getElementById("pizzaEmptyDiv").append(pizzaEmpty);
}
