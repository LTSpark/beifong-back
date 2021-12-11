const jwt=require('jsonwebtoken');

const Clinic = require('../../../schemas/Clinic');

const { generateJWT } = require('../../../utils/utils');
const { errorResponse } = require('../../../utils/responses');

const VerifyClinicFlow = async ( req, res ) => {

    const { token : verifyToken } = req.query;

    try{

        const { id } = jwt.verify(verifyToken, process.env.VERIFY_KEY);
        await Clinic.findByIdAndUpdate( id, { verified: true, updatedAt: Date.now() }).exec();

        // Create token
        const token = await generateJWT(id, process.env.CLINIC_KEY, process.env.EXPIRATION_DATE);

        return res.status(201).json({
            ok: true,
            msg: "Clinic verified successfullly!",
            token: token
        });

    }
    catch(error){
        console.error(error);
        return errorResponse(res,"Verifying failed: contact administrator", error.message, 500);
    }
}

module.exports = VerifyClinicFlow;
