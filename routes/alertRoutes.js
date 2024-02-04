const express = require('express');
const alertController = require('../controllers/alertController');
const router = express.Router();

const BASE_URL = '/alerts';

router.route(`${BASE_URL}/add`).post(alertController.addAlert);

exports.router = router;