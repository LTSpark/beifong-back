const express = require('express');
const router  = express.Router();

const clinics = require('./clinics');

/**
 * @swagger
 * tags:
 *    name: Clinic
 *    description: API to manage clinic operations
*/
router.use('/clinics', clinics);

//The 404 Route (ALWAYS Keep this as the last route)
router.use('*', (_, res) => {
    res.status(404).send('Resource not found: Error 404');
});

module.exports = router;