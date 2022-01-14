const ClinicalAppointmentService = require("../../../services/clinicalAppointment.service");

const { errorResponse, customResponse } = require("../../../utils/responses");

const PostClinicalAppointmentFlow = async ( req, res ) => {
    try{
        await ClinicalAppointmentService.saveClinicalAppointment(req.patient.id, req.body);
        return customResponse(res, "Clinical Appointment done!", 201);
    } catch(error){
        console.error(error);
        return errorResponse(res, "Clinical Appointment creation failed", error);
    }
}

module.exports = PostClinicalAppointmentFlow;