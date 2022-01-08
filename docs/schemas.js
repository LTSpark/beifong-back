const {
  PostClinic,
  PostClinicResponse, 
  ResendEmailClinic,
  ResendEmailClinicResponse,
  TokenClinicResponse,
  LoginClinic,
  GetClinicsResponse,
  GetClinicIdResponse,
  ClinicSuscription
} = require("./schemas/Clinic");

const {
  PostPatient,
  PostPatientResponse,
  TokenPatientResponse,
  PatientGoogleLogin,
  PatientGoogleLoginResponse
} = require("./schemas/Patient");

const {
  SetMedicAccesibility,
  SetMedicAccesibilityResponse
} = require("./schemas/Medic");

module.exports = 
{
    PostClinic,
    PostClinicResponse,
    ResendEmailClinic,
    ResendEmailClinicResponse,
    TokenClinicResponse,
    LoginClinic,
    GetClinicsResponse,
    GetClinicIdResponse,
    ClinicSuscription,

    PostPatient,
    PostPatientResponse,
    TokenPatientResponse,
    PatientGoogleLogin,
    PatientGoogleLoginResponse,

    SetMedicAccesibility,
    SetMedicAccesibilityResponse
}
  




