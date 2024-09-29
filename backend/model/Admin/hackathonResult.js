const mongoose = require("mongoose");

const hackathonResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "StudentAccount" },
  obtainedMarks: { type: Number, required: false },
});

const hackathonResultModel = mongoose.model(
  "HackathonResult",
  hackathonResultSchema
);

module.exports = hackathonResultModel;
