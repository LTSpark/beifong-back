const { Router } = require('express');

const PostPatientFlow = require('../apis/patient/postPatient/flow');
const PostPatientValidators = require('../apis/patient/postPatient/validators');

const VerifyPatientFlow = require('../apis/patient/verifyPatient/flow');
const VerifyPatientValidators = require('../apis/patient/verifyPatient/validators');

const router = Router();

router.post('/', PostPatientValidators, PostPatientFlow);
router.put('/verify', VerifyPatientValidators, VerifyPatientFlow);

module.exports = router;
