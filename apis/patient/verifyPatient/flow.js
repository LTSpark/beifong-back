const PatientService = require("../../../services/patient.service");
const { errorResponse } = require("../../../utils/responses");
const { getJWTPayload, generateJWT } = require("../../../utils/utils");

const VerifyPatientFlow = async ( req, res ) => {
    const { token: verifyToken } = req.query;
    try {
        const { id } = getJWTPayload(verifyToken, process.env.VERIFY_KEY);
        PatientService.updatePatientById(id, { verified: true });
        // Create token
        const token = await generateJWT({ id }, process.env.PATIENT_KEY, '1h');
        return res.status(201).json({
            ok: true,
            msg: "Patient verified successfullly!",
            token
        });
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Patient verification failed", error.message);
    } 
}

module.exports = VerifyPatientFlow;
