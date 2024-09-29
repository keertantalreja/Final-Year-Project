const router = require("express").Router();
const singleUpload = require("../../config/multer.config");
const {
  createPaymentService,
} = require("../../services/payment/paymentService");

// router.post(
//   "/payment/create",
//   //   singleUpload.fields([{ name: "paymentEvidenceImage", maxCount: 1 }]),

// );

// // router.get("/hackathon/get/all", getAllHackathon);

module.exports = router;
