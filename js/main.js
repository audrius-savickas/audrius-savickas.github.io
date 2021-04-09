import {validateData} from "./form/validateData.js";
import {showMenu} from "./menu/showMenu.js";
import {addRowToMenu, deleteRowFromMenu} from "./menu/addRemoveRowMenu.js";
import {sortMenu} from "./menu/sortMenu.js";
import {addPizzaToSessionStorage} from "./storage/addDeletePizzaStorage.js";

let form = document.getElementById("form");
let selSort = document.getElementById("sortSel");
let pizzaCount = 0;

// Get pizza count if session storage is not empty and show menu
if (sessionStorage.getItem("pizzas") != null) {
    console.log("YRA SESSION");
    let pizzas = JSON.parse(sessionStorage.getItem("pizzas")).pizzas;
    pizzaCount = pizzas.length;
}
showMenu(pizzaCount);

// Create event listener for "add pizza" button and for "sort" button
form.addEventListener("submit", onSubmit);
selSort.addEventListener("change", function() {
    sortMenu(this);
});
window.deleteRowFromMenu = deleteRowFromMenu; // make the deleteRowFromMenu function global scoped

// Uncheck pizza photo button if clicked on checked photo
let photos = document.getElementsByName("pizza");
let setCheck;
for (let i = 0; i < photos.length; i++) {
    photos[i].onclick = function(){
        if (setCheck != this){
             setCheck = this;
        }
        else {
            this.checked = false;
            setCheck = null;
        }
    }
}


// Function when "add pizza" button is pressed
function onSubmit(event) {
    event.preventDefault(); // Prevent the page from refreshing
    // Get selected pizza options
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
    else selectedPhoto = "";

    // If data is valid, reset the form and add the pizza to menu and session storage
    if (validateData(name, price, selectedToppings)) {
        if (sessionStorage.getItem("pizzas")) {
            pizzaCount = JSON.parse(sessionStorage.getItem("pizzas")).pizzas.length;
        }
        // If a pizza is added and "No pizzas" message is displayed, remove it
        if (pizzaCount == 0) {
            document.getElementById("pizzaEmpty").remove();
        }
        form.reset();
        addPizzaToSessionStorage(name, price, heat, selectedToppings, selectedPhoto);
        addRowToMenu(name, price, heat, selectedToppings, selectedPhoto, pizzaCount);
    };
}
