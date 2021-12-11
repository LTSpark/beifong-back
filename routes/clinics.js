const { Router } = require('express');

const postClinicFlow = require('../api/clinic/postClinic/flow');
const postClinicValidators = require('../api/clinic/postClinic/validators');

const ResendEmailClinicFlow = require('../api/clinic/resendEmailClinic/flow');
const ResendEmailClinicValidators = require('../api/clinic/resendEmailClinic/validators');

const VerifyClinicFlow = require('../api/clinic/verifyClinic/flow');
const VerifyClinicValidators = require('../api/clinic/verifyClinic/validators');

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
 *          PostClinicResponse:
 *              type: Object
 *              properties:
 *                  ok:
 *                      type: boolean
 *                      description: indicates if operation was done correctly
 *                  msg:
 *                      type: string
 *                      description: information about operation perfomed
 *                  clinicId:
 *                      type: string
 *                      description: database id of created clinic
 *              example:
 *                  ok: true
 *                  msg: Clinic creation done! Please check your email
 *                  clinicId: 61b2b2df969e14057e3837dc
 * 
 *          ResendEmailClinic:
 *              type: Object
 *              required:
 *                  - clinicId
 *              properties:
 *                  clinicId:
 *                      type: string
 *                      description: clinic id
 *              example:
 *                  clinicId: 61b2b2df969e14057e3837dc
 *          ResendEmailClinicResponse:
 *              type: Object
 *              properties:
 *                  ok:
 *                      type: boolean
 *                      description: indicates if operation was done correctly
 *                  msg:
 *                      type: string
 *                      description: information about operation perfomed
 *                  clinicId:
 *                      type: string
 *                      description: database id of created clinic
 *              example:
 *                  ok: true
 *                  msg: Clinic creation message resend! Please check your email
 *                  clinicId: 61b2b2df969e14057e3837dc
 * 
 *          VerifyClinicResponse:
 *              type: Object
 *              properties:
 *                  ok:
 *                      type: boolean
 *                      description: indicates if operation was done correctly
 *                  msg:
 *                      type: string
 *                      description: information about operation perfomed
 *              example:
 *                  ok: true
 *                  msg: Clinic verified!
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
 *                  content:
 *                      application/json:
 *                          $ref: '#/components/schemas/PostClinicResponse'
 *              400:
 *                  description: Name already exists, email already exists, invalid password, etc
 *              500:
 *                  description: Internal server error - Failed database connection
*/
router.post('/', postClinicValidators, postClinicFlow);

/**
 * @swagger
 * /clinics/resend:
 *      post:
 *          summary: Resend the confirmation email
 *          tags: [Clinic]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResendEmailClinic'
 *          responses:
 *              201:
 *                  description: Resends another email to the clinicId provided
 *                  content: 
 *                      application/json:
 *                          $ref: '#/components/schemas/ResendEmailClinicResponse'
 */
 router.post('/resend', ResendEmailClinicValidators, ResendEmailClinicFlow);


/**
 * @swagger
 * /clinics/verify:
 *      put:
 *          summary: Token-based verification for clinic accounts
 *          tags: [Clinic]
 *          parameters:
 *                - in: query
 *                  name: token
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: verification token
 *          responses:
 *              200:
 *                  description: clinic account verified
 *                  content:
 *                      application/json:
 *                          $ref: '#/components/schemas/VerifyClinicResponse'
 *              500:
 *                  description: internal server error - invalid verification
 *              400:
 *                  description: token does not exist or is not a jwt                 
 *              
 */
router.put('/verify', VerifyClinicValidators, VerifyClinicFlow);


module.exports = router;