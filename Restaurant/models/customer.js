const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 7
    }
}));

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        isGold: Joi.boolean(),
        phone: Joi.string()
            .min(7)
            .required()        
    })

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;