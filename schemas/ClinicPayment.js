const { Schema } = require('mongoose');

const types = ["annual", "semi-annual", "monthly"]

const ClinicPaymentSchema = Schema({
    mount: {
        type: Number,
        min: 0,
        required: [true, "mount is required"]
    },
    paymentDate: {
        type: Date,
        default: Date.now()
    },
    expirationDate: {
        type: Date,
        required: [true, "expirationDate is required"]
    },
    subscriptionType: {
        type: String,
        enum:  types,
        required: [true, "subscriptionType is required"]
    }
});

module.exports = ClinicPaymentSchema;