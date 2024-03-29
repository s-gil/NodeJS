const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Dish, validate} = require('../models/dish');
const {Menu} = require('../models/menu');
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

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const menu = await Menu.findById(req.body.menuId);
    if (!menu) return res.status(400).send('Invalid menu.')

    const dish = new Dish({
        name: req.body.name,
        menu: {
            _id: menu._id,
            name: menu.name
        },
        price: req.body.price
    });

    await dish.save();
    res.send(dish);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const menu = await Menu.findById(req.body.menuId);
    if (!menu) return res.status(400).send('Invalid menu.');

    const dish = await Dish.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        menu: {
            _id: menu._id,
            name: menu.name
        },
        price: req.body.price
    }); 
    if (!dish) return res.status(404).send('The dish with the given ID was not found');

    res.send(dish);
    
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const dish = await Dish.findByIdAndDelete(req.params.id); 
    if (!dish) return res.status(404).send('The dish with the given ID was not found');
    
    res.send(dish);
});

module.exports = router;