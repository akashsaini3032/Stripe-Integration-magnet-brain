const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const bodyParser = require('body-parser');

router.post(
  '/create-session',
  express.json(),
  checkoutController.createCheckoutSession
);

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    req.rawBody = req.body;
    checkoutController.handleWebhook(req, res);
  }
);

module.exports = router;
