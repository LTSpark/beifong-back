const ClinicService = require('../../../services/clinic.service');

const { encryptPassword, sendEmail } = require('../../../utils/utils');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');
const { errorResponse } = require('../../../utils/responses');

const PostClinicFlow = async ( req, res ) => {

    const { password, ...user } = req.body;   
    user.password = encryptPassword(password);

    try {

        // Store clinic on database
        const clinic = await ClinicService.saveClinic(user);
        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(clinic.id, clinic.name);
        sendEmail(template, clinic.email);

        return res.status(201).json({
            ok: true,
            msg: "Clinic creation done! Please check your email",
            clinicId: clinic.id
        });

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic creation failed", error.message); 
    }

}

module.exports = PostClinicFlow;
