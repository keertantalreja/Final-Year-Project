import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { colors } from "../../../constant/color";
import Button from "../button/Button";
import "./style.css";
import { useGetAllHackathonQuery } from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import { StudentjwtDecodeFunction } from "../../../services/jwtDecoder";

// Separate component to handle individual hackathon items
const HackathonItem = ({ item, studentId, navigate }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const calculateRemainingTime = (startDate, endDate) => {
    const currentDate = new Date();
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (currentDate > startDateTime) {
      const timeDifference = endDateTime - currentDate;

      if (timeDifference > 0) {
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        return {
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        };
      } else {
        return null; // Time has expired
      }
    } else {
      return null; // Current time is before the start time
    }
  };

  const formattedStartDate = formatDateTime(item?.startingDate);
  const formattedEndDate = formatDateTime(item?.endingDate);
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(item?.startingDate, item?.endingDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(
        calculateRemainingTime(item?.startingDate, item?.endingDate)
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [item?.startingDate, item?.endingDate]);

  return (
    <div
      onClick={() => navigate(`/student/hackathon/${item?._id}`)}
      className="cursor-pointer"
    >
      <div className="md:flex gap-x-1 block">
        <div className="relative">
          <img
            src={item?.coverImage}
            alt=""
            className="h-[15rem] md:min-w-[20rem] w-[100%] md:w-[20rem] bg-center object-cover"
          />
          <div
            className="absolute top-2 left-3"
            onClick={() => navigate(`/student/hackathon/${item?._id}`)}
          >
            <AiFillEye
              style={{ color: colors?.icon_bg }}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 pl-2 pr-2 w-[100%]">
          <div>
            <div className="flex justify-between items-center mb-4 gap-x-2">
              <h1 className="text-bold sm:text-semibold font-popins lg:text-xl md:text-sm text-xs">
                {item?.title}
              </h1>

              <button
                style={{
                  backgroundColor: colors?.sky_blue,
                  opacity: `${
                    item?.participant.find((p) => p._id == studentId) ||
                    new Date().getTime() >
                      new Date(item?.endingDate).getTime() ||
                      item?.isResultUploaded
                      ? "0.5"
                      : "1"
                  }`,
                }}
                disabled={item?.participant.find((p) => p._id == studentId)}
                onClick={() => navigate(`/student/hackathon/${item?._id}`)}
                className={
                  "text-white w-[5rem] h-[1.8rem] sm:w-[6rem] sm:h-[2rem] text-xs md:w-[9rem] md:h-[2.5rem] md:text-base font-roboto rounded-3xl shadow-btnShdow1"
                }
              >
                {item?.isResultUploaded
                  ? "Completed"
                  : new Date().getTime() > new Date(item?.endingDate).getTime()
                  ? "Ended"
                  : item?.participant.find((p) => p._id == studentId)
                  ? "Enrolled"
                  : "Enroll Now"}
              </button>
            </div>
            <p className="text-semibold text-gray-400 font-popins text-sm mb-2 custom-ellipsis leading-6">
              {item?.description}
            </p>
          </div>

          <div className="font-popins block sm:flex sm:justify-between mt-2">
            <p className="flex gap-x-1 sm:mt-0 mb-2 items-center text-sm text-gray-800">
              Fees : <span className=" text-black">{item?.fees}</span>{" "}
            </p>
          </div>

          <div className="font-popins block sm:flex sm:justify-between mt-1">
            <p className="flex gap-x-1 items-center text-sm text-gray-800 sm:mt-0 mb-2">
              Starting Date:
              <span className="text-black">{formattedStartDate}</span>
            </p>

            <p className="flex gap-x-1 items-center text-sm text-gray-800 sm:mt-0 mb-2">
              Ending Date:
              <span className="text-black">{formattedEndDate}</span>
            </p>
          </div>

          {remainingTime && (
            <div className="font-popins mt-2 sm:mb-0 mb-2">
              <p className="flex gap-x-1 items-center text-sm text-gray-800">
                Duration:
                <span className=" text-blue-500">
                  {`${remainingTime.hours}:${remainingTime.minutes
                    .toString()
                    .padStart(2, "0")}:${remainingTime.seconds
                    .toString()
                    .padStart(2, "0")}`}{" "}
                  remaining
                </span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-[100%] h-[1px] bg-slate-300 mb-4"></div>
    </div>
  );
};

const Listing = ({ searchValue, filterValue }) => {
  const studentId = StudentjwtDecodeFunction()?.findUser?._id;
  const navigate = useNavigate("");
  const [mainData, setMainData] = useState([]);
  const { data } = useGetAllHackathonQuery();

  const getHackathon = async () => {
    try {
      setMainData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHackathon();
  }, [data]);

  return (
    <div className="flex justify-center items-center">
      <div className="m-4 shadow-inputSadow w-[97%]">
        {mainData?.length > 0 ? (
          mainData
            ?.filter(
              (item) => filterValue === "All" || item?.category === filterValue
            )
            .filter((item) => {
              return searchValue
                ? item?.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                    item?.description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                : true;
            })
            ?.map((item, index) => (
              <HackathonItem
                key={index + item?._id}
                item={item}
                studentId={studentId}
                navigate={navigate}
              />
            ))
        ) : (
          <h1 className="text-center text-lg">NO HACKATHON FOUND</h1>
        )}
      </div>
    </div>
  );
};

export default Listing;
