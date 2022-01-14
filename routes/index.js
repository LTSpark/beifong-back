const express = require('express');
const router  = express.Router();

const clinics = require('./clinics');
const patients = require('./patients');
const medics = require('./medics');
const clinicalAppointments = require('./clinicalAppointments');

router.use('/clinics', clinics);
router.use('/patients', patients);
router.use('/medics', medics);
router.use('/clinicalAppointments', clinicalAppointments);

//The 404 Route (ALWAYS Keep this as the last route)
router.use('*', (_, res) => {
    res.status(404).send('Resource not found: Error 404');
});

module.exports = router;
