const { body, param } = require("express-validator");

const { authClinicToken } = require("../../../middlewares/authentication");
const { clinicExists, validateLoggedClinic } = require("../../../middlewares/clinicValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");


const SubscribeClinicValidators = [
    authClinicToken,
    param("id").isMongoId(),
    param("id").custom(clinicExists),
    body("mount").isFloat({ min: 0.1 }),
    body("subscriptionType").isIn(["annual", "semi-annual", "monthly"]),
    fieldValidation,
    validateLoggedClinic
];

module.exports = SubscribeClinicValidators;