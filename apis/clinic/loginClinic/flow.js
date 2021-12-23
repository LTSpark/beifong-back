const ClinicService = require('../../../services/clinic.service');
const { errorResponse } = require('../../../utils/responses');

const LoginClinicFlow = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const token = await ClinicService.login(email, password);
        return res.status(200).json({
            ok: true,
            msg: "Clinic login success",
            token
        });

    } catch (error) {
        console.error(error);
        return errorResponse(res, "Contact database administrator", error.message);
    }
}

module.exports = LoginClinicFlow;
