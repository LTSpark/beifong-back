const moment = require("moment");

const ClinicService = require("../services/clinic.service");
const MedicService = require("../services/medic.service");
const ClinicalAppointmentService = require("../services/clinicalAppointment.service");

const { customErrorResponse } = require("../utils/responses");

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HOUR = 0;
const MINUTE = 1;

const optionalValidateHourMinutes = (req, res, next) => {

    const startAttentionTime = req.body?.startAttentionTime;
    const endAttentionTime = req.body?.endAttentionTime;

    //if none of both is sent, then proceed normally
    if( startAttentionTime === undefined && endAttentionTime === undefined ){
        return next();
    }

    if (!startAttentionTime || !endAttentionTime) {
        return customErrorResponse(res, "If sent one attention time, both have to be sent");
    }

    const startTime = startAttentionTime.split(":");
    const endTime = endAttentionTime.split(":");

    if (startTime[HOUR] > endTime[HOUR]) {
        return customErrorResponse(res, "Start attention time hour cannot be major than end attention time one");
    }

    if ((startTime[HOUR] == endTime[HOUR]) && (startTime[MINUTE] > endTime[MINUTE])) {
        return customErrorResponse(res, "Start attention time minutes cannot be major than end attention time ones");
    }

    next();

}

const optionalValidateWeekDay = (req, res, next) => {

    const startAttentionDay = req.body?.startAttentionDay;
    const endAttentionDay = req.body?.endAttentionDay;

    //if none of both is sent, then proceed normally
    if(!startAttentionDay && !endAttentionDay){
        return next();
    }

    if (!startAttentionDay || !endAttentionDay) {
        return customErrorResponse(res, "If sent one attention day, both have to be sent");
    }

    if(weekDays.indexOf(startAttentionDay) > weekDays.indexOf(endAttentionDay)){
        return customErrorResponse(res, "Start attention day has to be before end attention day");
    }

    next();

}

const validateMedicAttentionTime = ( req, res, next ) => {

    const startAttentionTime = req.body.startAttentionTime;
    const endAttentionTime = req.body.endAttentionTime;

    if (!startAttentionTime && !endAttentionTime) {
        return customErrorResponse(res, "Both attention time have to be sent");
    }

    const startTime = startAttentionTime.split(":");
    const endTime = endAttentionTime.split(":");

    if (startTime[HOUR] > endTime[HOUR]) {
        return customErrorResponse(res, "Start attention time hour cannot be major than end attention time one");
    }

    if ((startTime[HOUR] == endTime[HOUR]) && (startTime[MINUTE] > endTime[MINUTE])) {
        return customErrorResponse(res, "Start attention time minutes cannot be major than end attention time ones");
    }

    next();

}

const validMedicAttentionTimeClinic = async ( req, res, next ) => {

    const { 
        startAttentionTime : clinicStartAttentionTime, 
        endAttentionTime: clinicEndAttentionTime 
    } = await ClinicService.findById(req.medic.clinic);

    const startTime = req.body.startAttentionTime.split(":");
    const endTime = req.body.endAttentionTime.split(":");
    const clinicStartTime = clinicStartAttentionTime.split(":");
    const clinicEndTime = clinicEndAttentionTime.split(":");

    const clinicStartHour = Number(clinicStartTime[HOUR]);
    const clinicEndHour = Number(clinicEndTime[HOUR]);
    const clinicStartMinutes = Number(clinicStartTime[MINUTE]);
    const clinicEndMinutes = Number(clinicEndTime[MINUTE]);

    const startHour = Number(startTime[HOUR]);
    const endHour = Number(endTime[HOUR]);
    const startMinutes = Number(startTime[MINUTE]);
    const endMinutes = Number(endTime[MINUTE]);
    
    if ( ( startHour < clinicStartHour ) || ( endHour > clinicEndHour ) ) {
        return customErrorResponse(res, "Hour has to be inside clinic attention time");
    }

    if( ( startHour == clinicStartHour ) && ( startMinutes < clinicStartMinutes ) ) {
        return customErrorResponse( res, "Start minute has to be between clinic attention time");
    }

    if( ( endHour == clinicEndHour ) && ( endMinutes > clinicEndMinutes ) ) {
        return customErrorResponse( res, "End minute has to be inside clinic attention time");
    } 

    next();

}

const sanitizeDate = async ( req, res, next ) => {

    const { startAttentionDate : reqStartAttentionDate, clinicId, medicId } = req.body;

    const dateString = reqStartAttentionDate.split(" ")[0];

    const currentDate = moment();
    const startAttentionDate = moment( reqStartAttentionDate );

    console.log(currentDate, startAttentionDate)

    if ( startAttentionDate.isBefore(currentDate) ) return customErrorResponse(res, "Past dates cannot be set to post Clinical Appointments");

    const { 
        startAttentionTime : clinicStartAttentionTime,
        endAttentionTime : clinicEndAttentionTime
    } = await ClinicService.findById(clinicId);

    const {
        startAttentionTime : medicStartAttentionTime,
        endAttentionTime : medicEndAttentionTime,
        attentionTime : medicAttentionTime,
        attentionCost : mount
    } = await MedicService.findById(medicId);

    const clinicStartHour = clinicStartAttentionTime.split(":")[HOUR];
    const clinicEndHour = clinicEndAttentionTime.split(":")[HOUR];
    const clinicStartMinutes = clinicStartAttentionTime.split(":")[MINUTE];
    const clinicEndMinutes = clinicEndAttentionTime.split(":")[MINUTE];

    const medicStartHour = medicStartAttentionTime.split(":")[HOUR];
    const medicEndHour = medicEndAttentionTime.split(":")[HOUR];
    const medicStartMinutes = medicStartAttentionTime.split(":")[MINUTE];
    const medicEndMinutes = medicEndAttentionTime.split(":")[MINUTE];

    const clinicStartComparisonDate = moment(`${dateString} ${clinicStartHour}:${clinicStartMinutes}:00`);
    const clinicEndComparisonDate = moment(`${dateString} ${clinicEndHour}:${clinicEndMinutes}:00`);

    const medicStartComparisonDate = moment(`${dateString} ${medicStartHour}:${medicStartMinutes}:00`);
    const medicEndComparisonDate = moment(`${dateString} ${medicEndHour}:${medicEndMinutes}:00`);

    const endAttentionDate = moment(startAttentionDate).add( Number(medicAttentionTime), 'minutes');

    if ( !startAttentionDate.isBetween(clinicStartComparisonDate, clinicEndComparisonDate) || !endAttentionDate.isBetween(clinicStartComparisonDate, clinicEndComparisonDate)) {
        return customErrorResponse(res, "Attention time has to be between clinic attention time");
    }

    if ( !startAttentionDate.isBetween(medicStartComparisonDate, medicEndComparisonDate) || !endAttentionDate.isBetween(medicStartComparisonDate, medicEndComparisonDate) ) {
        return customErrorResponse(res, "Attention time has to be between medic attention time");
    }

    req.body.startAttentionDate = startAttentionDate;
    req.body.endAttentionDate = endAttentionDate;
    req.body.mount = mount;

    next();

}

const notMedicAppointmentsOnAttentionDate = async ( req, res, next ) => {

    const { startAttentionDate, endAttentionDate, medicId } = req.body; 
    const clinicalAppointments = await ClinicalAppointmentService.getClinicalAppointmentsByMedic(medicId);

    const appointmentExists = await clinicalAppointments.find( clinicalAppointment => {
        
        let { 
            startAttentionDate: currentStartAttentionDate, 
            endAttentionDate : currentEndAttentionDate 
        } = clinicalAppointment;

        currentStartAttentionDate = moment(currentStartAttentionDate);
        currentEndAttentionDate = moment(currentEndAttentionDate);

        if ( startAttentionDate.isSame(currentStartAttentionDate)  || endAttentionDate.isSame(currentEndAttentionDate) ) {
            return clinicalAppointment;
        }

        if ( startAttentionDate.isBetween(currentStartAttentionDate, currentEndAttentionDate) || endAttentionDate.isBetween(currentStartAttentionDate, currentEndAttentionDate)){
            return clinicalAppointment;
        }

    });

    if ( appointmentExists ) return customErrorResponse(res, "Clinical Appointment currently exists on that time");

    next();

}

module.exports = {
    optionalValidateHourMinutes,
    optionalValidateWeekDay,
    validateMedicAttentionTime,
    validMedicAttentionTimeClinic,
    sanitizeDate,
    notMedicAppointmentsOnAttentionDate,
    weekDays
}