const { body } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { uniquePatientName, uniquePatientEmail } = require("../../../middlewares/patientValidators");

const PostPatientValidators = [
    body('name').notEmpty().trim(),
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .matches(/^(?=.*\d)(?=.*[a-zñ])(?=.*[A-ZÑ])[0-9a-zA-ZñÑ]{8,}$/),
    body('email', 'Invalid email').isEmail().trim(),
    body('name').custom(uniquePatientName),
    body('email').custom(uniquePatientEmail),
    fieldValidation
];

module.exports = PostPatientValidators;
