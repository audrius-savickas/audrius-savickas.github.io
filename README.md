# About
This is a website I made for the Visma's Summer Internship in Web Dev assignment. The goal was to create an application to manage a Pizzeria menu using HTML5, JavaScript and CSS without using any third party libraries or frameworks. 

The website is currently hosted on [GitHub pages](audrius-savickas.github.io)

## Requirements:
* Form to add a new pizza to the menu.
  * Must have following properties:
    * name: string // required, unique, max-length 30
    * price: number // required, positive, decimal points 2
    * heat: number // optional, integer, range 1-3
    * toppings: Array<string> // required, min-length 2
    * photo: string // optional. Selection from 3-10 hard coded images
  * 'Add pizza' button
    * Adds pizza to the list
      * Use sessionStorage to store data
    * Clears form  
* Pizza menu:
  * Display all pizzas that are stored in sessionStorage
    * Show info about each pizza (name, price, heat, list of toppings, photo)
    * Toppings should be displayed as comma separated text
    * Heat should be displayed as chilli peppers next to name
      * Use svg or png image
    * 'Delete' button
      * Show confirmation popup before deleting
      * Removes pizza when confirmed
  * Keep original (oldest to latest) order in sessionStorage  

# Pictures
![ph1](https://i.imgur.com/6HmuhPH.png)
![ph2](https://i.imgur.com/11kbDvn.png)
![ph3](https://i.imgur.com/nQGvNMp.png)
![ph4](https://i.imgur.com/LRvagfE.png)
