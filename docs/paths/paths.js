const clinicsDocs = require("./Clinic/clinics")["/clinics"];
const clinicsResendDocs = require("./Clinic/clinicsResend")["/clinics/resend"];
const clinicsVerifyDocs = require("./Clinic/clinicsVerify")["/clinics/verify"];
const clinicsLoginDocs = require("./Clinic/clinicsLogin")["/clinics/login"];

module.exports = {
    "/clinics": clinicsDocs,
    "/clinics/resend": clinicsResendDocs,
    "/clinics/verify": clinicsVerifyDocs,
    "/clinics/login": clinicsLoginDocs
};