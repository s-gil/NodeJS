const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const menus = require('./router/menus');
const dishes = require('./router/dishes');
const customers = require('./router/customers');
const orders = require('./router/orders');
const users = require('./router/users');
const auth = require('./router/auth');
const app = express();

app.use(express.json());
app.use('/api/menus', menus);
app.use('/api/dishes', dishes);
app.use('/api/customers', customers);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);

if(!config.get('jwtPrivateKey')){
    console.log('jwtPrivateKey is not defined');
    process.exit(1);
}

// mongoose.connect('mongodb://localhost/restaurant')
// mongoose.connect('mongodb+srv://user:password@cluster0.reo2xyq.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://sebastian:4321@cluster0.reo2xyq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {console.log('Connected to mongoDB...')})
    .catch(err => {console.error('Could not connect to mongoDB...')});


    const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log( `Listening on port ${port}...` );
})

