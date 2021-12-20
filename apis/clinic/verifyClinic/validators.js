const { query } = require('express-validator');

const { alreadyVerifiedClinicToken } = require('../../../middlewares/clinicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const VerifyClinicValidators = [
    query('token').isJWT(),
    query('token').custom(alreadyVerifiedClinicToken),
    fieldValidation
];

module.exports = VerifyClinicValidators;
