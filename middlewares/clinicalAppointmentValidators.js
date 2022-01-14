const ClinicalAppointmentService = require("../services/clinicalAppointment.service");

const clinicalAppointmentExists = async id => {

    const clinicalAppointment = await ClinicalAppointmentService.findById(id);
    if ( !clinicalAppointment ) {
        throw new Error(`Clinical Appointment with id ${id} does not exist on database`);
    }

}

module.exports = {
    clinicalAppointmentExists
}