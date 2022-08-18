const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email:{
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password:{
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
}));

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;