const { Router } = require('express');

const PostPatientFlow = require('../apis/patient/postPatient/flow');
const PostPatientValidators = require('../apis/patient/postPatient/validators');

const router = Router();

router.post('/', PostPatientValidators, PostPatientFlow);

module.exports = router;