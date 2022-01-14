const { Router } = require('express');

const GetClinicalAppointmentFlow = require('../apis/clinicalAppointment/getClinicalAppointment/flow');
const GetClinicalAppointmentValidators = require('../apis/clinicalAppointment/getClinicalAppointment/validators');

const PostClinicalAppointmentFlow = require('../apis/clinicalAppointment/postClinicalAppointment/flow');
const PostClinicalAppointmentValidators = require('../apis/clinicalAppointment/postClinicalAppointment/validators');

const router = Router();

router.post('/', PostClinicalAppointmentValidators, PostClinicalAppointmentFlow);
router.get('/:id', GetClinicalAppointmentValidators,GetClinicalAppointmentFlow);

module.exports = router;
