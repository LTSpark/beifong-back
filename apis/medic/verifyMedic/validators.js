const { query } = require('express-validator');

const { alreadyVerifiedMedicToken } = require('../../../middlewares/medicValidators');
const { fieldValidation } = require('../../../middlewares/fieldValidation');

const VerifyMedicValidators = [
    query('token').isJWT(),
    query('token').custom(alreadyVerifiedMedicToken),
    fieldValidation
];

module.exports = VerifyMedicValidators;
