const { Router } = require('express');

const PostClinicFlow = require('../api/clinic/postClinic/flow');
const PostClinicValidators = require('../api/clinic/postClinic/validators');

const ResendEmailClinicFlow = require('../api/clinic/resendEmailClinic/flow');
const ResendEmailClinicValidators = require('../api/clinic/resendEmailClinic/validators');

const VerifyClinicFlow = require('../api/clinic/verifyClinic/flow');
const VerifyClinicValidators = require('../api/clinic/verifyClinic/validators');

const LoginClinicFlow = require('../api/clinic/loginClinic/flow');
const LoginClinicValidators = require('../api/clinic/loginClinic/validators');

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
 *          TokenClinicResponse:
 *              type: Object
 *              properties:
 *                  ok:
 *                      type: boolean
 *                      description: indicates if operation was done correctly
 *                  msg:
 *                      type: string
 *                      description: information about operation perfomed
 *                  token:
 *                      type: string
 *              example:
 *                  ok: true
 *                  msg: Response message
 *                  token: token
 *          LoginClinic:
 *              type: Object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: clinic email
 *                  password:
 *                      type: string
 *                      description: clinic password
 *              example:
 *                  email: "test@email.com"
 *                  password: "12345"
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
router.post('/', PostClinicValidators, PostClinicFlow);

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
 *                          $ref: '#/components/schemas/TokenClinicResponse'
 *              500:
 *                  description: internal server error - invalid verification
 *              400:
 *                  description: token does not exist or is not a jwt                 
 *              
 */
router.put('/verify', VerifyClinicValidators, VerifyClinicFlow);


/**
 * @swagger
 * /clinics/login:
 *      post:
 *          summary: Token-base authentication for clinics to access the system
 *          tags: [Clinic]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginClinic'
 *          responses:
 *              200:
 *                  description: clinic auth
 *                  content:
 *                      application/json:
 *                          $ref: '#/components/schemas/TokenClinicResponse'
 *              400:
 *                  description: clinic not found, email does not exist
 *              401:
 *                  description: invalid password, access is not allowed
 *              500:
 *                  description: internal server error
 *              
 */
router.post('/login', LoginClinicValidators, LoginClinicFlow);


module.exports = router;