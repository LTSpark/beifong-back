const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { clinicIdExists } = require('../../../middlewares/clinicValidators');

const ResendEmailClinicValidators = [
    body('clinicId').notEmpty(),
    body('clinicId').custom(clinicIdExists),
    body('clinicId').isMongoId(),
    fieldValidation
];

module.exports = ResendEmailClinicValidators;
