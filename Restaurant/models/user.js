const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function (){
    return jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
}

const User = mongoose.model("User", userSchema);

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