const jwt = require('jsonwebtoken');

const Clinic = require('../schemas/Clinic');

const clinicNameExists = async name => {
    const clinic = await Clinic.findOne({ name }).exec();
    if(clinic){
        throw new Error(`Clinic with ${name} already exists on database, select another name`);
    }
}

const clinicEmailExists = async email => {
    const clinic = await Clinic.findOne({ email }).exec();
    if(clinic){
        throw new Error(`Clinic with ${email} already exists on database, select another email`);
    }
}

const clinicIdExists = async id => {
    const clinic = await Clinic.findById(id).exec();
    if(!clinic){
        throw new Error(`Clinic with id ${id} not exists on database`);
    }
}

const alreadyVerifiedClinic = async id => {
    const clinic = await Clinic.findById(id).exec();
    if(clinic.verified){
        throw new Error(`Clinic with ${id} id is already verified on database`);
    }
}

const alreadyVerifiedClinicToken = async token => {
    const { id } = jwt.verify( token, process.env.VERIFY_KEY);
    const { verified } = await Clinic.findById(id).exec();
    if( verified ) {
        throw new Error(`Clinic with ${id} id is already verified on database`);
    }
}

module.exports = {
    clinicNameExists,
    clinicEmailExists,
    clinicIdExists,
    alreadyVerifiedClinic,
    alreadyVerifiedClinicToken
}