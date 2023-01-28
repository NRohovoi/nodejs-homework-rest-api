const express = require('express');
const {users: ctrl} = require('../../controllers');
const {middlewares: srvc} = require('../../service');

const router = express.Router();

router.get('/verify/:verificationToken', ctrl.verificationToken);
router.post('/verify', ctrl.resendingMsg);
router.get('/current', srvc.auth, ctrl.getCurrent);
router.patch('/', srvc.auth, ctrl.updateSubscription);
router.patch('/avatars', srvc.auth, srvc.upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;