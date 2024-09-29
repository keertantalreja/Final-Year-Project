const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: false,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentAccount",
      required: false,
    },
    submissionFileUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
