const PatientService = require("../../../services/patient.service");

const { sendEmail, encryptPassword } = require("../../../utils/utils");
const { patientVerificationTemplate } = require("../../../templates/verificationTemplates");
const { errorResponse } = require("../../../utils/responses");


const PostPatientFlow = async ( req, res ) => {
    const { password, ...patient } = req.body;
    patient.password = encryptPassword(password);
    try{
        const { id, name, email } = await PatientService.savePatient(patient);
        const template = await patientVerificationTemplate(id, name);
        sendEmail(template, email);
        return res.status(201).json({
            ok: true,
            patientId: id,
            msg: "Patient creation done! Please check your email."
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Patient creation failed", error.message);
    }
}

module.exports = PostPatientFlow;
