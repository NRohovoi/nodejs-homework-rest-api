const express = require('express');
const {auth: ctrl} = require('../../controllers');
const {middlewares: srvc} = require('../../service');

const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout', srvc.auth, ctrl.logout);

module.exports = router;
