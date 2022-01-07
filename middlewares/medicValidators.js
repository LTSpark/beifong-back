const Medic = require("../schemas/Medic");
const MedicService = require("../services/medic.service");
const { customErrorResponse } = require("../utils/responses");

const medicExists = async id => {
    const medic = await MedicService.findById(id);
    if(!medic) throw new Error(`Medic with id ${id} not exists on database`);
}

const medicAlreadyCreatedOnClinic = async ( req, res, next )=> {

    const medic = await MedicService.findOne({ 
        clinic: req.clinic.id,
        dni: req.body.dni,
        email: req.body.email
    });

    if(medic.length != 0) return customErrorResponse(res, `Medic already exists on clinic`);

    next();
}

module.exports = {
    medicExists,
    medicAlreadyCreatedOnClinic
}

