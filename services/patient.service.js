const Patient = require("../schemas/Patient");

class PatientService {

    savePatient(data){
        const { name, email, password } = data;
        const patient = new Patient({
            name, email, password
        });
        return patient.save();
    }

    async findByID(id, clinicalAppointments = false){
        const patient = await Patient.findById(id).exec();
        if(clinicalAppointments){
            await Patient.populate(
                patient,
                {
                    path: 'clinicalAppointments',
                    model: 'ClinicalAppointment'
                }
            );
        }
        return patient;
    }

    findOne(query){
        return Patient.findOne(query).exec();
    }
}

const patientService = new PatientService();

module.exports = patientService;
