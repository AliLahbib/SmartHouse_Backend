const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraire le token du header
  console.log("debug token",token)
  if (!token) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  try {
    const decoded = jwt.verify(token, "smartHouseKey"); 
   
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};