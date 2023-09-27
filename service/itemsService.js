// Create var for dao access and uuid for posting items
const itemsDAO = require('../repository/itemsDAO');
const uuid = require('uuid');

//Create logger for logging access and errors
const { createLogger, transports, format} = require('winston');
const { get } = require('../routes/router');

// Create the logger
const logger = createLogger({
    level: 'info', 
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'app.log'}), // log to a file
    ]
})

// Function to get all items
function getAllItems(){
    logger.info('Getting all items');
    return new Promise((resolve, reject) => {
        itemsDAO.getAllItems().then((data) => {
            logger.info('Successfully got all items');
            resolve(data);
        }).catch((err) => {
            logger.error(`Error getting all items: ${err}`);
            reject(err);
        });
    });
}

// Function to get a single item
function getItem(name){
    logger.info(`Getting item: ${name}`);
    return new Promise((resolve, reject) => {
        itemsDAO.getItem(name).then(data => {
            logger.info(`Successfully got item: ${name}`);
            resolve(data);
        }).catch(err => {
            logger.error(`Error getting item: ${name}: ${err}`);
            reject(err);
        });
    });
}

// Function to create and post an item
function addItem(item){
    logger.info(`Adding item: ${item.name}`);
    return new Promise((resolve, reject) => {
        const newItem = {
            grocery_item_id: uuid.v4(),
            name: item.name,
            qty: item.qty,
            price: item.price,
            purchased: false
        };
        itemsDAO.addItem(newItem).then(data => {
            logger.info(`Successfully added item: ${item.name}`);
            resolve(data);
        }).catch(err => {
            logger.error(`Error adding item: ${item.name}: ${err}`);
            reject(err);
        });
    });
}

// Function to change purchased status of an item
async function updateItem(body){
    logger.info(`Updating purchase status of item: ${body.name}`);
    let status = !body.purchased;
    return new Promise((resolve, reject) => {
        itemsDAO.updateItem(body.grocery_item_id, status).then(data => {
            logger.info(`Successfully updated purchase status of item: ${body.name}`);
            resolve(data);
        }).catch(err => {
            logger.error(`Error updating purchase status of item: ${body.name}: ${err}`);
            reject(err);
        });
    });
}

// Function to remove an item
function deleteItem(id){
    logger.info(`Deleting item with id: ${id}`);
    return new Promise((resolve, reject) => {
        itemsDAO.deleteItem(id).then(data => {
            logger.info(`Successfully deleted item`);
            resolve(data);
        }).catch(err => {
            logger.error(`Error deleting item: ${err}`);
            reject(err);
        });
    });
}
// Export functions
module.exports = {
    getAllItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
}