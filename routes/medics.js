const { Router } = require('express');

const PostMedicFlow = require('../apis/medic/postMedic/flow');
const PostMedicValidators = require('../apis/medic/postMedic/validators');

const GetMedicsFlow = require("../apis/medic/getMedics/flow");
const GetMedicsValidators = require("../apis/medic/getMedics/validator");

const GetMedicFlow = require("../apis/medic/getMedic/flow");
const GetMedicValidators = require("../apis/medic/getMedic/validator");

const router = Router();

router.post('/', PostMedicValidators,PostMedicFlow);
router.get('/', GetMedicsValidators,GetMedicsFlow);
router.get('/:id', GetMedicValidators,GetMedicFlow);

module.exports = router;
