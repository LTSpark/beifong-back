const { body } = require("express-validator");

const { authMedicToken, authVerifiedMedic } = require("../../../middlewares/authentication");
const { validateHourMinutes } = require("../../../middlewares/dateValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { optionalImgValidator } = require("../../../middlewares/fileValidators");

const PutMedicValidators = [
    authMedicToken,
    authVerifiedMedic,
    body(
        'password',
        'Password has to contain one digit, one lower, one upper and has to be eight characters long'
    )
    .optional().matches(/^(?=.*\d)(?=.*[a-zñ])(?=.*[A-ZÑ])[0-9a-zA-ZñÑ]{8,}$/),
    body("attentionTime").isInt({ min: 15, max: 60 }),
    fieldValidation,
    validateHourMinutes,
    optionalImgValidator
];

module.exports = PutMedicValidators;
