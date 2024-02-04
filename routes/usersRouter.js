const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const BASE_URL = '/users';

router.route(`${BASE_URL}`).get(userController.getUsers);
router.route(`${BASE_URL}/sign-up`).post(userController.addUser);
router.route(`${BASE_URL}/sign-in`).post(userController.signIn);
router.route(`${BASE_URL}/update/:id`).post(userController.editUser);

exports.router = router;