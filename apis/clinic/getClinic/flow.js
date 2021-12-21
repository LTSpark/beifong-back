const ClinicService = require('../../../services/clinic.service');
const { errorResponse } = require('../../../utils/responses');

const GetClinicFlow = async ( req, res ) => {
    const { medics, clinicalAppointments } = req.query;
    try {
        const clinic = await ClinicService.findById(req.params.id, medics, clinicalAppointments);
        return res.status(200).json({
            clinic
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting clinic information failed", err.message); 
    }
}

module.exports = GetClinicFlow;

