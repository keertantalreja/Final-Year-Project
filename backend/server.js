const express = require("express");
require("dotenv").config();
const cors = require("cors");
const database_conenction = require("./config/database.config");
const { invalidApi, statusCode } = require("./constant/api_response");
const { AllRoutes } = require("./routes");
const { errorMiddleware, ErrorHandler } = require("./middleware/Error/Error");
const {
  HackathonModel,
  AdminAccountModel,
  StudentAccountModel,
  JudgeAccountModel,
} = require("./model");

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

// DATABASE CONNECTION
database_conenction();

// API ROUTES
app.use(AllRoutes);

// CUSTOM ERROR HANDLER
app.use(errorMiddleware);
app.use((req, res, next) => {
  next(new ErrorHandler(invalidApi, statusCode?.NotFound));
});

// port
app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});

// const deleteAll = async()=>{
//   await HackathonModel.deleteMany({})
//   await AdminAccountModel.deleteMany({})
//   await StudentAccountModel.deleteMany({})
//   await JudgeAccountModel.deleteMany({})
// }
// deleteAll()
