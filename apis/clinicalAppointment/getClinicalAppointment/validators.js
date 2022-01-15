const { query, param } = require("express-validator");

const { clinicalAppointmentExists } = require("../../../middlewares/clinicalAppointmentValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const GetClinicalAppointmentValidators = [
    param('id').isMongoId(),
    param("id").custom(clinicalAppointmentExists),
    query('medic').optional().isBoolean(),
    query('clinic').optional().isBoolean(),
    query('patient').optional().isBoolean(),
    fieldValidation
];

module.exports = GetClinicalAppointmentValidators;