const { Schema, model } = require('mongoose');

const PatientSchema = Schema({
    name: {
        type: String,
        maxLength: 50,
        required: [ true, 'Name is required' ]
    },
    img: {
        type: String
    },
    email: {
        type: String,
        maxLength: 50,
        required: [ true, 'Email is required' ]
    },
    password: {
        type: String,
        maxLength: 30,
        minLength: 8,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        required: [ true, 'Password is required' ]
    },
    verified: {
        type: Boolean,
        default: false
    },
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

module.exports = model('Patient', PatientSchema);