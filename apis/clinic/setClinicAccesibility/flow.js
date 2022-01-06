const ClinicService = require("../../../services/clinic.service");
const { customResponse, errorResponse } = require("../../../utils/responses");

const SetClinicAccesibilityFlow = async ( req, res ) => {
    const { ...accesibilityConfig } = req.body;
    try {
        await ClinicService.updateClinicById(req.clinic.id, { accesibilityConfig });
        return customResponse(res, "Accesibility config updated!");
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Accesibility config failed", error.message);
    }
}

module.exports = SetClinicAccesibilityFlow;