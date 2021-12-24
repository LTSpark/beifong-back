const Patient = require("../schemas/Patient");

class PatientService {

    savePatient(data, google=false){
        const { name, email, password } = data;

        const patient = new Patient({
            name, email, password
        });

        return patient.save();
    }

    saveGoogle(name, email, img){
        const patient = new Patient({
            name,
            email,
            img,
            verified : true,
            google : true,
            password : process.env.DEFAULT_GOOGLE_PASSWORD
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

    async updateOneById(id, data){
        await Patient.updateOne({ _id: id }, data, { runValidators: true }).exec();
    }
}

const patientService = new PatientService();

module.exports = patientService;
