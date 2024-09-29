const { statusCode, api_messages } = require("../../constant/api_response");
const GenerateRandomNumber = require("../../constant/randomNumber");
const { asyncErrorHandler, ErrorHandler } = require("../../middleware/Error/Error");
const { AdminAccountModel } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {send_email} = require('../../config/nodemailer.config')


const RegisterAdminService = asyncErrorHandler(async (req, res) => {
  let { firstname, lastname, email, password,city,phone} = req.body;
  let findUser = await AdminAccountModel.find({});
  if (findUser.length>0) {
    throw new ErrorHandler("Admin Already Present", statusCode.forbidden);
  }
  let hashPassword = await bcrypt.hash(password, 10);
  let createUser = await AdminAccountModel.create({firstname,lastname,email,password: hashPassword,city,phone});
  if (createUser) {
    let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
    if (token) {
      res.status(statusCode?.success).json({ sucess: true, token: token });
    }
  }
});

const LoginAdminService = asyncErrorHandler(async (req, res) => {
  let { email, password } = req.body;
  let createUser = await AdminAccountModel.findOne({ email: email });
  if (!createUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let hashPassword = await bcrypt.compare(password, createUser.password);
  if (hashPassword) {
    let token = await jwt.sign({ createUser }, process.env.SECRET_KEY);
    if (token) {
      res.status(statusCode?.success).json({ sucess: true, token: token });
    }
  }
else{
    throw new ErrorHandler(api_messages?.invalid_credentails,statusCode?.bad_request)
  }
});

const GetAdminService = asyncErrorHandler(async (req, res) => {
    let {id} = req.params
    let findUser = await AdminAccountModel.findById(id);
    if (!findUser) {
      throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
    }
    else{
        res.status(statusCode?.success).json(findUser);
    }

});

const GetSingleAdminService = asyncErrorHandler(async (req, res) => {
  let { id } = req.params
  let findUser = await AdminAccountModel.findById(id);
  if (!findUser) {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
  else {
    res.status(statusCode?.success).json(findUser);
  }

});



// FORGET PASSWORD 

// STEP 1 SEND OTP 
const sendOtp = asyncErrorHandler(async (req, res) => {
  let { email } = req?.body;
  let findUser = await AdminAccountModel.findOne({ email: email });
  if (!findUser) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  // GENERATE OTP
  let otp = GenerateRandomNumber();
  let valid_till = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
  let update_user_account = await AdminAccountModel.findOneAndUpdate({ email, email }, { $set: { otp: otp, validTill: valid_till } }, { new: true });
  if (update_user_account) {
    send_email(email, "Hackathon Forget Passowrd", "OTP", `Your OTP is ${otp}.This otp will expires in 5 minutes`);
    res.status(statusCode?.success).json({ msg: api_messages?.email_sent });
  }
});

// SETP 2 VERIFY OTP
const verifyOtp = asyncErrorHandler(async (req, res) => {
  let { email, otp } = req?.body;
  let find_user = await AdminAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_valid_otp = otp === find_user?.otp
  if (!is_valid_otp) {
    throw new ErrorHandler(api_messages?.wrong_otp, statusCode?.forbidden)
  }
  let is_otp_expired = find_user.validTill > Date.now()
  if (is_otp_expired) {
    let otp_verified_sucesfull = await AdminAccountModel.findOneAndUpdate({ email: email }, { $set: { otpVerified: true, otp: null, validTill: null } });
    if (otp_verified_sucesfull) {
      res.status(statusCode.success).json({ message: api_messages?.otp_verfied })
    }
  }
  else {
    let delete_otp = await user_account_model.findOneAndUpdate({ email: email }, { $set: { otp: null, validTill: null } });
    throw new ErrorHandler(api_messages?.otp_expire, statusCode?.gone)
  }
})

// STEP 3 CHANGE PASSWORD 
const changePassword = asyncErrorHandler(async (req, res) => {
  let { email, password } = req?.body
  let find_user = await AdminAccountModel.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  let is_otp_verified = find_user?.otpVerified === true
  if (!is_otp_verified) {
    throw new ErrorHandler(api_messages?.otp_not_verified, statusCode?.not_authorized)
  }
  else {
    let secure_password = await bcrypt.hash(password, 10)
    let update_user_password = await AdminAccountModel.findOneAndUpdate({ email, email }, { $set: { password: secure_password, otpVerified: false } }, { new: true })
    res.status(statusCode?.success).json({ message: api_messages?.password_changed })
  }

})

module.exports = { RegisterAdminService, LoginAdminService,GetAdminService,sendOtp,verifyOtp,changePassword,GetSingleAdminService};