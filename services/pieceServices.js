const { Piece } = require("../models/piece");
const { User } = require("../models/user");

const bcryptjs = require("bcryptjs");

exports.getPieces = async () => {
  console.log("debug route request from services");
  const pieces = await Piece.find({});
  console.log("debug pieces from services : " + pieces);
  return pieces;
};
exports.getPieceById= async (id)=>{
  const piece = await Piece.findById(id);
  if (!piece) {
    throw new Error("Piece not found");
  }
  return piece;
}
exports.addNewPiece = async (userData) => {
  console.log("debug add Piece from piece services");
  const piece = await Piece.create({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
    devices: [],
    userId: null,
  });
  return piece;
};
exports.deletePiece = async (id) => {
  const piece = await Piece.findByIdAndDelete(id);
  if (!piece) {
    throw new Error("Piece not found");
  }
  const user = await User.findById(piece.userId);
  if (user) {
    user.pieces.pull(id);
    await user.save();
  }
  Piece.findByIdAndDelete(id);
  return piece;
};
exports.updatePiece = async (id, pieceData) => {
  const piece = await Piece.findByIdAndUpdate(
    id,
    { ...pieceData, updatedAt: new Date() },
    { new: true }
  );
  if (!piece) {
    throw new Error("Piece not found");
  }
  return piece;
};

exports.addDeviceToPiece = async (pieceId, deviceId) => {
  const piece = await Piece.findById(pieceId);
  piece.devices.push(deviceId);
  await piece.save();
  return piece;
};

exports.addPieceToUser = async (userId, pieceId) => {
  console.log("debug add Piece to user from piece services");
  const user = await User.findById(userId);
  console.log("debug user from piece services : " + user);
  if (!user) {
    throw new Error("User not found");
  }
  const piece = await Piece.findById(pieceId);
  if (!piece) {
    throw new Error("Piece not found");
  }
 
    if(user.pieces.includes(pieceId)&& piece.userId==userId){
        throw new Error('Piece already added to user');
    }
    user.pieces.push(pieceId);
    piece.userId = userId;
    await piece.save();
    await user.save();
    return piece;



};

