const PatientService = require("../services/patient.service");

const uniquePatientName = async name => {
    const patient = await PatientService.findOne({ name });
    if(patient){
        throw new Error(`Patient with ${name} already exists on database, select another name`);
    }
}

const uniquePatientEmail = async email => {
    const patient = await PatientService.findOne({ email });
    if(patient) {
        throw new Error(`Patient with ${email} already exists on database, select another email`);
    }
}

const patientExists = async id => {
    const patient = await PatientService.findByID(id);
    if(!patient){
        throw new Error(`Patient with id ${id} does not exist on database`);
    }
}

module.exports = {
    uniquePatientName,
    uniquePatientEmail,
    patientExists
}