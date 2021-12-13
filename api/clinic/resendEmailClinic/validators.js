const { body } = require('express-validator');

const { clinicExists, alreadyVerifiedClinic } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const ResendEmailClinicValidators = [
    body('clinicId').isMongoId(),
    body('clinicId').custom(clinicExists),
    body('clinicId').custom(alreadyVerifiedClinic),
    fieldValidation
];

module.exports = ResendEmailClinicValidators;
