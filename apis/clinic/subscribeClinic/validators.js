const { body } = require("express-validator");

const { authClinicToken } = require("../../../middlewares/authentication");
const { fieldValidation } = require("../../../middlewares/fieldValidation");


const SubscribeClinicValidators = [
    authClinicToken,
    body("mount").isFloat({ min: 0.1 }),
    body("subscriptionType").isIn(["annual", "semi-annual", "monthly"]),
    fieldValidation
];

module.exports = SubscribeClinicValidators;