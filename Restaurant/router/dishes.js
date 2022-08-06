const {Dish, validate} = require('../models/dish')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const dishes = await Dish.find().sort('name');
    res.send(dishes);
});

router.get('/:id', async (req, res) => {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).send('The dish with the given ID was not found');
    
    res.send(dish);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    let dish = new Dish(req.body);
    dish = await dish.save();
    res.send(dish);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if (!dish) return res.status(404).send('The dish with the given ID was not found');
    
    res.send(dish);
});

router.delete('/:id', async (req, res) => {
    const dish = await Dish.findByIdAndDelete(req.params.id); 
    if (!dish) return res.status(404).send('The dish with the given ID was not found');
    
    res.send(dish);
});

module.exports = router;
