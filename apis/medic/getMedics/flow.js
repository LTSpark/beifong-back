const MedicService = require("../../../services/medic.service");
const { Types } = require("mongoose");

const { errorResponse } = require("../../../utils/responses");

const { ObjectId } = Types;

const GetMedicsFlow = async ( req, res ) => {
    const { clinicId } = req.params;
    const { name, limit , from, sort, order } = req.query;
    try{
        const query = { name: new RegExp(name, 'i'), clinic: ObjectId(clinicId)};
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