const Clinic = require('../../../schemas/Clinic');

const { sendEmail } = require('../../../services/sendEmail');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');

const { errorResponse, customResponse, customErrorResponse } = require('../../../utils/responses');

const ResendEmailClinicFlow = async ( req, res ) => {

    const { clinicId } = req.body;

    try {

        const { name, email } = await Clinic.findById(clinicId).exec();

        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(clinicId, name);
        sendEmail(template, email);

        return customResponse(res, "Verification email was resent! Please check your email now");

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic email resend failed", err.message); 
    }

}

module.exports = ResendEmailClinicFlow;
