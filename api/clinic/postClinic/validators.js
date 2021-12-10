const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { clinicNameExists, clinicEmailExists } = require('../../../middlewares/clinicValidators');

const PostClinicValidators = [
    body('name').notEmpty().trim(),
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body('email', 'Invalid email').isEmail().trim(),
    body('telephone').isMobilePhone(['es-PE']).trim(),
    body('direction').notEmpty().trim(),
    body('name').custom(clinicNameExists),
    body('email').custom(clinicEmailExists),
    fieldValidation
];

module.exports = PostClinicValidators;
