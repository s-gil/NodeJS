const { Order, validate } = require('../models/order');
const {Customer} = require('../models/customer');
const {Dish} = require('../models/dish');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-dateOut'); // Order by DateOut in descending order
    res.send(orders);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found');
    
    res.send(order);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const dish = await Dish.findById(req.body.dishId);
    if (!dish) return res.status(400).send('Invalid dish.');
    
    let order = new Order({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },

        dish: {
            _id: dish._id,
            name: dish.name,
            price: dish.price
        },
    });

    dish.name = 'New name'

    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        order = await order.save({session});
        await dish.save({session});
        // res.send(order, {session});// generating error
        res.send(order);
        await session.commitTransaction();        
    }
    catch(ex){
        await session.abortTransaction();
        console.log(ex);
    }
    session.endSession();
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const dish = await Dish.findById(req.body.dishId);
    if (!dish) return res.status(400).send('Invalid dish.');

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if (!order) return res.status(404).send('The order with the given ID was not found');
    
    res.send(order);
});

router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id); 
    if (!order) return res.status(404).send('The order with the given ID was not found');
    
    res.send(order);
});

module.exports = router;
