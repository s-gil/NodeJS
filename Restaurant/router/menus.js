const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Menu, validate} = require('../models/menu');
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

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const menu = new Menu(req.body);
    await menu.save();
    res.send(menu);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if (!menu) return res.status(404).send('The menu with the given ID was not found');
    
    res.send(menu);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id); 
    if (!menu) return res.status(404).send('The menu with the given ID was not found');
    
    res.send(menu);
});

module.exports = router;
