const {jwt} = require("jsonwebtoken");
const { userServices } = require("../services/userServices");


exports.login = async (req, res) => {
    
  const { email, password } = req.body;
  try{

  const user = await userServices.signIn(email, password);
  res.status(200).json(user);

  

  } catch (error) {
    res.status(500).json({ message: error, error });
  }
};


exports.logout = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};

