// Setup express server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const router = require('./routes/router.js');

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});