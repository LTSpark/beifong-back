const ClinicService = require('../../../services/clinic.service');

const { encryptPassword, sendEmail } = require('../../../utils/utils');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');
const { errorResponse } = require('../../../utils/responses');

const PostClinicFlow = async ( req, res ) => {

    const { password, ...clinic } = req.body;   
    clinic.password = encryptPassword(password);

    try {

        // Store clinic on database
        const { id, name, email } = await ClinicService.saveClinic(clinic);
        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(id, name);
        sendEmail(template, email);

        return res.status(201).json({
            ok: true,
            msg: "Clinic creation done! Please check your email",
            clinicId: id
        });

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic creation failed", error.message); 
    }

}

module.exports = PostClinicFlow;
