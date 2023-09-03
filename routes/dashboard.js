const path = require('path');
const isAuth = require('./../middleware/isAuth');

const express = require('express');

const dashController = require('./../controllers/dashboard');

const router = express.Router();

router.get('/cards/:cardId', dashController.getCardDetails);

router.get('/', dashController.getCards);

module.exports = router;