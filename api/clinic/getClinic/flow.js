const Clinic = require('../../../schemas/Clinic');

const { errorResponse } = require('../../../utils/responses');

const GetClinicFlow = async ( req, res ) => {

    const { clinicId } = req.body;

    try {

        const { id, name, email, telephone, direction, attentionDays, medics, accesibilityConfig } = await Clinic.findById(clinicId).exec();


        return res.status(201).json({
            ok: true,
            data: {
                clinicId: id,
                name: name,
                email:email,
                telephone:telephone,
                direction:direction,
                attentionDays:attentionDays,
                medics:medics,
                accesibilityConfig:accesibilityConfig
            },
            msg: "Clinic information sent"     
        });

    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Getting clinic information failed", err.message); 
    }

}

module.exports = GetClinicFlow;
