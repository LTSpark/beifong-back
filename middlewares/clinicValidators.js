const jwt = require('jsonwebtoken');

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
        throw new Error(`Clinic with ${email} already exists on database, select another name`);
    }
}

const alreadyVerifiedClinic = async token => {
    const { id } = jwt.verify( token, process.env.VERIFY_KEY);
    const { verified } = await Clinic.findById(id).exec();
    if( verified ) {
        throw new Error(`Clinic with ${id} id is already verified on database`);
    }
}

module.exports = {
    clinicNameExists,
    clinicEmailExists,
    alreadyVerifiedClinic
}