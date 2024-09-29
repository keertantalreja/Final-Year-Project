const mongoose = require("mongoose");

const studentAccountSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    otpVerified: { type: Boolean, default: false },
    validTill: { type: Number, default: null },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    level: { type: Number, default: 1 },
    levelProgress: { type: Number, default: 0 },
    hackathonMarks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const StudentAccount = new mongoose.model(
  "StudentAccount",
  studentAccountSchema,
  "StudentAccount"
);

module.exports = StudentAccount;
