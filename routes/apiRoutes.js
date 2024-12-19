const express = require("express");
const  verifyToken  = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");
const deviceController = require("../controllers/deviceController");
const pieceController = require("../controllers/pieceController");

const router = express.Router();

// Routes pour l'admin
router.get("/users", verifyToken, verifyRole(["admin"]), userController.getUsers);
router.post("/users", verifyToken, verifyRole(["admin"]), userController.createUser);

// Routes pour les techniciens
router.get("/devices", verifyToken, verifyRole(["admin", "technicien"]), deviceController.getDevices);

// Routes pour tous les utilisateurs
router.get("/pieces", verifyToken, verifyRole(["admin", "technicien", "user"]), pieceController.getPieces);

module.exports = router;
