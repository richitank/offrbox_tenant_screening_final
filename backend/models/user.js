const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    
    noOfUnits: {type: Number, required: true}, 
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true},
    applicantPhoneNo: {type: Number, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);