const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { param } = require("express-validator");
const { medicExists } = require("../../../middlewares/medicValidators");

const GetMedicValidators = [
    param('id').isMongoId(),
    param('id').custom(medicExists),
    fieldValidation
];

module.exports = GetMedicValidators;