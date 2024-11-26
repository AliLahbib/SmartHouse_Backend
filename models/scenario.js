const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    actions: [String], // List of actions as strings
    triggers: [String], // List of triggers
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const Scenario = mongoose.model("scenarios", scenarioSchema);

module.exports = Scenario;
