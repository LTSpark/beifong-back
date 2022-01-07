const { Router } = require('express');

const LoginMedicFlow = require('../apis/medic/loginMedic/flow');
const LoginMedicValidators = require('../apis/medic/loginMedic/validators');

const PostMedicFlow = require('../apis/medic/postMedic/flow');
const PostMedicValidators = require('../apis/medic/postMedic/validators');

const GetMedicsFlow = require("../apis/medic/getMedics/flow");
const GetMedicsValidators = require("../apis/medic/getMedics/validator");

const GetMedicFlow = require("../apis/medic/getMedic/flow");
const GetMedicValidators = require("../apis/medic/getMedic/validator");

const router = Router();

router.post('/', PostMedicValidators,PostMedicFlow);
router.post('/login/:clinicId', LoginMedicValidators,LoginMedicFlow);

router.get('/', GetMedicsValidators,GetMedicsFlow);
router.get('/:id', GetMedicValidators,GetMedicFlow);

module.exports = router;
