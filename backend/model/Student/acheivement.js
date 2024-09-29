const mongoose = require("mongoose");

const hackathonAchievementSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "StudentAccount" },
  obtainedMarks: { type: Number, required: false },
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
});

const hackathonAchievementModel = mongoose.model(
  "Achievement",
  hackathonAchievementSchema
);

module.exports = hackathonAchievementModel;
