const Clinic = require('../../../schemas/Clinic');

const { sendEmail } = require('../../../services/sendEmail');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');

const { errorResponse } = require('../../../utils/responses');

const ResendEmailClinicFlow = async ( req, res ) => {

    const { clinicId } = req.body;
    try {
        clinic = await Clinic.findById(clinicId).exec()
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Connection with DB failed", err.message); 
    }
    
    try {
        const { name, email} = clinic;
        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(clinicId, name);
        sendEmail(template, email);

        return res.status(201).json({
            ok: true,
            clinicId: clinicId,
            msg: "Clinic creation message resend! Please check your email"     
        });

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic email resend failed", err.message); 
    }

}

module.exports = ResendEmailClinicFlow;
