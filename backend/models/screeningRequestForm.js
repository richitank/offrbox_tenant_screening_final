const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    applicantFirstName: { type: String, required: true },
    applicantLastName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    applicantPhoneNo: { type: Number },
    screeningCost: { type: String, required: true },
    // userId:{type:String}
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('ScreeningRequestForm', postSchema);