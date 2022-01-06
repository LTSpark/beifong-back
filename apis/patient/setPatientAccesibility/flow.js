const PatientService = require("../../../services/patient.service");
const { customResponse, errorResponse } = require("../../../utils/responses");

const SetPatientAccesibilityFlow = async ( req, res ) => {
    const { ...accesibilityConfig } = req.body;
    try {
        await PatientService.updateOneById(req.patient.id, { accesibilityConfig });
        return customResponse(res, "Accesibility config updated!");
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Accesibility config failed", error.message);
    }
}

module.exports = SetPatientAccesibilityFlow;