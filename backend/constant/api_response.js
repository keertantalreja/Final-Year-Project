const databaseConnectionMessages = {
  success: "Database Connection Made",
  failure: "Database Connection Failed",
};

const statusCode = {
  NotFound: 404,
  conflict: 409,
  bad_request: 400,
  success: 200,
  forbidden: 403,
  gone: 410,
  not_authorized: 401,
};

const api_messages = {
  email_exits: "Email Already Registered",
  email_not_exits: "Email Not Found",
  email_sent: "Otp Has Been To Your Email",
  wrong_otp: "The Otp You Have Entered Is Invalid",
  otp_verfied: "Otp Has Been Verified",
  otp_expire: "Otp Has Been Expire",
  otp_not_verified: "Otp has not verified yet please verify your otp first",
  password_changed: "Your Password Has Been Changed",
  invalid_credentails: "Invalid Credentials",
  no_data_found: "No Data Found",
  student_not_found: "Student not Found",

  deleted: "Deleted Sucessfully",
};

const invalidApi = "Invalid Api Call";
const api_version = "v1";

module.exports = {
  databaseConnectionMessages,
  invalidApi,
  statusCode,
  api_version,
  api_messages,
};
