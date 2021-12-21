
const { param, query } = require('express-validator');

const { clinicExists } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const GetClinicValidators = [
    param('id').isMongoId(),
    param('id').custom(clinicExists),
    query('medics').optional().isBoolean(),
    query('clinicalAppointments').optional().isBoolean(),
    fieldValidation
];

module.exports = GetClinicValidators;