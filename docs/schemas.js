const {
  PostClinic,
  PostClinicResponse, 
  ResendEmailClinic,
  ResendEmailClinicResponse,
  TokenClinicResponse,
  LoginClinic,
  GetClinicsResponse,
  GetClinicIdResponse,
  ClinicSuscription,
  UpdateClinicInformation,
  UpdateClinicInformationResponse
} = require("./schemas/Clinic");

const {
  PostPatient,
  PostPatientResponse,
  TokenPatientResponse,
  PatientGoogleLogin,
  PatientGoogleLoginResponse,
  PatientLogin,
  PatientLoginResponse
} = require("./schemas/Patient");

const {
  SetMedicAccesibility,
  SetMedicAccesibilityResponse,
  TokenMedicResponse
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
    UpdateClinicInformation,
    UpdateClinicInformationResponse,

    PostPatient,
    PostPatientResponse,
    TokenPatientResponse,
    PatientGoogleLogin,
    PatientGoogleLoginResponse,
    PatientLogin,
    PatientLoginResponse, 
    PatientLoginResponse,

    SetMedicAccesibility,
    SetMedicAccesibilityResponse,
    TokenMedicResponse
}
  




