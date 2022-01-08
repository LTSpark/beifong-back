const clinics = require("./Clinic/clinics")["/clinics"];
const clinicsResend = require("./Clinic/clinicsResend")["/clinics/resend"];
const clinicsVerify = require("./Clinic/clinicsVerify")["/clinics/verify"];
const clinicsLogin = require("./Clinic/clinicsLogin")["/clinics/login"];
const clinicsId = require("./Clinic/clinicsId")["/clinics/:id"];
const clinicsSubscribe = require("./Clinic/clinicsSubscribe")["/clinics/subscribe"];

const patients = require("./Patients/patients")["/patients"];
const patientsVerify = require("./Patients/patientsVerify")["/patients/verify"];
const patientsLoginGoogle = require("./Patients/loginGoogle")["/patients/login/google"];

const medicsAccesibility = require("./Medics/accesibility")["/medics/accesibility"]
module.exports = {
    "/clinics": clinics,
    "/clinics/resend": clinicsResend,
    "/clinics/verify": clinicsVerify,
    "/clinics/login": clinicsLogin,
    "/clinics/:id": clinicsId,
    "/clinics/subscribe":clinicsSubscribe,

    "/patients/":patients,
    "/patients/verify":patientsVerify,
    "/patients/login/google":patientsLoginGoogle,
    "/medics/accesibility":medicsAccesibility
};