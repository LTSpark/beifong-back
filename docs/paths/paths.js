const clinicsDocs = require("./Clinic/clinics")["/clinics"];
const clinicsResendDocs = require("./Clinic/clinics_resend")["/clinics/resend"];
const clinicsVerifyDocs = require("./Clinic/clinics_verify")["/clinics/verify"];
const clinicsLoginDocs = require("./Clinic/clinics_login")["/clinics/login"];

module.exports = {
    "/clinics": clinicsDocs,
    "/clinics/resend": clinicsResendDocs,
    "/clinics/verify": clinicsVerifyDocs,
    "/clinics/login": clinicsLoginDocs
};