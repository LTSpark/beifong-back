const { body } = require('express-validator');

const { clinicEmailExists } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const LoginClinicValidators = [
    body('email').not().isEmpty(),
    body('email').custom(clinicEmailExists),
    body('password').not().isEmpty(),
    fieldValidation
];

module.exports = LoginClinicValidators;
