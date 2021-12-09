const Clinic = require('../../../schemas/Clinic');

const { encryptPassword } = require('../../../utils/utils');
const { AccesibilityConfigDefaultFactory } = require('../../../utils/factories');
const { customResponse, errorResponse } = require('../../../utils/responses');

const PostClinicFlow = async ( req, res ) => {

    const { name, email, telephone, direction, password } = req.body;
    const accesibilityConfig = AccesibilityConfigDefaultFactory();
    
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
        await clinic.save();
        return customResponse(res, "Clinic creation done! Please check your email", 201);
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Clinic creation failed", err.message); 
    }
}

module.exports = PostClinicFlow;