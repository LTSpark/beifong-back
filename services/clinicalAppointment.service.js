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

    findOne( query ) {
        return ClinicalAppointment.findOne({ query }).exec();
    }

    async findById( clinicalAppointmentId, patient = false, medic = false, clinic = false ){
        const clinicalAppointment = await ClinicalAppointment.findById(clinicalAppointmentId).exec();
        if ( patient ) {
            await ClinicalAppointment.populate(
                clinicalAppointment,
                {
                    path: 'patient',
                    model: 'Patient'
                }
            );
        }
        if ( medic ) {
            await ClinicalAppointment.populate(
                clinicalAppointment,
                {
                    path: 'medic',
                    model: 'Medic'
                }
            );
        }
        if ( clinic ) {
            await ClinicalAppointment.populate(
                clinicalAppointment,
                {
                    path: 'clinic',
                    model: 'Clinic'
                }
            );
        }
        return clinicalAppointment;
    }

}

const clinicalAppointmentService = new ClinicalAppointmentService();

module.exports = clinicalAppointmentService;