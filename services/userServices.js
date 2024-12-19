const { User } = require("../models/user");
const {Piece} = require('../models/piece');
const pieceService = require('./pieceServices');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.getUsers = async () => {
  const users = await User.find({}, { password: 0 }).populate("pieces");
  
  return users;
};


exports.getUser = async (id) => {
  const user = await User.findById(id).populate("pieces");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
exports.addNewUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  userData.pieces = userData.pieces || [];
  console.log("debug user from user services : " + userData);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    
  });

  if (userData.pieces && userData.pieces.length > 0) {
    await Piece.updateMany(
      { _id: { $in: userData.pieces } },
      { $addToSet: { users: newUser._id } },      
    );
  }
  return newUser; 
};
exports.editUser = async (id, userData) => {
  delete userData.password;
  


  const existingUser = await User.findById(id).populate("pieces");
  
  if (!existingUser) {
    console.log("not found")
    throw new Error("User not found");
  }
  

  const oldPieces = existingUser.pieces.map(piece => piece._id.toString()); 
  console.log("debug user from user services : " + existingUser);
  const newPieces = userData.pieces || []; 

  console.log("Anciennes pièces : ", oldPieces);
  console.log("Nouvelles pièces : ", newPieces);

  
  const user = await User.findByIdAndUpdate(
    id,
    { ...userData, updatedAt: new Date() },
    { new: true }
  );

  // 3. Retirer l'utilisateur des anciennes pièces non sélectionnées
  const piecesToRemove = oldPieces.filter(pieceId => !newPieces.includes(pieceId));
  if (piecesToRemove.length > 0) {
    console.log("Retirer des pièces : ", piecesToRemove);
    await Piece.updateMany(
      { _id: { $in: piecesToRemove } },
      { $pull: { users: id } } // Retirer l'utilisateur
    );
  }

  // 4. Ajouter l'utilisateur aux nouvelles pièces sélectionnées
  const piecesToAdd = newPieces.filter(pieceId => !oldPieces.includes(pieceId));
  if (piecesToAdd.length > 0) {
    console.log("Ajouter aux pièces : ", piecesToAdd);
    await Piece.updateMany(
      { _id: { $in: piecesToAdd } },
      { $addToSet: { users: id } } // Ajouter l'utilisateur
    );
  }

  return user;



  // try {
  //   const userId = req.params.id;
  //   const { password, ...otherData } = userData; // Extraire le mot de passe et autres champs

  //   const updateData = { ...otherData };

  //   // Si le mot de passe est fourni et non vide, on le hache et l'ajoute aux données
  //   if (password) {
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);
  //     updateData.password = hashedPassword;
  //   }

  //   // Mise à jour de l'utilisateur
  //   const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

  //   res.json(updatedUser);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
  // }
};
exports.signIn = async (email, password) => {
  const user = await User.findOne({ email }).populate("pieces");
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Wrong password");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "smartHouseKey", {
    expiresIn: "1d",
  });

  return {user,token};
};

exports.addPieceToUser = async (userId, pieceId) => {
  const user = await User.findById(userId).populate("pieces");
  if (!user) {
    throw new Error("User not found");
  }
  const piece = await Piece.findById(pieceId).populate("users");
  if (!piece) {
    throw new Error("Piece not found");
  }
  console.log("debug:  user and piece found");
  if (user.pieces.includes(pieceId)&& piece.users.includes(userId)) {
    throw new Error("Piece already added to user");
  }
  piece.users.push(userId);
  user.pieces.push(pieceId);
  await piece.save();
  user = await user.save();

  console.log("debug:  user and piece saved");
  
  return user;
};

exports.reinitilizePassword = async (email, newPass) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = bcrypt.hashSync(newPass, 12);
  user.password = hashedPassword; // Mise à jour sans double-hachage
  await user.save();
  return user;
};

exports.deleteUser = async (id) => {
    console.log("debug delete user from services");
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  await Piece.updateMany(
    { _id: { $in: user.pieces } },
    { $pull: { users: id } } 
  );
    await User.findByIdAndDelete(id);
  return user;
};



exports.getUsersByPiece=async (pieceId)=>{
    const piece = await Piece.findById(pieceId);
    if (!user) {
      throw new Error("User not found");
    }
    const users = await User.find({ _id: { $in: piece.users } });
    return users;
}
