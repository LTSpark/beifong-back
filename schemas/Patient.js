const { Schema, model } = require('mongoose');

const AccesibilityConfigSchema = require('./AccesibilityConfig');

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
        required: [ true, 'Password is required' ]
    },
    verified: {
        type: Boolean,
        default: false
    },
    google: {
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

PatientSchema.methods.toJSON = function() {
    const { _id, ...patient } = this.toObject();
    patient.patientId = _id;
    delete patient.accesibilityConfig._id;
    return patient;
}

module.exports = model('Patient', PatientSchema);