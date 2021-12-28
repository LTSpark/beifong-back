const { body } = require('express-validator');

const { patientEmailExists } = require('../../../middlewares/patientValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const LoginPatientValidators = [
    body('email').not().isEmpty(),
    body('email').custom(patientEmailExists),
    body('password').not().isEmpty(),
    fieldValidation
];

module.exports = LoginPatientValidators;
