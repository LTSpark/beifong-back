const ClinicalAppointmentService = require("../../../services/clinicalAppointment.service");
const PatientService = require("../../../services/patient.service");
const MedicService = require("../../../services/medic.service");
const ClinicService = require('../../../services/clinic.service');

const { errorResponse, customResponse } = require("../../../utils/responses");

const PostClinicalAppointmentFlow = async ( req, res ) => {
    try{
        const clinicalAppointment = await ClinicalAppointmentService.saveClinicalAppointment(req.patient.id, req.body);
        await PatientService.updatePatientById(req.patient.id, {
            $addToSet: {
                clinicalAppointments: clinicalAppointment.id
            }
        });
        await MedicService.updateMedicById(req.body.medicId, {
            $addToSet: {
                clinicalAppointments: clinicalAppointment.id
            }
        });
        await ClinicService.updateClinicById(req.body.clinicId, {
            $addToSet: {
                clinicalAppointments: clinicalAppointment.id
            }
        });
        return customResponse(res, "Clinical Appointment done!", 201);
    } catch(error){
        console.error(error);
        return errorResponse(res, "Clinical Appointment creation failed", error);
    }
}

module.exports = PostClinicalAppointmentFlow;