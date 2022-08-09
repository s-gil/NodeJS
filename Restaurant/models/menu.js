const Joi = require('joi');
const mongoose = require('mongoose');

const Menu = mongoose.model('Menu', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
}));

function validateMenu(menu){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()       
    })

    return schema.validate(menu);
}

module.exports.Menu = Menu;
module.exports.validate = validateMenu;