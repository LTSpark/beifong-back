const ClinicService = require('../../../services/clinic.service');

const { sendEmail } = require('../../../utils/utils');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');
const { errorResponse, customResponse } = require('../../../utils/responses');


const ResendEmailClinicFlow = async ( req, res ) => {

    const { clinicId } = req.body;

    try {

        const { name, email } = await ClinicService.findById(clinicId);
        const template = await clinicVerificationTemplate(clinicId, name);
        sendEmail(template, email);

        return customResponse(res, "Verification email was resent! Please check your email now");

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic email resend failed", error.message); 
    }

}

module.exports = ResendEmailClinicFlow;
