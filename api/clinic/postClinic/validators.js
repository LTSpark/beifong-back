const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { uniqueClinicEmail,uniqueClinicName } = require('../../../middlewares/clinicValidators');

const PostClinicValidators = [
    body('name').notEmpty().trim(),
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .matches(/^(?=.*\d)(?=.*[a-zñ])(?=.*[A-ZÑ])[0-9a-zA-ZñÑ]{8,}$/),
    body('email', 'Invalid email').isEmail().trim(),
    body('telephone').isMobilePhone(['es-PE']).trim(),
    body('direction').notEmpty().trim(),
    body('name').custom(uniqueClinicName),
    body('email').custom(uniqueClinicEmail),
    fieldValidation
];

module.exports = PostClinicValidators;
