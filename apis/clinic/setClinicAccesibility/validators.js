const { body } = require("express-validator");
const { authClinicToken } = require("../../../middlewares/authentication");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const allowedFontSizes = ['sm', 'md', 'base', 'lg', 'xl'];

const SetClinicAccesibilityValidators = [
    authClinicToken,
    body("darkMode").optional().isBoolean(),
    body("textToVoice").optional().isBoolean(),
    body("highlightText").optional().isBoolean(),
    body("highContrast").optional().isBoolean(),
    body("fontSize").optional().isIn(allowedFontSizes),
    body("visualDisease").optional().not().isEmpty(),
    fieldValidation
];

module.exports = SetClinicAccesibilityValidators;