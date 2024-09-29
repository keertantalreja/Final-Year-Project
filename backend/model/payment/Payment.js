const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    amount: { type: Number, required: false },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentAccount",
      default: null,
    },
    hackthon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      default: null,
    },

    paymentType: {
      type: String,
      required: false,
      enum: ["ONLINE", "CASH", "CARD"],
    },

    paymentDate: { type: Date, required: false },
    paymentEvidence: { type: String, required: false },
    isApproved: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
