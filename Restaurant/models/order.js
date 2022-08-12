const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({ // We dont use customer schema because it could have alot of properties
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
        }), 
        required: true  
    },

    dish: {
        type: new mongoose.Schema({ //dishes 
            name: {
                type: String,
                minlength: 3,
                maxlength: 255,
                trim: true,
                required: true
            },
            price:{
                type: Number,
                min: 0,
                required: true
            }
        }),
        required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    price:{
        type: Number,
        min: 0
    }
}));

function validateOrder(order){
    const schema = Joi.object({
        customerId: Joi.string()
            .required(),
        dishId: Joi.string()
            .required()        
    });

    return schema.validate(order);
}

module.exports.Order = Order;
module.exports.validate = validateOrder;