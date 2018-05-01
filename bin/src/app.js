const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// MongoDB connection
mongoose.connect('mongodb://admin:admin@ds046357.mlab.com:46357/node_api');

// Load models
const product = require('./models/product');
const customer = require('./models/customer');
const order = require('./models/order');

// Load routes
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;
