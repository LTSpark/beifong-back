const { body } = require('express-validator');

const { clinicIdExists, alreadyVerifiedClinic } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const GetClinicValidators = [
    body('clinicId').isMongoId(),
    body('clinicId').custom(clinicIdExists),
    body('clinicId').custom(alreadyVerifiedClinic),
    fieldValidation
];

module.exports = GetClinicValidators;
