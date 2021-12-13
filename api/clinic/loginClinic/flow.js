const bcryptjs = require('bcryptjs');

const Clinic = require('../../../schemas/Clinic');

const { generateJWT } = require('../../../utils/utils');
const { customErrorResponse, errorResponse } = require('../../../utils/responses');

const LoginClinicFlow = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const clinic = await Clinic.findOne({ email }).exec();
        if(bcryptjs.compareSync(password, clinic.password)){
            return customErrorResponse(res, "Invalid password", 401);
        }

        const token = await generateJWT(clinic.id, process.env.CLINIC_KEY, process.env.EXPIRATION_DATE);

        return res.status(200).json({
            ok: true,
            msg: "Clinc login success",
            token
        });

    } catch (error) {
        console.log(error);
        errorResponse(res, "Contact database administrator", error, 500);
    }
}

module.exports = LoginClinicFlow;
