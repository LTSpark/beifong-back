const { Router } = require('express');

const PostClinicFlow = require('../apis/clinic/postClinic/flow');
const PostClinicValidators = require('../apis/clinic/postClinic/validators');

const ResendEmailClinicFlow = require('../apis/clinic/resendEmailClinic/flow');
const ResendEmailClinicValidators = require('../apis/clinic/resendEmailClinic/validators');

const VerifyClinicFlow = require('../apis/clinic/verifyClinic/flow');
const VerifyClinicValidators = require('../apis/clinic/verifyClinic/validators');

const LoginClinicFlow = require('../apis/clinic/loginClinic/flow');
const LoginClinicValidators = require('../apis/clinic/loginClinic/validators');

const GetClinicFlow = require('../apis/clinic/getClinic/flow');
const GetClinicValidators = require('../apis/clinic/getClinic/validators');

const router = Router();

router.post('/', PostClinicValidators, PostClinicFlow);
router.post('/resend', ResendEmailClinicValidators, ResendEmailClinicFlow);
router.put('/verify', VerifyClinicValidators, VerifyClinicFlow);
router.post('/login', LoginClinicValidators, LoginClinicFlow);
router.get('/:id', GetClinicValidators, GetClinicFlow);


module.exports = router;