const bcrypt = require("bcryptjs");

const Medic = require("../schemas/Medic");
const { encryptPassword } = require("../utils/utils");

class MedicService {

    saveMedic(clinic, data, img){

        const {
            name, surname, email, specialty, dni, attentionCost
        } = data;

        const password = encryptPassword(data.password);

        const medic = new Medic({
            name, surname, email, specialty, dni, attentionCost, img, password, clinic
        });

        return medic.save();
    }

    findOne(query){
        return Medic.find(query).exec();
    }

    updateMedicById(id, data){
        Medic.updateOne({ _id: id }, data, { runValidators: true }).exec();
    }

    async findById(medicId, clinic=false, clinicalAppointments=false){
        const medic = await Medic.findById(medicId).exec();
        if(clinic){
            await Medic.populate(
                medic,
                {
                    path: 'clinic',
                    model: 'Clinic'
                }
            );
        }
        if(clinicalAppointments){
            await Medic.populate(
                medic,
                {
                    path: 'clinicalAppointments',
                    model: 'ClinicalAppointment'
                }
            );
        }
        return medic;
    }

    async find(query, from=0, limit=5, sort="_id", order="asc") {
        const sortQuery = parseSort(sort, order);
        const [ total, medics ] = await Promise.all([
            Medic.countDocuments(query),
            Medic.find(query).skip(Number(from)).limit(Number(limit)).sort(sortQuery).exec()
        ]);
        return { total, medics };
    }

}

const medicService = new MedicService();

module.exports = medicService;