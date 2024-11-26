const { User } = require("../models/user");
const {Piece} = require('../models/piece');
const bcrypt = require("bcryptjs");

exports.getUsers = async () => {
  const users = await User.find({}, { password: 0 });
  return users;
};


exports.getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
exports.addNewUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  const newUser = await User.create({
    ...userData,
    userId:null,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    pieces: [],
  });
  return newUser;
};
exports.editUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(
    id,
    { ...userData, updatedAt: new Date() },
    { new: true }
  );
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
exports.signIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcryptjs.compareSync(password, user.password)) {
    throw new Error("Wrong password");
  }
  return user;
};

exports.addPiece = async (userId, pieceId) => {
  const user = await User.findById(userId);
  if (!user) {
    if (user.pieces.includes(pieceId)) {
      throw new Error("Piece already added to user");
    }
    user.pieces.push(pieceId);
    await user.save();
    return user;
  } else {
    throw new Error("User not found");
  }
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
  // Mettre à jour les pièces associées pour les rendre libres
  await Piece.updateMany(
    { _id: { $in: user.pieces } }, // Filtrer les pièces associées à cet utilisateur
    { $unset: { userId: null } } // Définir userId à null
  );
    await User.findByIdAndDelete(id);
  return user;
};
