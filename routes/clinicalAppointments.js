const { Router } = require('express');

const GetClinicalAppointmentFlow = require('../apis/clinicalAppointment/getClinicalAppointment/flow');
const GetClinicalAppointmentValidators = require('../apis/clinicalAppointment/getClinicalAppointment/validators');

const GetClinicalAppointmentsByPatientFlow = require('../apis/clinicalAppointment/getClinicalAppointmentsByPatient/flow');
const GetClinicalAppointmentsByPatientValidators = require('../apis/clinicalAppointment/getClinicalAppointmentsByPatient/validators');

const PostClinicalAppointmentFlow = require('../apis/clinicalAppointment/postClinicalAppointment/flow');
const PostClinicalAppointmentValidators = require('../apis/clinicalAppointment/postClinicalAppointment/validators');

const router = Router();

router.post('/', PostClinicalAppointmentValidators, PostClinicalAppointmentFlow);

router.get('/:id', GetClinicalAppointmentValidators, GetClinicalAppointmentFlow);
router.get('/:patientId/patient', GetClinicalAppointmentsByPatientValidators, GetClinicalAppointmentsByPatientFlow);

module.exports = router;
