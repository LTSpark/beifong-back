const Clinic = require('../../../schemas/Clinic');

const { encryptPassword } = require('../../../utils/utils');
const { AccesibilityConfigDefaultFactory } = require('../../../utils/factories');
const { customResponse, errorResponse } = require('../../../utils/responses');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');
const { sendEmail } = require('../../../services/sendEmail');

const PostClinicFlow = async ( req, res ) => {

    const { name, email, telephone, direction, password } = req.body;
    const accesibilityConfig = AccesibilityConfigDefaultFactory(); // Set default accesbility
    
    const hashedPassword = encryptPassword(password);

    const clinic = new Clinic({
        name,
        email,
        telephone,
        password: hashedPassword,
        direction,
        accesibilityConfig
    })
    
    try {
        // Store clinic on database
        await clinic.save();
        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(clinic.id, name);
        sendEmail(template, email);

        return customResponse(res, "Clinic creation done! Please check your email", 201);
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic creation failed", err.message); 
    }
}

module.exports = PostClinicFlow;