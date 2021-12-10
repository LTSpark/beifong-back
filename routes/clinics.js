const { Router } = require('express');

const postClinicFlow = require('../api/clinic/postClinic/flow');
const postClinicValidators = require('../api/clinic/postClinic/validators');

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          PostClinic:
 *              type: Object
 *              required:
 *                  - name
 *                  - email
 *                  - password
 *                  - direction
 *                  - telephone
 *              properties:
 *                  name:
 *                      type: string
 *                      description: clinic name
 *                  email:
 *                      type: string
 *                      description: clinic email
 *                  password:
 *                      type: string
 *                      description: password to access beifong
 *                  direction:
 *                      type: string
 *                      description: clinic direction
 *                  telephone:
 *                      type: string
 *                      description: clinic telephone
 *              example:
 *                  name: clinica
 *                  email: clinica@test.com
 *                  password: Contraseña123
 *                  direction: Av. Las Palmeras 196 Los Olivos
 *                  telephone: 999999999
 */

/**
 * @swagger
 * /clinics:
 *      post:
 *          summary: Creates a new clinic
 *          tags: [Clinic]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PostClinic'
 *          responses:
 *              201:
 *                  description: Creates a new clinic and sends verification email
 *              400:
 *                  description: Name already exists, email already exists, invalid password, etc
 *              500:
 *                  description: Internal server error - Failed database connection
*/
router.post('/', postClinicValidators, postClinicFlow);

module.exports = router;