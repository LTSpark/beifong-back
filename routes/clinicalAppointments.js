const { Router } = require('express');

const PostClinicalAppointmentFlow = require('../apis/clinicalAppointment/postClinicalAppointment/flow');
const PostClinicalAppointmentValidators = require('../apis/clinicalAppointment/postClinicalAppointment/validators');

const router = Router();

router.post('/', PostClinicalAppointmentValidators, PostClinicalAppointmentFlow);

module.exports = router;
