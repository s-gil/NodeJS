const {Menu, validate} = require('../models/menu')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const menus = await Menu.find().sort('name');
    res.send(menus);
});

router.get('/:id', async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).send('The menu with the given ID was not found');
    
    res.send(menu);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    let menu = new Menu(req.body);
    menu = await menu.save();
    res.send(menu);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if (!menu) return res.status(404).send('The menu with the given ID was not found');
    
    res.send(menu);
});

router.delete('/:id', async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id); 
    if (!menu) return res.status(404).send('The menu with the given ID was not found');
    
    res.send(menu);
});

module.exports = router;
