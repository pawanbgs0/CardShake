const path = require('path');
const isAuth = require('./../middleware/isAuth');

const express = require('express');

const dashController = require('./../controllers/dashboard');

const router = express.Router();

router.get('/cards/:cardId', dashController.getCardDetails);

router.get('/add-card',isAuth, dashController.getAddCard);

router.post('/add-card',isAuth, dashController.postAddCard);

router.get('/edit-card/:cardId',isAuth, dashController.getEditCard);
router.post('/edit-card/:cardId',isAuth, dashController.postEditCard);

router.get('/', dashController.getCards);

module.exports = router;