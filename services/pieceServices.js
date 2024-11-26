const { Piece } = require("../models/piece");
const { User } = require("../models/user");



exports.getPieces = async () => {
  
  const pieces = await Piece.find({});
  const piecesWithUsers = await Promise.all(
    pieces.map(async (piece) => {
      const listUsers = await User.find({ _id: { $in: piece.users } });
      return { ...piece.toObject(), "listUsers": listUsers  }; // Convertir en objet JS et ajouter listPieces
    })
  )
  
  return piecesWithUsers;
};
exports.getPieceById= async (id)=>{
  const piece = await Piece.findById(id);
  if (!piece) {
    throw new Error("Piece not found");
  }
  let listUsers = await User.find({ _id: { $in: piece.users } });
  return { ...piece.toObject(), "listUsers":listUsers };
}
exports.addNewPiece = async (userData) => {
  console.log("debug add Piece from piece services");
  const piece = await Piece.create({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
    devices: [],
    users: [],
  });
  return { ...piece.toObject(), "listUsers":[] };
};
exports.deletePiece = async (id) => {
  const piece = await Piece.findByIdAndDelete(id);
  if (!piece) {
    throw new Error("Piece not found");
  }
  await User.updateMany(
    { _id: { $in: piece.users } },
    { $pull: { pieces: id } }
  )
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
  let listUsers = await User.find({ _id: { $in: piece.users } });
  return { ...piece.toObject(), "listUsers":listUsers };
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
 
    if(user.pieces.includes(pieceId)&& piece.users.includes(userId)){
        throw new Error('Piece already added to user');
    }
    user.pieces.push(pieceId);
    piece.users.push(userId) ;
    await piece.save();
    await user.save();
    return piece;



};


exports.getPiecesByUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const pieces = await Piece.find({ _id: { $in: user.pieces } });
  return pieces;
};



