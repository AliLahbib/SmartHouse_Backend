const express = require('express');
const pieceController = require('../controllers/pieceController');
const router = express.Router();
const { verifyRole } = require('../middleware/roleMiddleware');
const {verifyToken}=   require('../middleware/authMiddleware');

const BASE_URL = '/pieces';

router.route(`${BASE_URL}`).get(verifyToken, verifyRole(["admin", "technician", "user"]),pieceController.getPieces);
router.route(`${BASE_URL}`).post(verifyToken, verifyRole(["admin"]),pieceController.addPiece);
router.route(`${BASE_URL}/:id`).get(verifyToken, verifyRole(["admin"]),pieceController.getPieceById);
router.route(`${BASE_URL}/:id`).delete(verifyToken, verifyRole(["admin"]),pieceController.deletePiece);
router.route(`${BASE_URL}/:id`).put(verifyToken, verifyRole(["admin"]),pieceController.updatePiece);
// router.route(`${BASE_URL}/addDeviceToPiece/:id`).post(pieceController.addDeviceToPiece);
// router.route(`${BASE_URL}/addPieceToUser/:id`).put(pieceController.addPieceToUser);
// router.route(`${BASE_URL}/piecesByUser/:id`).get(pieceController.getPiecesByUser);



exports.router = router;    