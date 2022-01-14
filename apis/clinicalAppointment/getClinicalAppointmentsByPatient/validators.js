const { query, param } = require("express-validator");
const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { patientExists } = require("../../../middlewares/patientValidators");

const GetClinicalAppointmentsByPatientValidators = [
    param("patientId").isMongoId(),
    param("patientId").custom(patientExists),
    query("sort").optional().isIn(["startAttentionDate", "endAttentionDate", "mount", "_id"]),
    query("order").optional().isIn(["asc", "desc"]),
    query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
    query("limit", "Limit has to be a negative integer").optional().isInt({ min: 0 }),
    fieldValidation
];

module.exports = GetClinicalAppointmentsByPatientValidators;