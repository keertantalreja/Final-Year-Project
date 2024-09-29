const { required, string } = require("joi");
const mongoose = require("mongoose");

const hackathonSchema = mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },
  participant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentAccount",
      default: null,
    },
  ],
  startingDate: { type: Date, required: false },
  endingDate: { type: Date, required: false },
  testDuration: { type: Number, required: true },
  
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JudgeAccount",
    default: null,
  },
  coverImage: { type: String, required: true },
  questionImage: { type: String, default: null },
  fees: { type: Number, required: true },
  expired: { type: Number, default: false },
  category: { type: String, required: false, default: "" },
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
    },
  ],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HackathonResult",
    },
  ],
  isResultUploaded: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Hackathon = new mongoose.model("Hackathon", hackathonSchema, "Hackathon");

module.exports = Hackathon;
