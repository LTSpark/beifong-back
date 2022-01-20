const ClinicService = require('../services/clinic.service');
const { getJWTPayload } = require('../utils/utils');

const uniqueClinicName = async name => {
    const clinic = await ClinicService.findOne({ name });
    if(clinic){
        throw new Error(`Clinic with ${name} already exists on database, select another name`);
    }
}

const uniqueClinicEmail = async email => {
    const clinic = await ClinicService.findOne({ email });
    if(clinic){
        throw new Error(`Clinic with ${email} already exists on database, select another email`);
    }
}

const clinicExists = async id => {
    const clinic = await ClinicService.findById(id);
    if(!clinic){
        throw new Error(`Clinic with id ${id} not exists on database`);
    }
}

const alreadyVerifiedClinic = async id => {
    const clinic = await ClinicService.findById(id);
    if(clinic.verified){
        throw new Error(`Clinic with ${id} id is already verified on database`);
    }
}

const alreadyVerifiedClinicToken = async token => {
    const { id } = getJWTPayload(token, process.env.VERIFY_KEY);
    const { verified } = await ClinicService.findById(id);
    if( verified ) {
        throw new Error(`Clinic with ${id} id is already verified on database`);
    }
}

const clinicEmailExists = async email => {
    const clinic = await ClinicService.findOne({ email });
    if(!clinic){
        throw new Error(`Clinic not found`);
    }
}

const clinicInformationIsUpdated = async clinicId => {
    const clinic = await ClinicService.findById(clinicId);
    if ( clinic.attentionDays.length == 0 && !clinic.startAttentionTime && !clinic.endAttentionTime ) {
        throw new Error(`Clinic attention times are not updated yet`);
    }
}

module.exports = {
    uniqueClinicName,
    uniqueClinicEmail,
    clinicExists,
    alreadyVerifiedClinic,
    alreadyVerifiedClinicToken,
    clinicEmailExists,
    clinicInformationIsUpdated
}