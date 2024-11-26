const { User } = require("../models/user");
const {Piece} = require('../models/piece');
const pieceService = require('./pieceServices');
const bcrypt = require("bcryptjs");

exports.getUsers = async () => {
  const users = await User.find({}, { password: 0 });
  const usersWithPieces = await Promise.all(
    users.map(async (user) => {
      const listPieces = await Piece.find({ _id: { $in: user.pieces } });
      return { ...user.toObject(), listPieces }; // Convertir en objet JS et ajouter listPieces
    })
  );
  return usersWithPieces;
};


exports.getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  let listPieces =  await Piece.find({ _id: { $in: user.pieces } });
  return { ...user.toObject(), listPieces };
}
exports.addNewUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    pieces: [],
  });
  return { ...newUser.toObject(), listPieces: [] }; // Convertir en objet JS et ajouter listPieces newUser;
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
  let listPieces =  await Piece.find({ _id: { $in: user.pieces } });
  return { ...user.toObject(), listPieces };
};
exports.signIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcryptjs.compareSync(password, user.password)) {
    throw new Error("Wrong password");
  }
  let listPieces =  await Piece.find({ _id: { $in: user.pieces } });
  return { ...user.toObject(), listPieces };
};

exports.addPieceToUser = async (userId, pieceId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const piece = await Piece.findById(pieceId);
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
  
  let listPieces = await Piece.find({ _id: { $in: user.pieces } });
  return { ...user.toObject(), listPieces };
};

exports.reinitilizePassword = async (email, newPass) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = bcrypt.hashSync(newPass, 12);
  user.password = hashedPassword; // Mise à jour sans double-hachage
  await user.save();
  let listPieces = await Piece.find({ _id: { $in: user.pieces } });
  return { ...user.toObject(), listPieces };
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
