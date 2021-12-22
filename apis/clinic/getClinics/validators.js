const { query } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');

const GetClinicsValidators = [
    query("sort").optional().isIn(["name", "_id"]),
    query("order").optional().isIn(["asc", "desc"]),
    query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
    query("limit", "Limit has to be a negative integer").optional().isInt({ min: 0 }),
    query("name", "Name cannot be an empty value").optional().notEmpty(),
    fieldValidation
];

module.exports = GetClinicsValidators;