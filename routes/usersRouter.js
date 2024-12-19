const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { verifyRole } = require('../middleware/roleMiddleware');
const {verifyToken}=   require('../middleware/authMiddleware');

const BASE_URL = '/users';

router.route(`${BASE_URL}`).get(verifyToken, verifyRole(["admin"]),userController.getUsers);
router.route(`${BASE_URL}/:id`).get(verifyToken, verifyRole(["admin"]),userController.getUser);
router.route(`${BASE_URL}`).post(verifyToken, verifyRole(["admin"]),userController.addUser);
router.route(`${BASE_URL}/addPiece/:id`).put(verifyToken, verifyRole(["admin"]),userController.addPieceToUser);
router.route(`${BASE_URL}/:id`).put(verifyToken, verifyRole(["admin"]),userController.editUser);
router.route(`${BASE_URL}/reinitilizePassword`).post(verifyToken, verifyRole(["admin"]),userController.reinitilizePassword);
router.route(`${BASE_URL}/:id`).delete(verifyToken, verifyRole(["admin"]),userController.deleteUser);


exports.router = router;