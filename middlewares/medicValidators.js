const moment = require("moment")

const MedicService = require("../services/medic.service");
const ClinicService = require("../services/clinic.service");
const ClinicalAppointmentService = require("../services/clinicalAppointment.service");

const { customErrorResponse } = require("../utils/responses");

const medicExists = async id => {
    const medic = await MedicService.findById(id);
    if(!medic) throw new Error(`Medic with id ${id} not exists on database`);
}

const medicDniExists = async ( req, res, next ) => {

    const medic = await MedicService.findOne({
        clinic: req.clinic.id,
        dni: req.body.dni
    });

    if(medic.length != 0) return customErrorResponse(res, `Medic with DNI ${req.body.dni} already exists on ${req.clinic.name}`);
    next();

}

const medicEmailExists = async ( req, res, next ) => {

    const medic = await MedicService.findOne({
        clinic: req.clinic.id,
        email: req.body.email
    });

    if(medic.length != 0) return customErrorResponse(res, `Medic with email ${req.body.email} already exists on ${req.clinic.name}`);
    next();
    
}

const medicClinicExists = async ( req, res, next ) => {

    const { clinicId, medicId } = req.body;

    const clinic = await ClinicService.findOne({
        _id: clinicId,
        medics: {
            $in: medicId
        }
    });

    if ( !clinic ) return customErrorResponse(res, "Medic does not belong to clinic");

    const medic = await MedicService.findById( medicId );

    if ( !medic.verified ) return customErrorResponse(res, "Unverified medics cannot attend appointments");

    next();

}

const medicIsUpdated = async medicId => {

    const { 
        startAttentionTime, 
        endAttentionTime, 
        attentionTime
    } = await MedicService.findById(medicId);

    if ( !startAttentionTime && !endAttentionTime && !attentionTime ) {
        throw new Error(`Medic information is not updated, please select another`);
    }

}

const notIncomingAppointments = async ( req, res, next ) => {

    const clinicalAppointments = await ClinicalAppointmentService.getClinicalAppointmentsByMedic(req.medic.id);
    const currentDate = moment( new Date() );

    if ( clinicalAppointments.length === 0 ) return next();

    const clinicalAppointment = await clinicalAppointments.find( appointment => {
        const startAttentionDate = moment(appointment.startAttentionDate); 
        if ( startAttentionDate.isAfter(currentDate) ) return appointment;
    });

    if ( clinicalAppointment  ) return customErrorResponse(res, "Cannot update schedule while having pending appointments", 403);
    next();
    
}

module.exports = {
    medicExists,
    medicDniExists,
    medicEmailExists,
    medicClinicExists,
    medicIsUpdated,
    notIncomingAppointments
}

