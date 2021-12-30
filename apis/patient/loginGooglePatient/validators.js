const { body } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");

const LoginGooglePatientValidators = [
    body("idToken").isJWT(),
    fieldValidation
];

module.exports = LoginGooglePatientValidators;
