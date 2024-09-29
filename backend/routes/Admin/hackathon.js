const router = require("express").Router();
const singleUpload = require("../../config/multer.config");
const {
  createHackathonService,
  deleteHackathonService,
  updateHackathonService,
  getAllHackathon,
  getSingleHackathon,
  availableJudge,
  getByJudge,
  assignHackathon,
} = require("../../services/Admin/hackathonService");
const {
  enrollIntoHackathon,
  uploadHackathonSubmissionFile,
} = require("../../services/Student/accountService");

router.post(
  "/hackathon/create",
  singleUpload.fields([{ name: "coverImage", maxCount: 1 }]),
  createHackathonService
);

router.put(
  "/hackathon/update/:id",
  singleUpload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "questionImage", maxCount: 1 },
  ]),
  updateHackathonService
);

router.delete("/hackathon/delete/:id", deleteHackathonService);

router.get("/hackathon/get/all", getAllHackathon);
router.get("/hackathon/get/single/:id", getSingleHackathon);

router.get("/judge/available", availableJudge);
router.get("/hackathons/judge/:id", getByJudge);
router.put("/hackathon/assign/judge/:id", assignHackathon);
router.post("/hackathon/enroll-student/:hackathonId", enrollIntoHackathon);
router.post(
  "/hackathon/create-submission/:id",
  singleUpload.fields([{ name: "submissionFile", maxCount: 1 }]),
  uploadHackathonSubmissionFile
);

module.exports = router;
