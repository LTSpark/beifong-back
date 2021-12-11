const { query } = require('express-validator');

const { alreadyVerifiedClinic } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const VerifyClinicValidators = [
    query('token').isJWT(),
    query('token').custom(alreadyVerifiedClinic),
    fieldValidation
];

module.exports = VerifyClinicValidators;
