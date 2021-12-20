const { Schema, model } = require('mongoose');

const MedicSchema = Schema({
    name: {
        type: String,
        maxLength: 50,
        required: [ true, 'Name is required' ]
    },
    surname: {
        type: String,
        maxLength: 50,
        required: [ true, 'Surname is required' ]
    },
    email: {
        type: String,
        maxLength: 50,
        required: [ true, 'Email is required' ]
    },
    dni: {
        type: String,
        match: /\d{8}/gm,
        required: [ true, 'Dni is required']
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
    speciality: {
        type: String
    },
    startAttentionTime: {
        type: Date
    },
    endAttentionTime: {
        type: Date
    },
    attentionCost: {
        type: Number,
        min: 0
    },
    img: {
        type: String
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

module.exports = model('Medic', MedicSchema);