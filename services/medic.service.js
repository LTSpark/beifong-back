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

}

const medicService = new MedicService();

module.exports = medicService;