const PatientService = require("../../../services/patient.service");

const { googleVerify, generateJWT } = require("../../../utils/utils");
const { errorResponse } = require("../../../utils/responses");

const LoginGooglePatientFlow = async ( req, res ) => {

    try{

        const { name, email, img } = await googleVerify(req.body.idToken);
        let patient = await PatientService.findOne({ email });

        let statusCode = 200;

        if(!patient){
            patient = await PatientService.saveGoogle(name, email, img);
            statusCode = 201;
        }
        if(!patient.verified || !patient.google){
            PatientService.updateOneById( patient.id, { verified: true, google: true } );
        }

        const token = generateJWT({ id: patient.id }, process.env.PATIENT_KEY, '3h');

        return res.status(statusCode).json({
            ok: true,
            token
        });

    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Login Google failed", error.message);
    }
}

module.exports = LoginGooglePatientFlow;
