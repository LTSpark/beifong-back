const { query } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');

const VerifyClinicValidators = [
    query('token').isJWT(),
    fieldValidation
];

module.exports = VerifyClinicValidators;
