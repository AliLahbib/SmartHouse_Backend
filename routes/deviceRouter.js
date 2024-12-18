const express = require('express');
const deviceController = require('../controllers/deviceController');
const router = express.Router();

const BASE_URL = '/devices';

router.route(`${BASE_URL}`).get(deviceController.getDevices);
router.route(`${BASE_URL}`).post(deviceController.addDevice);
router.route(`${BASE_URL}/:id`).get(deviceController.getDeviceById);
router.route(`${BASE_URL}/:id`).delete(deviceController.deleteDevice);
router.route(`${BASE_URL}/:id`).put(deviceController.updateDevice);
router.route(`${BASE_URL}/:id/on`).put(deviceController.turnOnDevice);
router.route(`${BASE_URL}/:id/off`).put(deviceController.turnOffDevice);





exports.router = router;