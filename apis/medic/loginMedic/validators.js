const { body, param } = require("express-validator");
const { clinicExists } = require("../../../middlewares/clinicValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const LoginMedicValidators = [
    param("clinicId").custom(clinicExists),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    fieldValidation
];

module.exports = LoginMedicValidators;