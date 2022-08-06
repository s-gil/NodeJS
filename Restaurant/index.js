const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dishes = require('./router/dishes');
const customers = require('./router/customers');

app.use(express.json());
app.use('/api/dishes', dishes);
app.use('/api/customers', customers);

mongoose.connect('mongodb://localhost/restaurant')
    .then(() => {console.log('Connected to mongoDB...')})
    .catch(err => {console.error('Could not connect to mongoDB...')});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log( `Listening on port ${port}...` );
})
