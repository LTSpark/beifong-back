const { body } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { optionalImgValidator } = require("../../../middlewares/fileValidators");
const { authClinicToken, authVerifiedClinic, authSubscribedClinic } = require("../../../middlewares/authentication");
const { validateHourMinutes, weekDays, validateWeekDay } = require("../../../middlewares/dateValidators");

const UpdateClinicInformationValidators = [
    authClinicToken,
    authVerifiedClinic,
    authSubscribedClinic,
    body("slogan").optional().isLength({ min: 15, max: 125 }),
    body("subSlogan").optional().isLength({ min: 25, max: 200 }),
    body("startAttentionDay").optional().isIn(weekDays),
    body("endAttentionDay").optional().isIn(weekDays),
    body("startAttentionTime").optional().matches(/^(\d|0\d|1\d|2[0-3]):[0-5]\d$/),
    body("endAttentionTime").optional().matches(/^(\d|0\d|1\d|2[0-3]):[0-5]\d$/),
    fieldValidation,
    validateHourMinutes,
    validateWeekDay,
    optionalImgValidator
];

module.exports = UpdateClinicInformationValidators;
