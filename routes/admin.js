const path = require('path');
const isAuth = require('./../middleware/isAuth');

const express = require('express');

const adminController = require('./../controllers/admin');

const router = express.Router();

router.get('/admin/add-card',isAuth, adminController.getAddCard);

router.post('/admin/add-card',isAuth, adminController.postAddCard);

router.get('/admin/edit-card/:cardId',isAuth, adminController.getEditCard);
router.post('/admin/edit-card/:cardId',isAuth, adminController.postEditCard);

router.get('/admin/cards',isAuth, adminController.getCards);
router.post('/admin/delete-card', isAuth, adminController.postDeleteCard);

module.exports = router;