// Express for router use
const express = require('express');
const router = express.Router();
const itemsService = require('../service/itemsService.js');

// Routes for api calls
router.get('/items', (req, res) => {
    itemsService.getAllItems().then(data => {
        res.status(200).send(data.Items);
    }).catch(err => {
        res.status(500).send({error: err});
    });
});

router.post('/items/add', validItem, (req, res) => {
    itemsService.addItem(req.body).then(data => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});

router.put('/items/purchase/:id', (req, res) => {
    itemsService.updateItem(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});

router.delete('/items/:id', (req, res) => {
    itemsService.deleteItem(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({error: err});
    });
});

// MW function
function validItem(req, res, next){
    const item = req.body;
    if(!item.name || !item.qty || !item.price){
        res.status(400).json({error: 'Missing fields'});
    }else{
        next();
    }
}

module.exports = router;