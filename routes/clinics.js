const { Router } = require('express');

const postClinicFlow = require('../api/clinic/postClinic/flow');
const postClinicValidators = require('../api/clinic/postClinic/validators');

const router = Router();

router.post('/', postClinicValidators, postClinicFlow);


module.exports = router;