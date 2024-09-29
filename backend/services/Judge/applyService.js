const { statusCode, api_messages } = require("../../constant/api_response");
const { asyncErrorHandler, ErrorHandler } = require("../../middleware/Error/Error");
const { AppliedJudgeModel } = require("../../model");
const {send_email} = require('../../config/nodemailer.config')