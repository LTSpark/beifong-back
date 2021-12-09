const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { clinicNameExists, clinicEmailExists } = require('../../../middlewares/clinicValidators');

const PostClinicValidators = [
    body('name').notEmpty(),
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body('email', 'Invalid email').isEmail(),
    body('telephone').isMobilePhone(['es-PE']),
    body('direction').notEmpty(),
    body('name').custom(clinicNameExists),
    body('email').custom(clinicEmailExists),
    fieldValidation
];

module.exports = PostClinicValidators;
