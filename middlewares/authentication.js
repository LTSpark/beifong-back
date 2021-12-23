const ClinicService = require("../services/clinic.service");

const { customErrorResponse, errorResponse } = require("../utils/responses");
const { getJWTPayload } = require("../utils/utils");

const authClinicToken = async(req, res, next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader){
        return customErrorResponse(res, "Token not found");
    }
    if(!authHeader.startsWith("Bearer ", 0)){
        return customErrorResponse(res, "Bad authorization");
    }
    const token = authHeader.substring(7, authHeader.length);
    try {
        const { id } = getJWTPayload(token, process.env.CLINIC_KEY);
        const clinic = await ClinicService.findById(id);
        if(!clinic){
            return customErrorResponse(res, "Invalid token: clinic not found", 403);
        }
        req.clinic = clinic;
        next();
    } catch(error) {
        console.error(error);
        return errorResponse(res, "Invalid token", 401);
    }
}

module.exports = {
    authClinicToken
}