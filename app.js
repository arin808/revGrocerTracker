/**
 * Author: Arin Aihara
 * Date: 9/13/2023
 * Revature Grocery Shopping Tracker
 */

// User UI and choice
console.log("Hi and welcome to the grocery shopping tracker!")
console.log("Please choose from the following options: (please enter the number)");
console.log("(1) Add an item to the cart");
console.log("(2) Remove an item from the cart");
console.log("(3) View the cart");
console.log("(4) Change an item's status as purchased");
console.log("(5) Exit the program");

// Shopping cart array w/ mock objects
let shoppingCart = [
    {name: "apple", qty: 5, price: 1.99, purchased: false}, 
    {name: "banana", qty: 3, price: 0.99, purchased: true}];

// Import the readline module for handling user input in the console
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin, // Read from standard input (keyboard)
    output: process.stdout // Write to standard output (console)
});

// Read user input 
rl.on('line', (choice) => {
    switch(choice){
        // Add an item
        case "1":
            console.log("You chose to add an item to the list");
            // Create an object to store the item's info
            let item = {};
            // Prompt the user for the item's info and assign values to item's properties
            rl.question("What is the name of the item? \n", (name) => {
                item.name = name;
                rl.question("How many do you need? \n", (qty) => {
                    // Parse qty to ensure number type
                    qty = parseInt(qty);
                    item.qty = qty;
                    rl.question("What is the price of the item? \n", (price) => {
                        // Parse price to ensure number type
                        price = parseFloat(price);
                        item.price = price;
                        // User confirmation of correct info
                        console.log(item);
                        rl.question("Is this correct? (y/n) \n", (answer) => {
                            if(answer === "y" || answer === "Y"){
                                // Set purchase boolean and add item to the cart
                                item.purchased = false;
                                shoppingCart.push(item);
                                console.log("Item added to the cart");
                            }else{
                                console.log("Item not added to the cart");
                            }
                            // Prompt for next action
                            console.log("Whats's next? (1, 2, 3, 4, 5)");
                        });
                    });
                });
            });
            break;

        // Remove an item
        case "2":
            console.log("You chose to remove an item from the cart");
            rl.question("What is the name of the item? \n", (name) => {
                if(shoppingCart.find(item => item.name === name)){
                    // User confirmation for removal
                    console.log(shoppingCart.find(item => item.name === name));
                    rl.question("Is this the item you want to remove? (y/n) \n", (answer) => {
                        if(answer === "y" || answer === "Y"){
                            // Remove item from the cart
                            shoppingCart.pop(item => item.name === name);
                            console.log("Item removed from the cart");
                            // Prompt for next action
                            console.log("Whats's next? (1, 2, 3, 4, 5)");
                        }
                    });
                }else{
                    console.log("Item not found in the list");
                    // Prompt for next action
                    console.log("Whats's next? (1, 2, 3, 4, 5)");
                }
            });
            break;

        // View the cart
        case "3":
            // Print the cart
            console.log("Here's your current shopping cart: \n");
            console.log(shoppingCart);
            // Prompt for next action
            console.log("Whats's next? (1, 2, 3, 4, 5)");
            break;

        // Change an item's status as purchased
        case "4":
            console.log("You chose to change an item's status as purchased");
            // Prompt the user for the item's name for purchase status change
            rl.question("What is the name of the item? \n", (name) => {
                // Check if item exists and is not purchased
                if(shoppingCart.find(item => item.name === name && item.purchased === false)){
                    // User confirmation for purchase status change
                    console.log(shoppingCart.find(item => item.name === name));
                    rl.question("Is this the item you want to change? (y/n) \n", (answer) => {
                        if(answer === "y" || answer === "Y"){
                            // Change purchase status
                            shoppingCart.find(item => item.name === name).purchased = true;
                            console.log("Item status changed");
                            // Prompt for next action
                            console.log("Whats's next? (1, 2, 3, 4, 5)");
                        }
                    });
                }else{
                    // In case item isn't found or is already purchased
                    console.log("Item not found in the cart or is already purchased");
                    // Prompt for next action
                    console.log("Whats's next? (1, 2, 3, 4, 5)");
                }
            });
            break;

        // Exit the program
        case "5":
            console.log("Exiting program");
            rl.close();
            break;

        default: 
            console.log("Invalid choice, please try again.");
            
    }
});


