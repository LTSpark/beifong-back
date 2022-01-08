const ClinicService = require("../services/clinic.service");
const PatientService = require("../services/patient.service");
const medicService = require("../services/medic.service");

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

const authVerifiedClinic = async ( req, res, next ) => {
    if(!req.clinic.verified){
        return customErrorResponse(res, "Account must be verified to access this", 403);
    }
    next();
}

const authSubscribedClinic = async ( req, res, next ) => {
    const currentTime = new Date();
    if(!req.clinic.subscriptionPaymentExpires){
        return customErrorResponse(res, "No subscription found", 403);
    }
    if(req.clinic.subscriptionPaymentExpires < currentTime.getTime()){
        return customErrorResponse(res, "Subscription expired", 403);
    }
    next();
}

const authPatientToken = async ( req, res, next ) => {

    const authHeader = req.header("Authorization");
    if(!authHeader){
        return customErrorResponse(res, "Token not found");
    }
    if(!authHeader.startsWith("Bearer ", 0)){
        return customErrorResponse(res, "Bad authorization");
    }
    const token = authHeader.substring(7, authHeader.length);

    try {
        const { id } = getJWTPayload(token, process.env.PATIENT_KEY);
        const patient = await PatientService.findByID(id);
        if(!patient){
            return customErrorResponse(res, "Invalid token: patient not found", 403);
        }
        req.patient = patient;
        next();
    } catch(error) {
        console.error(error);
        return errorResponse(res, "Invalid token", 401);
    }
}

const authMedicToken = async ( req, res, next ) => {

    const authHeader = req.header("Authorization");
    if(!authHeader){
        return customErrorResponse(res, "Token not found");
    }
    if(!authHeader.startsWith("Bearer ", 0)){
        return customErrorResponse(res, "Bad authorization");
    }
    const token = authHeader.substring(7, authHeader.length);

    try {
        const { id } = getJWTPayload(token, process.env.MEDIC_KEY);
        const medic = await medicService.findById(id);
        if(!medic){
            return customErrorResponse(res, "Invalid token: medic not found", 403);
        }
        req.medic = medic;
        next();
    } catch(error) {
        console.error(error);
        return errorResponse(res, "Invalid token", 401);
    }
}

module.exports = {
    authClinicToken,
    authVerifiedClinic,
    authSubscribedClinic,
    authPatientToken,
    authMedicToken
}