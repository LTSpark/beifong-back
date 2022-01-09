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

module.exports = {
    optionalValidateHourMinutes,
    optionalValidateWeekDay,
    validateMedicAttentionTime,
    weekDays
}