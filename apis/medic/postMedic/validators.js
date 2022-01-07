const { body } = require("express-validator");

const { authClinicToken, authVerifiedClinic, authSubscribedClinic } = require("../../../middlewares/authentication");
const { imgValidator } = require("../../../middlewares/fileValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { medicAlreadyCreatedOnClinic } = require("../../../middlewares/medicValidators");

const PostMedicValidators = [
    authClinicToken,
    authVerifiedClinic,
    authSubscribedClinic,
    body("name").isLength({ min: 2, max: 50 }).trim(),
    body("surname").isLength({ min: 2, max: 50 }).trim(),
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .matches(/^(?=.*\d)(?=.*[a-zñ])(?=.*[A-ZÑ])[0-9a-zA-ZñÑ]{8,}$/),
    body('email', 'Invalid email').isEmail().trim(),
    body("dni").matches(/\d{8}/gm).trim(),
    body("specialty").isLength({ min: 2, max: 50 }).trim(),
    body("attentionCost").isFloat({ min: 0.1 }),
    fieldValidation,
    imgValidator,
    medicAlreadyCreatedOnClinic
];

module.exports = PostMedicValidators;