const { body } = require("express-validator");
const { authMedicToken } = require("../../../middlewares/authentication");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const allowedFontSizes = ['sm', 'md', 'base', 'lg', 'xl'];

const SetMedicAccesibilityValidators = [
    authMedicToken,
    body("darkMode").optional().isBoolean(),
    body("textToVoice").optional().isBoolean(),
    body("highlightText").optional().isBoolean(),
    body("highContrast").optional().isBoolean(),
    body("fontSize").optional().isIn(allowedFontSizes),
    body("visualDisease").optional().not().isEmpty(),
    fieldValidation
];

module.exports = SetMedicAccesibilityValidators;