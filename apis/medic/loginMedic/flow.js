const MedicService = require("../../../services/medic.service");
const { errorResponse } = require("../../../utils/responses");

const LoginMedicFlow = async ( req, res ) => {
    const { email, password } = req.body;
    try{
        const token  = await MedicService.login(req.params.clinicId, email, password);
        return res.status(200).json({
            ok: true,
            msg: "Clinic login success",
            token
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Login clinic failed", error.message, error.code);
    }
}

module.exports = LoginMedicFlow;