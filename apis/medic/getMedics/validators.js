const { query , param } = require('express-validator');

const { clinicExists } = require("../../../middlewares/clinicValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const GetMedicValidators = [
    param("clinicId").isMongoId(),
    param("clinicId").custom(clinicExists),  
    query("sort").optional().isIn(["name", "_id", "specialty"]),
    query("order").optional().isIn(["asc", "desc"]),
    query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
    query("limit", "Limit has to be a negative integer").optional().isInt({ min: 0 }),
    query("name", "Name cannot be an empty value").optional().notEmpty(),
    query("specialty", "Specialty cannot be an empty value").optional().notEmpty(),
    fieldValidation
];

module.exports = GetMedicValidators;