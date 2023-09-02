const path = require('path');

const express = require('express');

const dashController = require('./../controllers/dashboard');

const router = express.Router();

router.get('/cards/:cardId', dashController.getCardDetails);

router.get('/add-card', dashController.getAddCard);

router.post('/add-card', dashController.postAddCard);

router.get('/edit-card/:cardId', dashController.getEditCard);
router.post('/edit-card/:cardId', dashController.postEditCard);

router.get('/', dashController.getCards);

module.exports = router;