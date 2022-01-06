const bcrypt = require("bcryptjs");
const Clinic = require('../schemas/Clinic');

const { 
    errorFactory, 
    generateJWT, 
    parseSort, 
    getExpirationDate
} = require('../utils/utils');

class ClinicService {

    saveClinic(data){
        const { name, email, telephone, direction, password } = data;
        const clinic = new Clinic({
            name, email, telephone, direction, password
        });
        return clinic.save();
    }

    findOne(query){
        return Clinic.findOne(query).exec();
    }

    async findById(id, medics=false, clinicalAppointments=false){
        const clinic =  await Clinic.findById(id).exec();
        if(medics){
            await Clinic.populate(
                clinic,
                {
                    path: 'medics',
                    model: 'Medic'
                }
            );
        }
        if(clinicalAppointments){
            await Clinic.populate(
                clinic,
                {
                    path: 'clinicalAppointments',
                    model: 'ClinicalAppointment'
                }
            );
        }
        return clinic;
    }

    async updateClinicById(id, data){
        await Clinic.updateOne({ _id: id }, data, { runValidators: true }).exec();
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

    async find(query, from=0, limit=5, sort="_id", order="asc") {
        const sortQuery = parseSort(sort, order);
        const [ total, clinics ] = await Promise.all([
            Clinic.countDocuments(query),
            Clinic.find(query).skip(Number(from)).limit(Number(limit)).sort(sortQuery).exec()
        ])
        return { total, clinics };
    }

    async createPayment(clinicId, subscriptionType, mount) {
        
        const { subscriptionPaymentExpires } = await Clinic.findById(clinicId).exec();
        const expirationDate = getExpirationDate(subscriptionType, subscriptionPaymentExpires);

        await Clinic.updateOne({ _id: clinicId }, { 
            subscriptionPaymentExpires: expirationDate,
            $addToSet: {
                payments: {
                    mount,
                    subscriptionType,
                    expirationDate
                }
            }
        },{ runValidators: true }).exec();

    }

    async addSection(clinicId, section) {
        await Clinic.updateOne({ _id: clinicId }, {
            $addToSet: {
                sections: section
            }
        },{ runValidators: true }).exec();
    }

}

const clinicService = new ClinicService();

module.exports = clinicService;
