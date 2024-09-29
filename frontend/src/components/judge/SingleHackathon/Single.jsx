import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Single = ({ hackathonData }) => {
  const calculateRemainingTime = (targetDate) => {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);

    const timeDifference = targetDateTime - currentDate;

    if (timeDifference > 0) {
      const remainingMonths = Math.floor(
        timeDifference / (30 * 24 * 60 * 60 * 1000)
      );
      const remainingDays = Math.floor(
        (timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
      );
      const remainingHours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );

      return {
        months: remainingMonths,
        days: remainingDays,
        hours: remainingHours,
      };
    } else {
      return {
        months: 0,
        days: 0,
        hours: 0,
      };
    }
  };

  const remainingTime = calculateRemainingTime(hackathonData?.startingDate);
  const endingTime = calculateRemainingTime(hackathonData?.endingDate);

  return (
    <div className=" font-popins mt-10 ml-5 mr-5 pb-10">
      {/* HACKATHON COVER IMAGE  */}
      <div>
        <img
          className="w-screen h-[25rem] bg-center rounded-md bg-cover"
          src={
            hackathonData?.coverImage ||
            "https://c4.wallpaperflare.com/wallpaper/632/34/549/technology-monitor-alpha-coders-binary-wallpaper-preview.jpg"
          }
          alt=""
        />
      </div>

      {/* TITLE AND DESCRIPTION  */}
      <div className="mt-8">
        <h1 className="text-xl">{hackathonData?.title}</h1>
        <p className="mt-3 text-[#6b7483] text-sm leading-6">
          {hackathonData?.description}
        </p>
      </div>
      <div className="sm:flex justify-between items-center mt-5">
        <p className="flex gap-x-1 sm:mb-0 mb-2 items-center text-base sm:text-sm text-gray-800 ">
          Starting Date:
          <span className="text-[#6b7483]">
            Months: {remainingTime.months}, Days: {remainingTime.days}, Hours:{" "}
            {remainingTime.hours}
          </span>
        </p>

        <p className="flex gap-x-1 items-center text-base sm:text-sm ">
          Ending Date:
          <span className="text-[#6b7483]">
            Months: {endingTime.months}, Days: {endingTime.days}, Hours:{" "}
            {endingTime.hours}
          </span>
        </p>
      </div>
      <p className="mt-3 text-[#6b7483] text-sm leading-6">
        {hackathonData?.description}
      </p>
      <p className="mt-3 text-[#6b7483] text-sm leading-6">
        Fees: {hackathonData?.fees}
      </p>
      <div className="mt-10 ml-5 mr-5 pb-10">
        <h1 className="text-xl font-bold">Students</h1>
        <div className="mt-5 justify-center items-center w-[100%]">
          {hackathonData?.participant?.map((user, index) => {
            return (
              <div key={user?._id} className="flex w-[100%] my-4">
                <input
                  value={user?.firstname + " " + user?.lastname}
                  //   onChangeFunc={onChangeInput}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid silver",
                  }}
                  type="text"
                  placeholder="Student Name"
                  name="studentName"
                  className={
                    "h-[2.5rem] w-[30%] pl-5 pr-4 rounded-[0.5rem] outline-none text-black mr-4"
                  }
                  disabled
                />
                <button
                  onClick={() => {}}
                  className="p-2 w-[20%] flex bg-[blue] text-white text-center justify-center rounded-md"
                >
                  {hackathonData?.submissions?.find(
                    (item) => item?.student?._id == user?._id
                  ) ? (
                    <a
                      href={
                        hackathonData?.submissions?.find(
                          (item) => item?.student?._id == user?._id
                        )?.submissionFileUrl
                      }
                    >
                      Download Submission File
                    </a>
                  ) : (
                    "Not Submitted Yet"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Single;
