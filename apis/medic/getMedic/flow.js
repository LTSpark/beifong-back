
const { errorResponse } = require("../../../utils/responses");

const MedicService = require("../../../services/medic.service");

const GetMedicFlow = async ( req, res ) => {
    try{
        const medic = await MedicService.findByID(req.params.id);
        return res.status(200).json({
            medic
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting medic failed", error.message);
    }
}

module.exports = GetMedicFlow;