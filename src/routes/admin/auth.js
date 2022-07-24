const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupRequest, isReqestValidated, validateSigninRequest} = require('../..//validators/auth')
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isReqestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isReqestValidated, signin);

module.exports = router;