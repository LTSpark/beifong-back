const Clinic = require('../schemas/Clinic');

const clinicNameExists = async name => {
    const clinicNameExists = await Clinic.findOne({ name }).exec();
    if(clinicNameExists){
        throw new Error(`Clinic with ${name} already exists on database, select another name`);
    }
}

const clinicEmailExists = async email => {
    const clinicEmailExists = await Clinic.findOne({ email }).exec();
    if(clinicEmailExists){
        throw new Error(`Clinic with ${email} already exists on database, select another email`);
    }
}

const clinicIdExists = async id => {
    const clinicIdExists = await Clinic.findById(id).exec();
    if(!clinicIdExists){
        throw new Error(`Clinic with id ${id} not exists on database`);
    }
}

module.exports = {
    clinicNameExists,
    clinicEmailExists,
    clinicIdExists
}