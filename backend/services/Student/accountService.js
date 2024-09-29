const { statusCode, api_messages } = require("../../constant/api_response");
const GenerateRandomNumber = require("../../constant/randomNumber");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Error");
const { StudentAccountModel, HackathonModel } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { send_email } = require("../../config/nodemailer.config");
const StudentAccount = require("../../model/Student/account");
const Submission = require("../../model/Student/submission");
const { uploadSingleFile } = require("../../config/firebase.config");
const hackathonAchievementModel = require("../../model/Student/acheivement");

const RegisterStudentService = asyncErrorHandler(async (req, res) => {
  let { firstname, lastname, email, password, city, phone } = req.body;
  let findUser = await StudentAccountModel.findOne({ email: email });
  if (findUser) {
    throw new ErrorHandler(api_messages?.email_exits, statusCode.forbidden);
  }
  let hashPassword = await bcrypt.hash(password, 10);
  let createUser = await StudentAccountModel.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
    city,
    phone,
  });
  if (createUser) {
    let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
    if (token) {
      res.status(statusCode?.success).json({ sucess: true, token: token });
    }
  }
});

const LoginStudentService = asyncErrorHandler(async (req, res) => {
  let { email, password } = req.body;
  let findUser = await StudentAccountModel.findOne({ email: email });
  if (!findUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let hashPassword = await bcrypt.compare(password, findUser.password);
  if (hashPassword) {
    let token = await jwt.sign({ findUser }, process.env.SECRET_KEY);
    if (token) {
      res.status(statusCode?.success).json({ sucess: true, token: token });
    }
  } else {
    throw new ErrorHandler(
      api_messages?.invalid_credentails,
      statusCode?.bad_request
    );
  }
});

const GetAllStudentService = asyncErrorHandler(async (req, res) => {
  let findUser = await StudentAccountModel.find({});
  if (!findUser.length > 0) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  } else {
    res.status(statusCode?.success).json(findUser);
  }
});

const GetSingleStudentService = asyncErrorHandler(async (req, res) => {
  let { id } = req.params;
  let findUser = await StudentAccountModel.findById(id).select("-password");
  if (!findUser) {
    throw new ErrorHandler(
      api_messages?.student_not_found,
      statusCode?.NotFound
    );
  } else {
    res.status(statusCode?.success).json({
      message: "Student found",
      statusCode: 200,
      data: findUser,
    });
  }
});

// FORGET PASSWORD

// STEP 1 SEND OTP
const sendOtp = asyncErrorHandler(async (req, res) => {
  let { email } = req?.body;

  let findUser = await StudentAccountModel.findOne({ email: email });
  if (!findUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  // GENERATE OTP
  let otp = GenerateRandomNumber();
  let valid_till = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
  let update_user_account = await StudentAccountModel.findOneAndUpdate(
    { email, email },
    { $set: { otp: otp, validTill: valid_till } },
    { new: true }
  );
  if (update_user_account) {
    send_email(
      email,
      "Hackathon Forget Passowrd",
      "OTP",
      `Your OTP is ${otp}.This otp will expires in 5 minutes`
    );
    res.status(statusCode?.success).json({ msg: api_messages?.email_sent });
  }
});

// SETP 2 VERIFY OTP
const verifyOtp = asyncErrorHandler(async (req, res) => {
  let { email, otp } = req?.body;
  let find_user = await StudentAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_valid_otp = otp === find_user?.otp;
  if (!is_valid_otp) {
    throw new ErrorHandler(api_messages?.wrong_otp, statusCode?.forbidden);
  }
  let is_otp_expired = find_user.validTill > Date.now();
  if (is_otp_expired) {
    let otp_verified_sucesfull = await StudentAccountModel.findOneAndUpdate(
      { email: email },
      { $set: { otpVerified: true, otp: null, validTill: null } }
    );
    if (otp_verified_sucesfull) {
      res
        .status(statusCode.success)
        .json({ message: api_messages?.otp_verfied });
    }
  } else {
    let delete_otp = await StudentAccountModel.findOneAndUpdate(
      { email: email },
      { $set: { otp: null, validTill: null } }
    );
    throw new ErrorHandler(api_messages?.otp_expire, statusCode?.gone);
  }
});

// STEP 3 CHANGE PASSWORD
const changePassword = asyncErrorHandler(async (req, res) => {
  let { email, password } = req?.body;
  let find_user = await StudentAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_otp_verified = find_user?.otpVerified === true;
  if (!is_otp_verified) {
    throw new ErrorHandler(
      api_messages?.otp_not_verified,
      statusCode?.not_authorized
    );
  } else {
    let secure_password = await bcrypt.hash(password, 10);
    let update_user_password = await StudentAccountModel.findOneAndUpdate(
      { email, email },
      { $set: { password: secure_password, otpVerified: false } },
      { new: true }
    );
    res
      .status(statusCode?.success)
      .json({ message: api_messages?.password_changed });
  }
});

const enrollIntoHackathon = asyncErrorHandler(async (req, res) => {
  let { hackathonId } = req.params;
  let { studentId } = req.body;

  if (!hackathonId || hackathonId === "") {
    return res.status(400).json({
      message: "Empty required fields",
      statusCode: 400,
      success: false,
    });
  }
  const hackathon = await HackathonModel.findById(hackathonId);
  if (!hackathon) {
    return res.status(404).json({
      message: "Hackathon not found",
      statusCode: 404,
      success: false,
    });
  }

  if (hackathon.participant.includes(studentId)) {
    return res.status(400).json({
      message: "Student is already enrolled in this hackathon",
      statusCode: 400,
      success: false,
    });
  }

  const updatedHackathon = await HackathonModel.findOneAndUpdate(
    {
      _id: hackathon._id,
    },
    {
      $push: { participant: studentId },
    },
    {
      new: true,
    }
  );
  return res.status(200).json({
    message: "Enrolled successfully!",
    statusCode: 200,
    success: true,
    data: updatedHackathon,
  });
});

const validateCurrentPassword = asyncErrorHandler(async (req, res) => {
  let { userId } = req.params;
  const { currentPassword } = req.body;

  if (!userId || userId === "" || !currentPassword || currentPassword === "") {
    return res.status(400).json({
      message: "Empty required fields",
      statusCode: 400,
      success: false,
    });
  }
  const student = await StudentAccount.findById(userId);
  if (!student) {
    return res.status(404).json({
      message: "Student not found",
      statusCode: 404,
      success: false,
    });
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    student.password
  );

  if (isPasswordValid) {
    return res.status(200).json({
      message: "Current password matched!",
      statusCode: 200,
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Current password not matched!",
      statusCode: 400,
      success: false,
    });
  }
});

const resetPasswordById = asyncErrorHandler(async (req, res) => {
  let { userId, password } = req?.body;
  let find_user = await StudentAccountModel.findById(userId);
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_otp_verified = find_user?.otpVerified === true;
  if (!is_otp_verified) {
    throw new ErrorHandler(
      api_messages?.otp_not_verified,
      statusCode?.not_authorized
    );
  } else {
    let secure_password = await bcrypt.hash(password, 10);
    let update_user_password = await StudentAccountModel.findOneAndUpdate(
      { _id: find_user._id },
      { $set: { password: secure_password } },
      { new: true }
    );
    res
      .status(statusCode?.success)
      .json({ message: api_messages?.password_changed });
  }
});

const updateStudentProfile = asyncErrorHandler(async (req, res) => {
  const { userId, firstname, lastname, phone, city } = req.body;

  const find_user = await StudentAccountModel.findById(userId);
  if (!find_user) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }

  const updated_user = await StudentAccountModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        firstname,
        lastname,
        phone,
        city,
      },
    },
    { new: true }
  );

  res.status(statusCode?.success).json({
    message: "Student profile updated",
    data: updated_user,
  });
});

const uploadHackathonSubmissionFile = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;
  const submissionFile =
    req?.files?.submissionFile && req?.files?.submissionFile[0];

  if (!submissionFile) {
    return res
      .status(statusCode?.badRequest)
      .json({ message: "No submission file uploaded" });
  }

  try {
    // Upload the submission file and get the URL
    const submissionFileUrl = await uploadSingleFile(submissionFile);

    // Create a new submission document
    const newSubmission = new Submission({
      hackathon: id,
      student: studentId,
      submissionFileUrl,
    });

    await newSubmission.save();

    // Optionally, update the hackathon document to include this submission in an array
    await HackathonModel.findByIdAndUpdate(
      id,
      { $push: { submissions: newSubmission._id } },
      { new: true }
    );

    res.status(statusCode?.success).json({
      success: true,
      newSubmission,
    });
  } catch (error) {
    res
      .status(statusCode?.internalServerError)
      .json({ message: error.message });
  }
});

const getAllAcheivements = asyncErrorHandler(async (req, res) => {
  const { studentId } = req.params;
  let FindAll = await hackathonAchievementModel
    .find({
      student: studentId,
    })
    .populate("student", "-password")
    .populate(
      "hackathon",
      "title _id description coverImage category startingDate endingDate"
    );

  if (FindAll?.length > 0) {
    res.status(statusCode.success).json(FindAll);
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

const deleteStudentService = asyncErrorHandler(async (req, res) => {
  let { id } = req?.params;
  let deleteStudent = await StudentAccountModel.findByIdAndDelete(id);
  if (deleteStudent) {
    res.status(200).json({ msg: "DELETED" });
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

module.exports = {
  RegisterStudentService,
  LoginStudentService,
  GetAllStudentService,
  GetSingleStudentService,
  sendOtp,
  verifyOtp,
  changePassword,
  enrollIntoHackathon,
  validateCurrentPassword,
  resetPasswordById,
  updateStudentProfile,
  uploadHackathonSubmissionFile,
  getAllAcheivements,
  deleteStudentService,
};
