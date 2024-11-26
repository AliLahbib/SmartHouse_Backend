const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    
    name: String,
    status: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: "pieces" },
    type: String,
    specificParams: {
      color: String,
      powerConsumption: Number, // in kWh
    },
    lastConnected: Date,
    consumption: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const Device = mongoose.model("devices", deviceSchema);

module.exports = Device;
