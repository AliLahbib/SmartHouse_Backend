const mongoose = require("mongoose");

const pieceSchema = new mongoose.Schema(
  {
    name: String,
    type:String,
    floor: String,
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "devices" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const Piece = mongoose.model("pieces", pieceSchema);

exports.Piece = Piece;
