const { body } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");

const LoginGooglePatientValidators = [
    body("idToken").notEmpty(),
    fieldValidation
];

module.exports = LoginGooglePatientValidators;
