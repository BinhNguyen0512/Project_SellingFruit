const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, isReqestValidated, validateSigninRequest} = require('../..//validators/auth');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isReqestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isReqestValidated, signin);
router.post('/admin/signout', requireSignin, signout)

module.exports = router;