const express = require('express');
const bodyParser = require('body-parser');
const { returnNeed } = require('./controllers');
const { validateDoors, validateWallArea, validateWallsParameters } = require('./midlewares');

const app = express();
app.use(bodyParser.json());

app.post('/inkNeeded', validateWallsParameters, validateDoors, validateWallArea, returnNeed);

module.exports = app;
