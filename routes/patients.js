const { Router } = require('express');

const LoginGooglePatientFlow = require('../apis/patient/loginGooglePatient/flow');
const LoginGooglePatientValidators = require('../apis/patient/loginGooglePatient/validators');

const LoginPatientFlow = require('../apis/patient/loginPatient/flow');
const LoginPatientValidators = require('../apis/patient/loginPatient/validators');

const PostPatientFlow = require('../apis/patient/postPatient/flow');
const PostPatientValidators = require('../apis/patient/postPatient/validators');

const VerifyPatientFlow = require('../apis/patient/verifyPatient/flow');
const VerifyPatientValidators = require('../apis/patient/verifyPatient/validators');

const router = Router();

router.post('/', PostPatientValidators, PostPatientFlow);

router.post('/login', LoginPatientValidators, LoginPatientFlow);
router.post('/login/google', LoginGooglePatientValidators, LoginGooglePatientFlow);

router.put('/verify', VerifyPatientValidators, VerifyPatientFlow);

module.exports = router;
