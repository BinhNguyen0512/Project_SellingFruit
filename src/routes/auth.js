const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isReqestValidated, validateSigninRequest} = require('../validators/auth')
const router = express.Router();

router.post('/signup', validateSignupRequest, isReqestValidated, signup);
router.post('/signin', validateSigninRequest, isReqestValidated, signin);


module.exports = router;