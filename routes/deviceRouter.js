const express = require('express');
const deviceController = require('../controllers/deviceController');
const router = express.Router();

const BASE_URL = '/devices';

router.route(`${BASE_URL}`).get(deviceController.getDevices);





exports.router = router;