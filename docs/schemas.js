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
    UpdateClinicInformation,
    UpdateClinicInformationResponse,

    PostPatient,
    PostPatientResponse,
    TokenPatientResponse,
    PatientGoogleLogin,
    PatientGoogleLoginResponse,
    PatientLogin,
    PatientLoginResponse,
    
    SetMedicAccesibility,
    SetMedicAccesibilityResponse
}
  




