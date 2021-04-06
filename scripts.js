
element = document.querySelector("#title");
console.log(element);
let i = 0;

setInterval(setSecond, 1000);

function setSecond () {
    element.innerText = `Seconds ${i++}`
}
