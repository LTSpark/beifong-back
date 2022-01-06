const PatientService = require("../../../services/patient.service");

const { errorResponse } = require("../../../utils/responses");

const GetPatientFlow = async ( req, res ) => {
    try{
        const patient = await PatientService.findByID(req.params.id, req.query.clinicalAppointments);
        return res.status(200).json({
            patient
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting patient failed", error.message);
    }
}

module.exports = GetPatientFlow;