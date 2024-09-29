// ACCOUNT
module.exports.StudentAccountModel = require("./Student/account");
module.exports.JudgeAccountModel = require("./Judge/account");
module.exports.AdminAccountModel = require("./Admin/account");

// HACKATHON
module.exports.HackathonModel = require("./Admin/hackathon");

// APPLIED AS A JUDGE
module.exports.AppliedJudgeModel = require("./Judge/apply");
module.exports.PaymentModel = require("./payment/Payment");
