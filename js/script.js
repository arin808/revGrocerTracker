// Document constants

//Containers
const getAllContainer = document.querySelector('#get-all-container');
const addContainer = document.querySelector('#add-container');
const updateContainer = document.querySelector('#update-container');
const deleteContainer = document.querySelector('#delete-container');


// Input text boxes
const addName = document.querySelector('#add-name');
const addQty = document.querySelector('#add-qty');
const addPrice = document.querySelector('#add-price');
const updateId = document.querySelector('#update-item');
const deleteId = document.querySelector('#delete-item');

// Output text boxes
const itemList = document.querySelector('#item-list');
const addResponse = document.querySelector('#add-response');
const updateResponse = document.querySelector('#update-response');
const deleteResponse = document.querySelector('#delete-response');

// Buttons and event listeners
const getAllButton = document.querySelector('#get-all-button');
const addButton = document.querySelector('#add-button');
const updateButton = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
getAllButton.addEventListener('click', getAllItems);
addButton.addEventListener('click', addItem);
updateButton.addEventListener('click', updateItem);
deleteButton.addEventListener('click', deleteItem);

// Base url for api requests
const baseUrl = 'http://localhost:3000/items';

//API call functions===================================
// Function to get all items
async function getAllItems(){
    try{
        let response = await fetch(baseUrl, {method: 'GET'});
        let data = await response.json();
        renderAllItems(data);
    }catch(err){
        console.log(err);
    }
}

// Function to add an item
async function addItem(){
    let url = `${baseUrl}/add`;
    try{
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addName.value,
                qty: addQty.value,
                price: addPrice.value
            })
        });
        let data = await response.json();
        addResponse.innerHTML = 'Item added';
    } catch(err){
        console.log(err);
    }
}

// Function to update an item
async function updateItem(){
    let url = `${baseUrl}/purchase/${updateId.value}`;
    try{
        let response = await fetch(url, {method: 'PUT'});
        let data = await response.json();
        updateResponse.innerHTML = 'Item updated';
    }catch(err){
        console.log(err);
    }
}

// Function to delete an item
async function deleteItem(){
    let url = `${baseUrl}/${deleteId.value}`;
    try{
        let response = await fetch(url, {method: 'DELETE'});
        let data = await response.json();
        deleteResponse.innerHTML = 'Item deleted';
    }catch(err){
        console.log(err);
    }
}

// Function to render all items
function renderAllItems(data){
    for(i = 0; i < data.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `Item ID: ${data[i].grocery_item_id} | Product: ${data[i].name} | Quantity: ${data[i].qty} | $${data[i].price} | Purchased: ${data[i].purchased}`;
        itemList.appendChild(li);
    }
}

// Function to render add response

// Function to render update response
 
// Function to render delete response