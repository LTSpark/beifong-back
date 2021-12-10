const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { clinicNameExists, clinicEmailExists } = require('../../../middlewares/clinicValidators');

const ResendEmailClinicValidators = [
    body('clinicId').notEmpty(),
    fieldValidation
];

module.exports = ResendEmailClinicValidators;
