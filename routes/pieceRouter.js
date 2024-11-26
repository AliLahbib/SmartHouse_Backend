const express = require('express');
const pieceController = require('../controllers/pieceController');
const router = express.Router();

const BASE_URL = '/pieces';

router.route(`${BASE_URL}`).get(pieceController.getPieces);
router.route(`${BASE_URL}/piecesByUser/:id`).get(pieceController.getPiecesByUser);
router.route(`${BASE_URL}`).post(pieceController.addPiece);
router.route(`${BASE_URL}/:id`).get(pieceController.getPieceById);
router.route(`${BASE_URL}/:id`).delete(pieceController.deletePiece);
router.route(`${BASE_URL}/:id`).put(pieceController.updatePiece);
router.route(`${BASE_URL}/addDeviceToPiece/:id`).post(pieceController.addDeviceToPiece);
router.route(`${BASE_URL}/addPieceToUser/:id`).put(pieceController.addPieceToUser);




exports.router = router;