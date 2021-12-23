const ClinicService = require('../../../services/clinic.service');

const { generateJWT, getJWTPayload } = require('../../../utils/utils');
const { errorResponse } = require('../../../utils/responses');

const VerifyClinicFlow = async ( req, res ) => {

    const { token : verifyToken } = req.query;

    try{

        const { id } = getJWTPayload(verifyToken, process.env.VERIFY_KEY);

        await ClinicService.updateClinicById(id, { verified: true });

        // Create token
        const token = await generateJWT({ id }, process.env.CLINIC_KEY, '1h');
        return res.status(201).json({
            ok: true,
            msg: "Clinic verified successfullly!",
            token
        });

    }
    catch(error){
        console.error(error);
        return errorResponse(res,"Verifying failed: contact administrator", error.message);
    }
}

module.exports = VerifyClinicFlow;
