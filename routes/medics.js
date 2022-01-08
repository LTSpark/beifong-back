const { Router } = require('express');

const PostMedicFlow = require('../apis/medic/postMedic/flow');
const PostMedicValidators = require('../apis/medic/postMedic/validators');

const SetAccesibilityFlow = require('../apis/medic/setMedicAccesibility/flow');
const SetAccesibilityValidators = require('../apis/medic/setMedicAccesibility/validators');

const router = Router();

router.post('/', PostMedicValidators,PostMedicFlow);
router.put('/accesibility', SetAccesibilityValidators,SetAccesibilityFlow)

module.exports = router;
