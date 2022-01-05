const { body } = require("express-validator");

const { authClinicToken, authVerifiedClinic, authSubscribedClinic } = require("../../../middlewares/authentication");
const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { imgValidator } = require("../../../middlewares/fileValidators");

const positions = ["left", "right"];

const AddClinicSectionValidators = [
    authClinicToken,
    authVerifiedClinic,
    authSubscribedClinic,
    body("title").isLength({ min: 5, max: 250 }),
    body("description").isLength({ min: 5, max: 500 }),
    body("imgPosition").isIn(positions),
    fieldValidation,
    imgValidator
];

module.exports = AddClinicSectionValidators;
