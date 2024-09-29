import React from "react";

import Navbar from "../../../components/judge/Home/Navbar";
import JudgeProfile from "../../../components/judge/judgeProfile/JudgeProfile";

const ProfileJudgePage = () => {
  return (
    <div>
      <Navbar />
      <JudgeProfile role="judge" />
    </div>
  );
};

export default ProfileJudgePage;
