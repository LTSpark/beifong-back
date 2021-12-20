const ClinicService = require('../../../services/clinic.service');
const { customErrorResponse, errorResponse } = require('../../../utils/responses');

const LoginClinicFlow = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const token = await ClinicService.login(email, password);
        return res.status(200).json({
            ok: true,
            msg: "Clinc login success",
            token
        });

    } catch (error) {
        console.error(error);
        errorResponse(res, "Contact database administrator", error, 500);
    }
}

module.exports = LoginClinicFlow;
