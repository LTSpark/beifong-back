const { Router } = require('express');

const GetPatientFlow = require('../apis/patient/getPatient/flow');
const GetPatientValidators = require('../apis/patient/getPatient/validators');

const LoginGooglePatientFlow = require('../apis/patient/loginGooglePatient/flow');
const LoginGooglePatientValidators = require('../apis/patient/loginGooglePatient/validators');

const LoginPatientFlow = require('../apis/patient/loginPatient/flow');
const LoginPatientValidators = require('../apis/patient/loginPatient/validators');

const PostPatientFlow = require('../apis/patient/postPatient/flow');
const PostPatientValidators = require('../apis/patient/postPatient/validators');

const SetPatientAccesibilityFlow = require('../apis/patient/setPatientAccesibility/flow');
const SetPatientAccesibilityValidators = require('../apis/patient/setPatientAccesibility/validators');

const VerifyPatientFlow = require('../apis/patient/verifyPatient/flow');
const VerifyPatientValidators = require('../apis/patient/verifyPatient/validators');

const router = Router();

router.post('/', PostPatientValidators, PostPatientFlow);

router.post('/login', LoginPatientValidators, LoginPatientFlow);
router.post('/login/google', LoginGooglePatientValidators, LoginGooglePatientFlow);

router.get('/:id', GetPatientValidators,GetPatientFlow);

router.put('/verify', VerifyPatientValidators, VerifyPatientFlow);
router.put('/accesibility', SetPatientAccesibilityValidators ,SetPatientAccesibilityFlow)

module.exports = router;
