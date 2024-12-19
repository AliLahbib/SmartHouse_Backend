const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const BASE_URL = '/auth';
router.route(`${BASE_URL}/login`).post(userController.login);
router.route(`${BASE_URL}/logout`).post(userController.logout);

exports.router=router;