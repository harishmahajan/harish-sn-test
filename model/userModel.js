const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);
const Joi = require('joi');

var userSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).required(),
    emailId : Joi.string().email().required(),
    lastName : Joi.string().min(3).max(30).required(),
    password : Joi.string().min(8).max(100),
    phoneNo : Joi.string().required()
});

var user = new Mongoose.Schema(Joigoose.convert(userSchema));
module.exports = Mongoose.model('userModel',user,'user');
