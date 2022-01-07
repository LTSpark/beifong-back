const { Router } = require('express');

const PostMedicFlow = require('../apis/medic/postMedic/flow');
const PostMedicValidators = require('../apis/medic/postMedic/validators');

const router = Router();

router.post('/', PostMedicValidators,PostMedicFlow);

module.exports = router;
