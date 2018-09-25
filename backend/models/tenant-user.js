const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const tenantUserSchema = mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    applicantPhoneNo: { type: Number, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

tenantUserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('TenantUser', tenantUserSchema);