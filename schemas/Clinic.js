const { Schema, model } = require('mongoose');

const ClinicPaymentSchema = require('./ClinicPayment');
const ClinicSectionSchema = require('./ClinicSection');
const AccesibilityConfigSchema = require('./AccesibilityConfig');

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const ClinicSchema = Schema({
    name: {
        type: String,
        maxLength: 70,
        required: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        maxLength: 50,
        required: [ true, 'Email is required' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    telephone: {
        type: String,
        minLength: 9,
        required: [ true, 'Password is required' ]
    },
    direction: {
        type: String,
        required: [ true, 'Direction is required' ]
    },
    startAttentionTime: {
        type: Date
    },
    endAttentionTime: {
        type: Date
    },
    attentionDays: {
        type: [String],
        enum: days,
        required: [ true, 'Attention days are required' ]
    },
    verified: {
        type: Boolean,
        default: false
    },
    statePayment: {
        type: Boolean,
        default: false
    },
    payments: [ 
        ClinicPaymentSchema
    ],
    logoImg: {
        type: String
    },
    slogan: {
        type: String,
        minLength: 25,
        maxLength: 125
    },
    subSlogan: {
        type: String,
        minLength: 25,
        maxLength: 200
    },
    sections: [
        ClinicSectionSchema
    ],
    medics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Medic'
        }     
    ],
    clinicalAppointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ClinicalAppointment'
        }
    ],
    accesibilityConfig: AccesibilityConfigSchema,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Clinic', ClinicSchema);