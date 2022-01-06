const { query, param } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { patientExists } = require("../../../middlewares/patientValidators");

const GetPatientValidators = [
    param('id').isMongoId(),
    param('id').custom(patientExists),
    query('clinicalAppointments').optional().isBoolean(),
    fieldValidation
];

module.exports = GetPatientValidators;