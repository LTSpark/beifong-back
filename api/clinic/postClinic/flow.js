const Clinic = require('../../../schemas/Clinic');

const { sendEmail } = require('../../../services/sendEmail');
const { clinicVerificationTemplate } = require('../../../templates/verificationTemplates');

const { encryptPassword } = require('../../../utils/utils');
const { errorResponse } = require('../../../utils/responses');

const PostClinicFlow = async ( req, res ) => {

    const { name, email, telephone, direction, password } = req.body;   
    const hashedPassword = encryptPassword(password);

    const clinic = new Clinic({
        name,
        email,
        telephone,
        password: hashedPassword,
        direction
    });
    
    try {

        // Store clinic on database
        await clinic.save();
        // Create template email and send it to clinic
        const template = await clinicVerificationTemplate(clinic.id, name);
        sendEmail(template, email);

        return res.status(201).json({
            ok: true,
            clinicId: clinic.id,
            msg: "Clinic creation done! Please check your email"     
        });

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic creation failed", error.message); 
    }

}

module.exports = PostClinicFlow;
