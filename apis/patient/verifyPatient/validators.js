const { query } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { alreadyVerifiedPatientToken } = require('../../../middlewares/patientValidators');

const VerifyPatientValidators = [
    query('token').isJWT(),
    query('token').custom(alreadyVerifiedPatientToken),
    fieldValidation
];

module.exports = VerifyPatientValidators;
