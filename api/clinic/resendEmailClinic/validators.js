const { body } = require('express-validator');

const { clinicIdExists } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const ResendEmailClinicValidators = [
    body('clinicId').isMongoId(),
    body('clinicId').custom(clinicIdExists),
    fieldValidation
];

module.exports = ResendEmailClinicValidators;
