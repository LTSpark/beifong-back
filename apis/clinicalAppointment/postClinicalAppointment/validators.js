const { body } = require("express-validator");

const { fieldValidation } = require("../../../middlewares/fieldValidation");
const { clinicExists } = require("../../../middlewares/clinicValidators");
const { medicExists, medicClinicExists, medicIsUpdated } = require("../../../middlewares/medicValidators");
const { authPatientToken, authVerifiedPatient } = require("../../../middlewares/authentication");
const { sanitizeDate, notMedicAppointmentsOnAttentionDate, validClinicalAppointmentDay } = require("../../../middlewares/dateValidators");

const PostClinicalAppointmentValidators = [
    authPatientToken,
    authVerifiedPatient,
    body("clinicId").isMongoId(),
    body("clinicId").custom(clinicExists),
    body("medicId").isMongoId(),
    body("medicId").custom(medicExists),
    body("medicId").custom(medicIsUpdated),
    body("startAttentionDate").matches( 	
        /(\d{4})-([0-1]\d)-([0-3]\d)\s([0-1]\d|[2][0-3]):([0-5]\d):([0-5]\d)/i
    ),
    fieldValidation,
    medicClinicExists,
    validClinicalAppointmentDay,
    sanitizeDate,
    notMedicAppointmentsOnAttentionDate
];

module.exports = PostClinicalAppointmentValidators;