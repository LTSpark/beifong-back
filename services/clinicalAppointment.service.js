const ClinicalAppointment = require("../schemas/ClinicalAppointment");

class ClinicalAppointmentService {

    saveClinicalAppointment( patientId, data ){
        const { clinicId, medicId, startAttentionDate, endAttentionDate, mount } = data;

        const clinicalAppointment = new ClinicalAppointment({
            clinic : clinicId,
            medic : medicId,
            patient: patientId,
            startAttentionDate,
            endAttentionDate,
            mount
        });

        return clinicalAppointment.save();
    }

    getClinicalAppointmentsByMedic( medicId ){
        return ClinicalAppointment.find({ medic: medicId }).exec();
    }

}

const clinicalAppointmentService = new ClinicalAppointmentService();

module.exports = clinicalAppointmentService;