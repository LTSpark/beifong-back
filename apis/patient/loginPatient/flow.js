const PatientService = require("../../../services/patient.service");

const { errorResponse } = require("../../../utils/responses");

const LoginPatientFlow = async ( req, res ) => {
    try {
        const { token, patient } = await PatientService.login(req.body.email, req.body.password);
        return res.status(200).json({
            ok: true,
            msg: "Login patient success!",
            token,
            patient
        })
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Login patient failed", error.message, error.code);
    }
}

module.exports = LoginPatientFlow;