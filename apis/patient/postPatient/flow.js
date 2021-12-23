const PatientService = require("../../../services/patient.service");

const { sendEmail } = require("../../../utils/utils");
const { patientVerificationTemplate } = require("../../../templates/verificationTemplates");
const { errorResponse } = require("../../../utils/responses");


const PostPatientFlow = async ( req, res ) => {
    try{
        const patient = await PatientService.savePatient(req.body);
        const template = await patientVerificationTemplate(patient.id, patient.name);
        sendEmail(template, patient.email);
        return res.status(201).json({
            ok: true,
            patientId: patient.id,
            msg: "Patient creation done! Please check your email."
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Patient creation failed", error.message);
    }
}

module.exports = PostPatientFlow;
