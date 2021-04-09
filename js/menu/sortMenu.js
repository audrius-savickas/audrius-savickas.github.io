// Function which sorts ids of pizza menu rows after deleting a pizza, 
// so that ids would be synced up with session storage
export function sortTableIds (pizzaNum){
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

// Function which sorts menu by what kind of sort is selected
export function sortMenu (selectObject) {
    let value = selectObject.value;
    let rows, i, x, y, shouldSwitch;
    let table = document.getElementById("menu");
    let switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        // Iterate through all table's rows
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
                x = parseFloat(rows[i].getElementsByClassName("pizzaPrice")[0].innerHTML.match(/\d+.\d*/)[0]);
                y = parseFloat(rows[i + 1].getElementsByClassName("pizzaPrice")[0].innerHTML.match(/\d+.\d*/)[0]);
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (value == "heat") {
                x = rows[i].getElementsByClassName("hotPepper").length;
                y = rows[i + 1].getElementsByClassName("hotPepper").length;
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        // If rows need to be swapped, search again 
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
