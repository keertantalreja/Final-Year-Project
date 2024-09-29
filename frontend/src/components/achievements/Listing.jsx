import React, { useState } from "react";

import AchievementsTable from "./Table";
import { colors } from "../../constant/color";

const AchievementsListing = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      style={{ backgroundColor: colors?.white }}
      className="w-screen relative h-screen overflow-hidden  p-0 sm:p-8 font-popins"
    >
      <div className="flex sm:gap-x-3 gap-x-2 items-center justify-between">
        <div className="flex gap-x-2">
          <div
            style={{ backgroundColor: colors?.sky_blue }}
            className="sm:w-[1.5rem] w-[1rem] h-[1rem] sm:h-[1.5rem] rounded-full"
          ></div>
          <h1 className="text-black text-lg tracking-wider">
            Achievements <span style={{ color: colors?.sky_blue }}>.</span>
          </h1>
        </div>
      </div>

      <div className="w-[100%] h-[100%] overflow-y-auto pt-4 pb-4 overflow-x-auto relative">
        <AchievementsTable searchValue={searchValue} />
      </div>
    </div>
  );
};

export default AchievementsListing;
