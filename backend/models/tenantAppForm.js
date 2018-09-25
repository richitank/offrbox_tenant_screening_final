const mongoose = require('mongoose');

const tenantAppFormSchema = mongoose.Schema({

    employer: { type: String, required: true },
    employmentPosition: { type: String, required: true },
    employmentStartDate: { type: String, required: true },
    employmentEndDate: { type: String, required: true },
    contactFirstName: { type: String, required: true },
    contactLastName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: Number, required: true },

    incomeSource: { type: String, required: true },
    monthlyAmount: { type: Number, required: true },
    addIncomeInfo: { type: String },

    residenceCity: { type: String, required: true },
    residenceState: { type: String, required: true },
    residenceZipCode: { type: Number, required: true },
    residenceMoveInDate: { type: String, required: true },
    residenceMoveOutDate: { type: String, required: true },

    refFirstName: { type: String, required: true },
    refLastName: { type: String, required: true },
    refPhone: { type: Number, required: true },
    refEmail: { type: String, required: true },
    refRelation: { type: String, required: true },
    refYearsKnown: { type: Number, required: true },

    creator: {type: mongoose.Schema.Types.ObjectId, ref: "TenantUser", required: true}

});


module.exports = mongoose.model('TenantAppForm', tenantAppFormSchema);