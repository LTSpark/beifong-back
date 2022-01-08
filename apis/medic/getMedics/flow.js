const MedicService = require("../../../services/medic.service");

const { errorResponse } = require("../../../utils/responses");

const GetMedicsFlow = async ( req, res ) => {

    const { clinicId } = req.params;
    const { name, limit , from, sort, order, specialty } = req.query;

    try{

        const query = { 
            name: new RegExp(name, 'i'),
            specialty: new RegExp(specialty, 'i'),
            clinic: clinicId
        };

        const { total, medics } = await MedicService.find(query, from, limit, sort, order);

        return res.status(200).json({
            totalMedics: total,
            medics
        });

    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting medics failed", error.message);
    }
    
}

module.exports = GetMedicsFlow;