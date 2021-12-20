const bcrypt = require("bcryptjs");
const Clinic = require('../schemas/Clinic');

const { errorFactory, generateJWT } = require('../utils/utils');

class ClinicService {

    saveClinic(data){
        const { name, email, telephone, direction, password } = data;
        const clinic = new Clinic({
            name, email, telephone, direction, password
        });
        return clinic.save();
    }

    findOne(query){
        return Clinic.findOne(query);
    }

    findById(id){
        return Clinic.findById(id);
    }

    async updateClinicById(id, data){
        await Clinic.updateOne({ _id: id }, data).exec();
    }

    async login(email, password){
        const clinic = await Clinic.findOne({ email }).exec();
        if(!clinic){
            throw errorFactory("Clinic not found", 400);
        }

        if(!bcrypt.compareSync(password, clinic.password)){
            throw errorFactory("Invalid password", 401);
        }

        return generateJWT({ id: clinic.id }, process.env.CLINIC_KEY, '3h');
        
    }

}

const clinicService = new ClinicService();

module.exports = clinicService;