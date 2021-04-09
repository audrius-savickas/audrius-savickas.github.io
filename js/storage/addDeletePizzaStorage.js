import {pizzaCount} from "../main.js";
import {sortTableIds} from "../menu/sortMenu.js";
import {showEmptyMenu} from "../menu/showMenu.js";

// Function which pushes pizza's data to session storage 
export function addPizzaToSessionStorage (name, price, heat, selectedToppings, selectedPhoto) {
    // If session storage is empty, create new empty array
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

// Function which deletes a pizza from session storage by which id the function got
export function deletePizzaFromSessionStorage (id) {
    let pizzaNum = id.match(/\d+/)[0];
    let pizzaStorage = JSON.parse(sessionStorage.getItem("pizzas"));
    let pizzas = pizzaStorage.pizzas;
    delete pizzas[pizzaNum];
    // Remove null elements
    pizzas = pizzas.filter(function (el) {
        return el != null;
    });
    pizzaStorage.pizzas = pizzas;
    sessionStorage.setItem("pizzas", JSON.stringify(pizzaStorage));
    sortTableIds(pizzaNum);
    if (pizzaCount <= 1) showEmptyMenu();
}
