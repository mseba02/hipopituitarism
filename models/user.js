// imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// generate schema
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    diagnostic: {type: String},
    age: {type: Number},
    location: {type: String},
    image: { type: String },
    doctor: {type: Boolean},
    associate: {type: Boolean},
    treatment: {type: String}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);