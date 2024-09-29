const uploadFiles = require("../../config/cloudinary.config");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Error");
const { HackathonModel, JudgeAccountModel } = require("../../model/index");
const { statusCode, api_messages } = require("../../constant/api_response");
const { uploadSingleFile } = require("../../config/firebase.config");
const {
  send_email,
  sendResultEmail,
} = require("../../config/nodemailer.config");
const Hackathon = require("../../model/Admin/hackathon");
const StudentAccount = require("../../model/Student/account");
const hackathonResultModel = require("../../model/Admin/hackathonResult");
const hackathonAchievementModel = require("../../model/Student/acheivement");

const createHackathonService = asyncErrorHandler(async (req, res) => {
  let {
    title,
    description,
    startingDate,
    endingDate,
    testDuration,
    fees,
    category,
  } = req.body;
  let coverImage = req?.files?.coverImage[0];
  let imageUrl = await uploadSingleFile(coverImage);
  if (imageUrl) {
    let createHackathon = await HackathonModel.create({
      category,
      title,
      description,
      startingDate,
      endingDate,
      testDuration,
      coverImage: imageUrl,
      fees,
    });
    res.status(statusCode?.success).json(createHackathon);
  }
});

const updateHackathonService = asyncErrorHandler(async (req, res) => {
  let {
    title,
    description,
    startingDate,
    endingDate,
    testDuration,
    fees,
    participant,
    category,
  } = req.body;
  let { id } = req.params;
  let coverImage = req?.files?.coverImage && req?.files?.coverImage[0];
  let questionFile = req?.files?.questionImage && req?.files?.questionImage[0];
  let CoverURLImage;
  let QuestionURLImage;

  if (coverImage) {
    CoverURLImage = await uploadSingleFile(coverImage);
  }
  if (questionFile) {
    QuestionURLImage = await uploadSingleFile(questionFile);
  }

  if (QuestionURLImage && CoverURLImage) {
    let createHackathon = await HackathonModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          startingDate,
          participant,
          endingDate,
          testDuration,
          questionImage: QuestionURLImage,
          coverImage: CoverURLImage,
          fees,
          category,
        },
      },
      { new: true }
    );
    res.status(statusCode?.success).json(createHackathon);
  } else if (QuestionURLImage) {
    let createHackathon = await HackathonModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          participant,
          startingDate,
          fees,
          endingDate,
          testDuration,
          questionImage: QuestionURLImage,
          category,
        },
      },
      { new: true }
    );
    res.status(statusCode?.success).json(createHackathon);
  } else if (CoverURLImage) {
    let createHackathon = await HackathonModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          fees,
          participant,
          description,
          startingDate,
          endingDate,
          testDuration,
          coverImage: CoverURLImage,
          category,
        },
      },
      { new: true }
    );
    res.status(statusCode?.success).json(createHackathon);
  } else {
    let createHackathon = await HackathonModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          fees,
          description,
          participant,
          startingDate,
          endingDate,
          testDuration,
          category,
        },
      },
      { new: true }
    );
    res.status(statusCode?.success).json(createHackathon);
  }
});

const deleteHackathonService = asyncErrorHandler(async (req, res) => {
  let { id } = req?.params;
  let deleteHackathon = await HackathonModel.findByIdAndDelete(id);
  if (deleteHackathon) {
    res.status(200).json({ msg: "DELETED" });
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

const getAllHackathon = asyncErrorHandler(async (req, res) => {
  let FindAll = await HackathonModel.find({})
    .populate("judge")
    .populate("results")
    .populate("participant", "firstname lastname email _id city phone")

    .populate({
      path: "submissions",
      populate: {
        path: "student",
        select: "firstname lastname email _id city phone",
      },
    });
  if (FindAll?.length > 0) {
    res.status(statusCode.success).json(FindAll);
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

const getSingleHackathon = asyncErrorHandler(async (req, res) => {
  let { id } = req?.params;
  let FindAll = await HackathonModel.findById(id)
    .populate("judge")
    .populate({
      path: "results",
      populate: {
        path: "student",
        select: "firstname lastname email _id city phone",
      },
    })
    .populate("participant", "firstname lastname email _id city phone")

    .populate({
      path: "submissions",
      populate: {
        path: "student",
        select: "firstname lastname email _id city phone",
      },
    });
  if (FindAll) {
    res.status(statusCode.success).json(FindAll);
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

const assignHackathon = asyncErrorHandler(async (req, res) => {
  let { judge } = req.body;
  let { id } = req.params;
  let findJudge = await JudgeAccountModel.findById(judge);
  let update = await HackathonModel.findByIdAndUpdate(
    id,
    { $set: { judge } },
    { new: true }
  );
  let updateJudge = await JudgeAccountModel.findByIdAndUpdate(
    judge,
    { $set: { working: true } },
    { new: true }
  );
  send_email(
    findJudge.email,
    "New Hackathon Assign",
    "OTP",
    `Admin Has Assign You A New Hackathon Please Check Your Dashbaord`
  );
  res.status(200).json(update);
});

const getByJudge = asyncErrorHandler(async (req, res) => {
  const get = await HackathonModel.find({ judge: req.params.id });
  if (get.length > 0) {
    res.status(200).json(get);
  } else {
    throw new ErrorHandler("NO DATA FOUND", 404);
  }
});

const availableJudge = asyncErrorHandler(async (req, res) => {
  const get = await JudgeAccountModel.find({ working: false });
  if (get.length > 0) {
    res.status(200).json(get);
  } else {
    throw new ErrorHandler("NO DATA FOUND", 404);
  }
});

function calculateLevelAndProgress(
  obtainedMarksPercentage,
  currentLevel,
  currentProgress
) {
  // Calculate the total progress including current progress
  let totalProgress = currentProgress + obtainedMarksPercentage;

  let newLevel = currentLevel;
  let newProgress = totalProgress;

  // Gradually increase level if progress reaches or exceeds 100%
  while (newProgress >= 100) {
    newLevel += 1; // Increment the level
    newProgress -= 100; // Subtract 100 from progress (carry over)

    // Cap the level at 10 (assuming 10 is the maximum level)
    if (newLevel >= 10) {
      newLevel = 10;
      newProgress = 0; // Once at max level, progress stays at 0
      break;
    }
  }

  return {
    newLevel,
    newProgress,
  };
}

async function updateStudentLevel(student, obtainedMarks) {
  const obtainedMarksPercentage = (obtainedMarks / 100) * 100;

  const { newLevel, newProgress } = calculateLevelAndProgress(
    obtainedMarksPercentage,
    student.level,
    student.levelProgress
  );

  student.level = newLevel;
  student.levelProgress = newProgress;

  await student.save();

  return student;
}

const uploadHackathonMarks = asyncErrorHandler(async (req, res) => {
  const { hackathonId, results } = req.body;

  try {
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).send("Hackathon not found");
    }

    for (const result of results) {
      const student = await StudentAccount.findById(result.studentId);
      if (!student) {
        console.error(`Student with ID ${result.studentId} not found`);
        continue;
      }

      await updateStudentLevel(student, result.obtainedMarks);

      const hackathonResult = new hackathonResultModel({
        student: student._id,
        obtainedMarks: result.obtainedMarks,
      });
      const savedResult = await hackathonResult.save();
      hackathon.results.push(savedResult._id);

      const hackathonacheivement = new hackathonAchievementModel({
        student: student._id,
        obtainedMarks: result.obtainedMarks,
        hackathon: hackathon._id,
      });
      const savedAchievement = await hackathonacheivement.save();

      // Send result email
      // await sendResultEmail(student);
      // Send result email

      await sendResultEmail(
        student.email,
        `${student.firstname} ${student.lastname}`,
        hackathon.title,
        result.obtainedMarks,
        student.level,
        student.levelProgress
      );
    }

    hackathon.isResultUploaded = true;

    await hackathon.save();

    res.status(200).json({
      message: "Hackathon results uploaded and students updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error uploading hackathon results:", error);
    res
      .status(500)
      .send("An error occurred while uploading hackathon results.");
  }
});

module.exports = {
  createHackathonService,
  updateHackathonService,
  deleteHackathonService,
  getAllHackathon,
  getSingleHackathon,
  assignHackathon,
  availableJudge,
  getByJudge,
  uploadHackathonMarks,
};
