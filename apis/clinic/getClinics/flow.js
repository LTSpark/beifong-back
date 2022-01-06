const ClinicService = require('../../../services/clinic.service');

const { errorResponse } = require('../../../utils/responses');

const GetClinicsFlow = async ( req, res ) => {
    const { name, limit , from, sort, order } = req.query;
    try {
        const query = { name: new RegExp(name, 'i') };
        const { total, clinics } = await ClinicService.find(query, from, limit, sort, order);
        return res.status(200).json({
            totalClinics: total,
            clinics
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting clinics failed", error.message); 
    }
}

module.exports = GetClinicsFlow;

