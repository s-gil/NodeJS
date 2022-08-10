const Joi = require('joi');
const mongoose = require('mongoose');
const {menuSchema} = require('./menu');

const Dish = mongoose.model('Dish', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        required: true
    },
    menu:{
        type: menuSchema,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        required: true
    }
}));

async function validateDish(dish){
    // We validate what the client sends us
    const schema = Joi.object({ 
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        menuId: Joi.string() //We want the client just send the id 
            .required(),
        price: Joi.number()
            .required()
    })

    return schema.validate(dish);
}

exports.Dish = Dish;
exports.validate = validateDish;