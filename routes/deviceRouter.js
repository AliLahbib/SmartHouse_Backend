const express = require('express');
const deviceController = require('../controllers/deviceController');
const { verifyRole } = require('../middleware/roleMiddleware');
const {verifyToken}=   require('../middleware/authMiddleware');
const router = express.Router();

const BASE_URL = '/devices';

router.route(`${BASE_URL}`).get(verifyToken, verifyRole(["admin", "technician","user"]),deviceController.getDevices);
router.route(`${BASE_URL}`).post(verifyToken, verifyRole(["admin", "technician"]),deviceController.addDevice);
router.route(`${BASE_URL}/:id`).get(verifyToken, verifyRole(["admin", "technician"]),deviceController.getDeviceById);
router.route(`${BASE_URL}/:id`).delete(verifyToken, verifyRole(["admin", "technician"]),deviceController.deleteDevice);
router.route(`${BASE_URL}/:id`).put(verifyToken, verifyRole(["admin", "technician"]),deviceController.updateDevice);
router.route(`${BASE_URL}/:id/on`).put(verifyToken, verifyRole(["admin", "technician","user"]),deviceController.turnOnDevice);
router.route(`${BASE_URL}/:id/off`).put(verifyToken, verifyRole(["admin", "technician","user"]),deviceController.turnOffDevice);





exports.router = router;