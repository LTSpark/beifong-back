const { Router } = require('express');

const router = Router();

const GetClinicFlow = require('../api/clinic/getClinic/flow');
const GetClinicValidators = require('../api/clinic/getClinic/validators');

router.get('/getClinic', GetClinicValidators, GetClinicFlow);


module.exports = router;