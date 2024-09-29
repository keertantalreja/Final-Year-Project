const {
  RegisterValidation,
  LoginValidation,
} = require("../../middleware/Validation/admin/accountValidation");
const {
  RegisterJudgeService,
  LoginJudgeService,
  GetAllJudgeService,
  GetSingleJudgeService,
  sendOtp,
  verifyOtp,
  changePassword,
  updateProfileService,
  deleteJudgeAccount,
  approveAccount,
  getApprovalRequest,
  registerByAdmin,
  validateCurrentPassword,
  resetPasswordById,
} = require("../../services/Judge/accountService");
const singleUpload = require("../../config/multer.config");
const {
  createPaymentService,
  getAllPayments,
  updatePaymentService,
  createStripePaymentIntent,
} = require("../../services/payment/paymentService");
const {
  uploadHackathonMarks,
} = require("../../services/Admin/hackathonService");
const router = require("express").Router();

router.post(
  "/judge/register",
  singleUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  RegisterJudgeService
);
router.post(
  "/payment/create",
  singleUpload.fields([{ name: "paymentEvidenceImage", maxCount: 1 }]),
  createPaymentService
);

router.get("/payment/all", getAllPayments);
router.put("/payment/approve/:id", updatePaymentService);

router.post(
  "/judge/validate-current-password/:userId",
  validateCurrentPassword
);

router.post("/judge/admin/register", registerByAdmin);
router.post("/judge/login", LoginValidation, LoginJudgeService);
router.put("/judge/account/approval/:id", approveAccount);

router.put(
  "/judge/update/:id",
  singleUpload.fields([{ name: "image", maxCount: 1 }]),
  updateProfileService
);

router.get("/judge/all", GetAllJudgeService);
router.get("/judge/single/:id", GetSingleJudgeService);

router.post("/judge/forget/password/send/otp", sendOtp);
router.post("/judge/forget/password/verify/otp", verifyOtp);
router.post("/judge/forget/password/change/password", changePassword);

router.delete("/judge/delete/:id", deleteJudgeAccount);
router.get("/judge/approval/request", getApprovalRequest);

router.patch("/judge/reset-password", resetPasswordById);

// image

router.post("/payment/create-stripe-payment-intent", createStripePaymentIntent);

router.post("/judge/upload-hackathon-result", uploadHackathonMarks);

module.exports = router;
