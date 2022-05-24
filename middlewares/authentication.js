const ClinicService = require("../services/clinic.service");
const PatientService = require("../services/patient.service");
const MedicService = require("../services/medic.service");

const { customErrorResponse, errorResponse } = require("../utils/responses");
const { getJWTPayload } = require("../utils/utils");

// Corrección: Se debe modularizar el proceso de autenticación para las distintas entidades pues el código en clínica, médico y paciente es el mismo

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

const authVerifiedClinic = ( req, res, next ) => {
    if(!req.clinic.verified){
        return customErrorResponse(res, "Account must be verified to access this", 403);
    }
    next();
}

const authSubscribedClinic = ( req, res, next ) => {
    const currentTime = new Date();
    if(!req.clinic.subscriptionPaymentExpires){
        return customErrorResponse(res, "No subscription found", 403);
    }
    if(req.clinic.subscriptionPaymentExpires < currentTime.getTime()){
        return customErrorResponse(res, "Subscription expired", 403);
    }
    next();
}

const authUpdatedClinic = ( req, res, next ) => {
    if ( req.clinic.attentionDays.length == 0  && !req.clinic.startAttentionTime && !req.clinic.endAttentionTime ) {
        return customErrorResponse(res, `Clinic attention times are not updated yet`, 403);
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

const authVerifiedPatient = ( req, res, next ) => {
    if (!req.patient.verified) {
        return customErrorResponse(res, "Patient must be verified to do this", 403);
    }
    next();
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
        const medic = await MedicService.findById(id);
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

const authVerifiedMedic = ( req, res, next ) => {
    if (!req.medic.verified) {
        return customErrorResponse(res, "Medic must be verified to do this", 403);
    }
    next();
}

module.exports = {
    authClinicToken,
    authVerifiedClinic,
    authSubscribedClinic,
    authUpdatedClinic,
    authPatientToken,
    authVerifiedPatient,
    authMedicToken,
    authVerifiedMedic
}
