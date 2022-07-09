const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);
const Joi = require('joi');

var userSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).required().error(() => 'Firstname required'),
    emailId : Joi.string().email().required().error(() => 'Email required'),
    lastName : Joi.string().min(3).max(30).required().error(() => 'Latname required'),
    password : Joi.string(),
    phoneNo : Joi.string().required().error(() => 'Phone number required')
});

var user = new Mongoose.Schema(Joigoose.convert(userSchema));
module.exports = Mongoose.model('userModel',user,'user');
