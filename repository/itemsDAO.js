// Connect to AWS
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-1' });

// Connect to DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

// Get all items from table
function getAllItems() {
    const params = {
        TableName: 'grocery_items'
    };
    return docClient.scan(params).promise();
}

function getItem(grocery_item_id) {
    const params = {
        TableName: 'grocery_items',
        Key: {
            'grocery_item_id': grocery_item_id
        } 
    };
    return docClient.get(params).promise();
}

function addItem(item) {
    const params = {
        TableName: 'grocery_items',
        Item: item
    };
    return docClient.put(params).promise();
}

function deleteItem(grocery_item_id) {
    const params = {
        TableName: 'grocery_items',
        Key: {
            'grocery_item_id': grocery_item_id
        }
    };
    return docClient.delete(params).promise();
}

function updateItem(grocery_item_id, purchased) {
    const params = {
        TableName: 'grocery_items',
        Key: {
            'grocery_item_id': grocery_item_id
        },
        UpdateExpression: 'set #p = :purchased',
        ExpressionAttributeNames: {
            '#p': 'purchased'
        },
        ExpressionAttributeValues: {
            ':purchased': purchased
        }
    };
    return docClient.update(params).promise();
}

// Export functions
module.exports = {
    getAllItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
};