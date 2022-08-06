const Joi = require('joi');
const mongoose = require('mongoose');

const Dish = mongoose.model('Dish', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}));

function validateDish(dish){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        price: Joi.number()
            .required()        
    })

    return schema.validate(dish);
}

module.exports.Dish = Dish;
module.exports.validate = validateDish;