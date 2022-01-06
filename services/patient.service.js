const bcrypt = require("bcryptjs");
const Patient = require("../schemas/Patient");

const { 
    errorFactory, 
    generateJWT,
    parseSort
} = require('../utils/utils');

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

    async updatePatientById(id, data){
        await Patient.updateOne({ _id: id }, data, { runValidators: true }).exec();
    }

    async login(email, password){
        const patient = await Patient.findOne({ email }).exec();
        if(!patient){
            throw errorFactory("Patient not found", 400);
        }

        if(!bcrypt.compareSync(password, patient.password)){
            throw errorFactory("Invalid password", 401);
        }

        return generateJWT({ id: patient.id }, process.env.PATIENT_KEY, '3h');
        
    }

    async find(query, from=0, limit=5, sort="_id", order="asc") {
        const sortQuery = parseSort(sort, order);
        const [ total, patients ] = await Promise.all([
            Patient.countDocuments(query),
            Patient.find(query).skip(from).limit(limit).sort(sortQuery).exec()
        ])
        return { total, patients };
    }

}

const patientService = new PatientService();

module.exports = patientService;
