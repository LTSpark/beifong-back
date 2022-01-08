const Medic = require("../schemas/Medic");
const MedicService = require("../services/medic.service");
const { getJWTPayload } = require('../utils/utils');
const { customErrorResponse } = require("../utils/responses");

const medicExists = async id => {
    const medic = await MedicService.findById(id);
    if(!medic) throw new Error(`Medic with id ${id} not exists on database`);
}

const medicDniExists = async ( req, res, next ) => {

    const medic = await MedicService.findOne({
        clinic: req.clinic.id,
        dni: req.body.dni
    });

    if(medic.length != 0) return customErrorResponse(res, `Medic with DNI ${req.body.dni} already exists on ${req.clinic.name}`);
    next();

}

const medicEmailExists = async ( req, res, next ) => {

    const medic = await MedicService.findOne({
        clinic: req.clinic.id,
        email: req.body.email
    });

    if(medic.length != 0) return customErrorResponse(res, `Medic with email ${req.body.email} already exists on ${req.clinic.name}`);
    next();
    
}

const alreadyVerifiedMedicToken = async token => {
    const { id } = getJWTPayload(token, process.env.VERIFY_KEY);
    const { verified } = await MedicService.findById(id);
    if( verified ) {
        throw new Error(`Medic with ${id} id is already verified on database`);
    }
}

module.exports = {
    medicExists,
    medicDniExists,
    medicEmailExists,
    alreadyVerifiedMedicToken
}

