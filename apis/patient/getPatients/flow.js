const PatientService = require("../../../services/patient.service");

const { errorResponse } = require("../../../utils/responses");

const GetPatientsFlow = async ( req, res ) => {
    const { name, limit , from, sort, order } = req.query;
    try{
        const query = { name: new RegExp(name, 'i') };
        const { total, patients } = await PatientService.find(query, from, limit, sort, order);
        return res.status(200).json({
            totalUsers: total,
            patients
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting patients failed", error.message);
    }
}

module.exports = GetPatientsFlow;