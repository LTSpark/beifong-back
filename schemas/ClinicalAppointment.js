const { Schema, model } = require('mongoose');

const ClinicalAppointmentSchema = Schema({
    startAttentionDate: {
        type: Date,
        required: [true, 'StartAttentionTime is required']
    },
    endAttentionDate: {
        type: Date,
        required: [true, 'EndAttentionTime is required']
    },
    mount: {
        type: Number,
        min: 0,
        required: [true, 'Mount is required']
    },
    clinic: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    medic: {
        type: Schema.Types.ObjectId,
        ref: 'Medic'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('ClinicalAppointment', ClinicalAppointmentSchema);