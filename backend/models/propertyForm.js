const mongoose = require('mongoose');

const propertyFormSchema = mongoose.Schema({

    propertyType: { type: String, required: true },
    propertyAddress: { type: String, required: true },
    propertyAddress2: { type: String },
    propertyCity: { type: String, required: true },
    propertyState: { type: String, required: true },
    propertyZipCode: { type: Number, required: true },
    propertyImage: { type: String },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    creatorFirstName: { type: mongoose.Schema.Types.String,  ref: "Property", required: true}

});


module.exports = mongoose.model('PropertyForm', propertyFormSchema);