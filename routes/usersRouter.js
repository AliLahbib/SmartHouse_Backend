const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const BASE_URL = '/users';

router.route(`${BASE_URL}`).get(userController.getUsers);
router.route(BASE_URL + '/:id').get(userController.getUser);
router.route(`${BASE_URL}`).post(userController.addUser);
router.route(`${BASE_URL}/addPiece/:id`).put(userController.addPieceToUser);
router.route(`${BASE_URL}/sign-in`).post(userController.signIn);
router.route(`${BASE_URL}/:id`).put(userController.editUser);
router.route(`${BASE_URL}/reinitilizePassword`).post(userController.reinitilizePassword);
router.route(`${BASE_URL}/:id`).delete(userController.deleteUser);


exports.router = router;