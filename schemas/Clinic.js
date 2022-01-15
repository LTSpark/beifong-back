const { Schema, model } = require('mongoose');

const ClinicPaymentSchema = require('./ClinicPayment');
const ClinicSectionSchema = require('./ClinicSection');
const AccesibilityConfigSchema = require('./AccesibilityConfig');

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        required: [ true, 'Telephone is required' ]
    },
    direction: {
        type: String,
        required: [ true, 'Direction is required' ]
    },
    startAttentionTime: {
        type: String
    },
    endAttentionTime: {
        type: String
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
    subscriptionPaymentExpires: {
        type: Date
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
    accesibilityConfig: {
        type: AccesibilityConfigSchema,
        default: () => ({})
    }
}, {
    timestamps: true,
    versionKey: false
});

ClinicSchema.methods.toJSON = function() {
    const { _id, ...clinic } = this.toObject();
    clinic.clinicId = _id;
    delete clinic.accesibilityConfig._id;
    return clinic;
}

module.exports = model('Clinic', ClinicSchema);
