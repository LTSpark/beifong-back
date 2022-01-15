const ClinicalAppointmentService = require("../../../services/clinicalAppointment.service");
const { errorResponse } = require("../../../utils/responses");

const GetClinicalAppointmentsByPatientFlow = async ( req, res ) => {

    const { patientId } = req.params;
    const { limit , from, sort, order } = req.query;

    try{

        const query = { patient: patientId };
        const { total, clinicalAppointments } = await ClinicalAppointmentService.find(query, from, limit, sort, order);

        return res.status(200).json({
            totalClinicalAppointments: total,
            clinicalAppointments
        });
        
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting clinical appointments failed", error.message);
    }
}

module.exports = GetClinicalAppointmentsByPatientFlow;