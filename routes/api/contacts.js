const express = require('express');
const {contacts: ctrl} = require('../../controllers');
const {middlewares: srvc} = require('../../service');

const router = express.Router();

router.get('/', srvc.auth, ctrl.listContacts);
router.get('/:contactId', ctrl.getContactById);
router.post('/', srvc.auth, ctrl.addContact);
router.delete('/:contactId', ctrl.removeContact);
router.put('/:contactId', ctrl.updateContact);
router.patch('/:contactId/favorite', ctrl.updateStatusContact);

module.exports = router;