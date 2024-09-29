const { statusCode, api_messages } = require("../../constant/api_response");
const GenerateRandomNumber = require("../../constant/randomNumber");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Error");
const { JudgeAccountModel } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { send_email } = require("../../config/nodemailer.config");
const { uploadSingleFile } = require("../../config/firebase.config");

const RegisterJudgeService = asyncErrorHandler(async (req, res) => {
  let {
    firstname,
    lastname,
    email,
    password,
    city,
    phone,
    specialized,
    degree,
  } = req.body;
  let image = req?.files?.image[0];
  let cv = req?.files?.cv[0];
  let findUser = await JudgeAccountModel.findOne({ email: email });
  if (findUser) {
    throw new ErrorHandler(api_messages?.email_exits, statusCode.forbidden);
  } else {
    let imageUrl = await uploadSingleFile(image);
    let cvUrl = await uploadSingleFile(cv);
    let hashPassword = await bcrypt.hash(password, 10);
    let createUser = await JudgeAccountModel.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      city,
      phone,
      image: imageUrl,
      cv: cvUrl,
      specialized,
      degree,
    });
    if (createUser) {
      let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
      if (token) {
        res.status(statusCode?.success).json({ sucess: true, token: token });
      }
    }
  }
});

const LoginJudgeService = asyncErrorHandler(async (req, res) => {
  let { email, password } = req.body;
  let createUser = await JudgeAccountModel.findOne({ email: email });
  if (!createUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let hashPassword = await bcrypt.compare(password, createUser.password);
  if (hashPassword) {
    let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
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

const GetAllJudgeService = asyncErrorHandler(async (req, res) => {
  let findUser = await JudgeAccountModel.find({
    decline: false,
    approved: true,
  });
  if (!findUser.length > 0) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  } else {
    res.status(statusCode?.success).json(findUser);
  }
});

const GetSingleJudgeService = asyncErrorHandler(async (req, res) => {
  let { id } = req.params;
  let findUser = await JudgeAccountModel.findById(id);
  if (!findUser) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  } else {
    res.status(statusCode?.success).json(findUser);
  }
});

// const updateProfileService = asyncErrorHandler(async (req, res) => {
//   let { firstname, lastname, email, city, phone } = req.body;
//   let image = req.files?.image[0];
//   let imageUrl = await uploadSingleFile(image);
//   if (image) {
//     let updateProfile = await JudgeAccountModel.findByIdAndUpdate(
//       req.params.id,
//       { $set: { firstname, lastname, email, city, phone, image: imageUrl } },
//       { new: true }
//     );
//     res.status(200).json(updateProfile);
//   } else {
//     let updateProfile = await JudgeAccountModel.findByIdAndUpdate(
//       req.params.id,
//       { $set: { firstname, lastname, email, city, phone } },
//       { new: true }
//     );
//     res.status(200).json(updateProfile);
//   }
// });

// FORGET PASSWORD

// STEP 1 SEND OTP

const updateProfileService = asyncErrorHandler(async (req, res) => {
  let { firstname, lastname, email, city, phone } = req.body;
  let imageUrl;

  // Check if files and the image field exist
  if (req.files && req.files.image && req.files.image.length > 0) {
    let image = req.files.image[0];
    imageUrl = await uploadSingleFile(image);
  }

  let updateData = { firstname, lastname, email, city, phone };

  // If an image URL was generated, include it in the update data
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  let updateProfile = await JudgeAccountModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  );

  res.status(200).json(updateProfile);
});

const sendOtp = asyncErrorHandler(async (req, res) => {
  let { email } = req?.body;
  let findUser = await JudgeAccountModel.findOne({ email: email });
  if (!findUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  // GENERATE OTP
  let otp = GenerateRandomNumber();
  let valid_till = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
  let update_user_account = await JudgeAccountModel.findOneAndUpdate(
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
  let find_user = await JudgeAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_valid_otp = otp === find_user?.otp;
  if (!is_valid_otp) {
    throw new ErrorHandler(api_messages?.wrong_otp, statusCode?.forbidden);
  }
  let is_otp_expired = find_user.validTill > Date.now();
  if (is_otp_expired) {
    let otp_verified_sucesfull = await JudgeAccountModel.findOneAndUpdate(
      { email: email },
      { $set: { otpVerified: true, otp: null, validTill: null } }
    );
    if (otp_verified_sucesfull) {
      res
        .status(statusCode.success)
        .json({ message: api_messages?.otp_verfied });
    }
  } else {
    let delete_otp = await JudgeAccountModel.findOneAndUpdate(
      { email: email },
      { $set: { otp: null, validTill: null } }
    );
    throw new ErrorHandler(api_messages?.otp_expire, statusCode?.gone);
  }
});

// STEP 3 CHANGE PASSWORD
const changePassword = asyncErrorHandler(async (req, res) => {
  let { email, password } = req?.body;
  let find_user = await JudgeAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_otp_verified = find_user?.otp_verified === true;
  if (!is_otp_verified) {
    throw new ErrorHandler(
      api_messages?.otp_not_verified,
      statusCode?.not_authorized
    );
  } else {
    let secure_password = await bcrypt.hash(password, 10);
    let update_user_password = await JudgeAccountModel.findOneAndUpdate(
      { email, email },
      { $set: { password: secure_password, otpVerified: false } },
      { new: true }
    );
    res
      .status(statusCode?.success)
      .json({ message: api_messages?.password_changed });
  }
});

const deleteJudgeAccount = asyncErrorHandler(async (req, res) => {
  let deleteAccount = await JudgeAccountModel.findByIdAndDelete(req.params.id);
  if (deleteAccount) {
    res.status(200).json({ msg: "DELETED" });
  } else {
    throw new ErrorHandler("No Judge Found", 404);
  }
});

const approveAccount = asyncErrorHandler(async (req, res) => {
  let { approved } = req.body;
  if (approved) {
    let updateStatus = await JudgeAccountModel.findByIdAndUpdate(
      req.params.id,
      { $set: { approved } },
      { new: true }
    );
    res.status(200).json({ msg: "APPROVED" });
  } else {
    let updateStatus = await JudgeAccountModel.findByIdAndUpdate(
      req.params.id,
      { $set: { approved, decline: true } },
      { new: true }
    );
    res.status(400).json({ msg: "DECLINE" });
  }
});

const getApprovalRequest = asyncErrorHandler(async (req, res) => {
  let getRequest = await JudgeAccountModel.find({
    approved: false,
    decline: false,
  });
  if (!getRequest.length > 0) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  } else {
    res.status(statusCode?.success).json(getRequest);
  }
});

const registerByAdmin = asyncErrorHandler(async (req, res) => {
  let { firstname, lastname, email, password, city, phone } = req.body;
  let findUser = await JudgeAccountModel.findOne({ email: email });
  if (findUser) {
    throw new ErrorHandler(api_messages?.email_exits, statusCode.forbidden);
  } else {
    let hashPassword = await bcrypt.hash(password, 10);
    let createUser = await JudgeAccountModel.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      city,
      phone,
      approved: true,
    });
    if (createUser) {
      let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
      if (token) {
        res.status(statusCode?.success).json({ sucess: true, token: token });
      }
    }
  }
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
  const student = await JudgeAccountModel.findById(userId);
  if (!student) {
    return res.status(404).json({
      message: "Judge not found",
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
  let find_user = await JudgeAccountModel.findById(userId);
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
    let update_user_password = await JudgeAccountModel.findOneAndUpdate(
      { _id: find_user._id },
      { $set: { password: secure_password } },
      { new: true }
    );
    res
      .status(statusCode?.success)
      .json({ message: api_messages?.password_changed });
  }
});

module.exports = {
  registerByAdmin,
  RegisterJudgeService,
  LoginJudgeService,
  deleteJudgeAccount,
  GetAllJudgeService,
  GetSingleJudgeService,
  sendOtp,
  verifyOtp,
  changePassword,
  updateProfileService,
  approveAccount,
  getApprovalRequest,
  validateCurrentPassword,
  resetPasswordById,
};
