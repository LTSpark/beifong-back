const ClinicalAppointmentService = require("../../../services/clinicalAppointment.service");
const { errorResponse } = require("../../../utils/responses");

const GetClinicalAppointmentFlow = async ( req, res ) => {
    const { patient, medic, clinic } = req.query;
    try{
        const clinicalAppointment = await ClinicalAppointmentService.findById(req.params.id, patient, medic, clinic);
        return res.status(200).json({
            clinicalAppointment
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting clinical appointment failed", error.message);
    }
}

module.exports = GetClinicalAppointmentFlow