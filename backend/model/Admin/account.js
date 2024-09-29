const mongoose = require("mongoose");

const AdminAccountSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, default: null },
  otp: { type: String, default: null },
  otpVerified: { type: Boolean, default: false },
  validTill: { type: Number, default: null },
});

const AdminAccount = new mongoose.model(
  "AdminAccount",
  AdminAccountSchema,
  "AdminAccount"
);

module.exports = AdminAccount;
