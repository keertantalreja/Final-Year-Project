const {
  RegisterValidation,
  LoginValidation,
} = require("../../middleware/Validation/student/accountValidation");
const {
  RegisterStudentService,
  LoginStudentService,
  GetAllStudentService,
  GetSingleStudentService,
  sendOtp,
  verifyOtp,
  changePassword,
  validateCurrentPassword,
  resetPasswordById,
  updateStudentProfile,
  getAllAcheivements,
  deleteStudentService,
} = require("../../services/Student/accountService");
const router = require("express").Router();

router.post("/student/register", RegisterValidation, RegisterStudentService);
router.post("/student/login", LoginValidation, LoginStudentService);

router.post("/student/forget/password/send/otp", sendOtp);
router.post("/student/forget/password/verify/otp", verifyOtp);
router.post("/student/forget/password/change/password", changePassword);

router.get("/student/all", GetAllStudentService);
router.get("/student/single/:id", GetSingleStudentService);

router.post("/student/delete/:id", deleteStudentService);

router.post(
  "/student/validate-current-password/:userId",
  validateCurrentPassword
);

router.patch("/student/reset-password", resetPasswordById);
router.put("/student/profile/update", updateStudentProfile);

router.get("/student/get-all-acheivements/:studentId", getAllAcheivements);

module.exports = router;
