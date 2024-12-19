const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    phone: String,
    birthday: Date,
    role: String,
    createdAt: Date,
    updatedAt: Date,
    pieces: [{ type: mongoose.Schema.Types.ObjectId, ref: "pieces" }],
  },
  { timestamps: true }
);

const User =  mongoose.model("users", userSchema);

exports.User = User;
