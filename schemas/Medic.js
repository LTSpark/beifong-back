const { Schema, model } = require('mongoose');

const AccesibilityConfigSchema = require('./AccesibilityConfig');

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
        required: [ true, 'Email is required' ]
    },
    dni: {
        type: String,
        match: /\d{8}/gm,
        required: [ true, 'Dni is required']
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    verified: {
        type: Boolean,
        default: false
    },
    specialty: {
        type: String,
        required: [ true, 'Specialty is required' ]
    },
    startAttentionTime: {
        type: Date
    },
    endAttentionTime: {
        type: Date
    },
    attentionCost: {
        type: Number,
        min: 0,
        required: [ true, 'AttentionCost is required' ]
    },
    attentionTime: {
        type: Number,
        min: 1
    },
    img: {
        type: String,
        required: [ true, 'Img is required' ]
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
    },
    clinic: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic'
    }
}, {
    timestamps: true,
    versionKey: false
});

MedicSchema.methods.toJSON = function() {
    const { _id, ...medic } = this.toObject();
    medic.medicId = _id;
    delete medic.accesibilityConfig._id;
    return medic;
}

module.exports = model('Medic', MedicSchema);