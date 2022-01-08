const MedicService = require("../../../services/medic.service");
const { customResponse, errorResponse } = require("../../../utils/responses");

const SetMedicAccesibilityFlow = async ( req, res ) => {
    const { ...accesibilityConfig } = req.body;
    try {
        await MedicService.updateMedicById(req.medic.id, { accesibilityConfig });
        return customResponse(res, "Accesibility config updated!");
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Accesibility config failed", error.message);
    }
}

module.exports = SetMedicAccesibilityFlow;