const { Router } = require('express');

const LoginMedicFlow = require('../apis/medic/loginMedic/flow');
const LoginMedicValidators = require('../apis/medic/loginMedic/validators');

const PostMedicFlow = require('../apis/medic/postMedic/flow');
const PostMedicValidators = require('../apis/medic/postMedic/validators');

const router = Router();

router.post('/', PostMedicValidators,PostMedicFlow);
router.post('/login/:clinicId', LoginMedicValidators,LoginMedicFlow);

module.exports = router;
