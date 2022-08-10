const Joi = require('joi');
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        required: true
    },
})

const Menu = mongoose.model('Menu', menuSchema);

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
module.exports.menuSchema = menuSchema;