const MedicService = require('../../../services/medic.service');

const { generateJWT, getJWTPayload } = require('../../../utils/utils');
const { errorResponse } = require('../../../utils/responses');

const VerifyMedicFlow = async ( req, res ) => {

    const { token : verifyToken } = req.query;

    try{

        const { id } = getJWTPayload(verifyToken, process.env.VERIFY_KEY);

        MedicService.updateMedicById(id, { verified: true });

        // Create token
        const token = await generateJWT({ id }, process.env.MEDIC_KEY, '1h');
        return res.status(201).json({
            ok: true,
            msg: "Medic verified successfullly!",
            token
        });

    }
    catch(error){
        console.error(error);
        return errorResponse(res,"Verifying failed: contact administrator", error.message);
    }
}

module.exports = VerifyMedicFlow;
