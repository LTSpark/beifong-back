const jwt=require('jsonwebtoken');
const Clinic = require('../../../schemas/Clinic');

const { customResponse, errorResponse } = require('../../../utils/responses');

const VerifyClinicFlow = async ( req, res ) => {
    const { token } = req.query;
    try{
        const { id } = jwt.verify(token, process.env.VERIFY_KEY);
        await Clinic.findByIdAndUpdate( id, { verified: true, updatedAt: Date.now() }).exec();
        return customResponse(res, "Clinic verified!", 201);
    }
    catch(error){
        console.log(error);
        return errorResponse(res,"Verifying failed: contact administrator", error, 500);
    }
}

module.exports = VerifyClinicFlow;
