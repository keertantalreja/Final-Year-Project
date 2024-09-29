const { api_version } = require("../constant/api_response");
const AllRoutes = require("express").Router();
const StudentAccountRoute = require("./Student/account");
const AdminAccountRoute = require("./Admin/account");
const JudgeAccountRoute = require("./Judge/account");
const HackathonRoute = require("./Admin/hackathon");
const ApplyAsAJudgeRoute = require("./Judge/apply");
const paymentRoutes = require("./payment/paymentRoutes");

AllRoutes.use(`/api/${api_version}`, StudentAccountRoute);
AllRoutes.use(`/api/${api_version}`, AdminAccountRoute);
AllRoutes.use(`/api/${api_version}`, JudgeAccountRoute);
AllRoutes.use(`/api/${api_version}`, HackathonRoute);
AllRoutes.use(`api/${api_version}`, ApplyAsAJudgeRoute);
AllRoutes.use(`api/${api_version}`, paymentRoutes);

module.exports = { AllRoutes };
