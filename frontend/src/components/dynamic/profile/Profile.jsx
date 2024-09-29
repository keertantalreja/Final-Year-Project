import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../../constant/color";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input/Input";
import Button from "../button/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cityData } from "../../../constant/cities";
import {
  useGetSingleStudentProfileQuery,
  useUpdateStudentProfileMutation,
} from "../../../services/api/api";
import { StudentjwtDecodeFunction } from "../../../services/jwtDecoder";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { Badge, Card, Space, Flex, Progress } from "antd";

const Profile = ({ role }) => {
  const studentId = StudentjwtDecodeFunction()?.findUser?._id;
  const [loader, setLoader] = useState(false);
  const { data: studentProfileData, refetch } = useGetSingleStudentProfileQuery(
    studentId,
    {
      skip: !studentId, // Skip the API call if studentId is not available
    }
  );
  console.log("studentProfileData", studentProfileData);

  const [updateStudentProfile] = useUpdateStudentProfileMutation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [studentState, setStudentState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    if (studentProfileData) {
      setStudentState({
        firstname: studentProfileData?.data.firstname,
        lastname: studentProfileData?.data.lastname,
        email: studentProfileData?.data.email,
        phone: studentProfileData?.data.phone,
        city: studentProfileData?.data.city,
      });
    }
  }, [studentProfileData]);

  //   const inputRef = useRef(null);

  const [showCity, setShowCity] = useState(false);
  const nav = useNavigate();

  const onChangeInput = (e) => {
    if (role === "student") {
      setStudentState({ ...studentState, [e.target.name]: e.target.value });
    }
    //  else {
    //     setJudgeState({
    //       ...judgeState,
    //       [e.target.name]: e.target.value,
    //     });
    //   }
    // }
  };

  const updateProfile = async () => {
    setLoader(true);
    try {
      const result = await updateStudentProfile({
        data: {
          userId: studentId,
          firstname: studentState.firstname,
          lastname: studentState.lastname,
          // email: studentProfileData?.data.email,
          phone: studentState.phone,
          city: studentState.city,
        },
      }).unwrap();
      console.log(result);
      toast.success("Profile has been Updated");
      refetch(); // Call the API again after the profile is updated
      setLoader(false);
      //   refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: colors?.white }}
      className="w-screen relative h-screen overflow-x-hidden overflow-y-auto p-0 sm:p-8 font-popins"
    >
      {/* HEADEIND AND NAVIGATION */}

      {/* MAIN FORM  */}

      {studentProfileData !== undefined ? (
        <div
          className={`sm:h-[95vh] h-[95%] w-[100%] flex justify-center text-center mt-16 mb-10`}
        >
          <div>
            <div className="p-2 sm:p-0 flex flex-col text-center justify-center items-center">
              <h1 className="text-3xl sm:text-4xl font-bold mt-3 ">
                Badges
                <span style={{ color: colors.sky_blue }}>.</span>
              </h1>
              <div className="w-[30%] ">
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <Badge.Ribbon
                    text={studentProfileData?.data.level?.toString()}
                  >
                    <Card title="Level" size="small">
                      <Progress percent={studentProfileData?.data.levelProgress} />
                    </Card>
                  </Badge.Ribbon>
                </Space>
              </div>
            </div>
            <div className="p-2 sm:p-0">
              <h1 className="text-3xl sm:text-4xl font-bold mt-3 ">
                Update Profile
                <span style={{ color: colors.sky_blue }}>.</span>
              </h1>
            </div>

            {/* MAIN INPUT FIELDS  */}

            {/* FIRST NAME LAST NAME  */}

            <div className="mt-10 flex flex-col text-center justify-center items-center sm:flex-row gap-6 w-[100vw]">
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ border: "2px solid black" }}
                  type={"text"}
                  placeholder={"First Name"}
                  name={"firstname"}
                  value={studentState?.firstname}
                  className={
                    "h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none "
                  }
                />
              </div>
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ border: "2px solid black" }}
                  type={"text"}
                  placeholder={"Last Name"}
                  name={"lastname"}
                  value={studentState?.lastname}
                  className={
                    "h-[3rem] w-[93vw] sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none"
                  }
                />
              </div>
            </div>

            {/* EMAIL   */}

            <div className="mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]">
              <Input
                onChangeFunc={onChangeInput}
                style={{ border: "2px solid black" }}
                type={"email"}
                placeholder={"Email"}
                name={"email"}
                value={studentState?.email}
                disabled={true}
                className={
                  "h-[3rem] w-[93vw] sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none "
                }
              />
            </div>

            {/* Country Password */}

            <div className="mt-4 flex flex-col text-center justify-center  items-center sm:flex-row gap-6 w-[100vw]">
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ border: "2px solid black" }}
                  type={"text"}
                  placeholder={"Phone Number"}
                  name={"phone"}
                  value={studentState?.phone}
                  className={
                    "h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none "
                  }
                />
              </div>

              <div className="relative">
                <div
                  onClick={() => setShowCity(!showCity)}
                  style={{ border: "2px solid black" }}
                  type={"text"}
                  className={
                    "h-[3rem] cursor-pointer w-[93vw] sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] flex justify-start items-center"
                  }
                >
                  <p style={{ color: colors?.icon_bg }}>
                    {studentState.city == ""
                      ? "Select City"
                      : studentState?.city}
                  </p>
                </div>
                {/* setregisterationState */}
                {showCity ? (
                  <div
                    style={{ backgroundColor: colors?.gray }}
                    type={"text"}
                    className={
                      "h-[10rem]  absolute top-[3.5rem] z-50 cursor-pointer w-[93vw] sm:w-[15rem] rounded-[0.5rem] pl-5 pr-4 pt-2 overflow-y-auto"
                    }
                  >
                    {cityData?.map((item, index) => {
                      return (
                        <p
                          key={index + 1}
                          onClick={() => {
                            setStudentState({
                              ...studentState,
                              city: item.name,
                            });
                            setShowCity(false);
                          }}
                          className="text-white mb-2"
                        >
                          {item?.name}
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            {/* 
         

            {/* BUTTONS */}
            <div className="mt-4 pb-4 flex w-[100%] justify-center text-center sm:items-start items-center flex-col sm:flex-row gap-6">
              <Button
                onClickFunc={() => updateProfile()}
                style={{ backgroundColor: colors?.sky_blue2 }}
                btnValue={loader ? "Loading ..." : "Update Profile"}
                className={
                  "w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
                }
              />
            </div>

            <div className="mt-4 pb-4 flex w-[100%] justify-center text-center sm:items-start items-center flex-col sm:flex-row gap-6">
              <Button
                onClickFunc={() => setIsPopupOpen(true)}
                style={{ backgroundColor: colors?.sky_blue2 }}
                btnValue={"Change Password"}
                className={
                  "w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
                }
              />
            </div>
          </div>
        </div>
      ) : null}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {isPopupOpen && (
        <div className="absolute top-0 left-0 w-screen h-[100%] bg-black bg-opacity-50">
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <ChangePasswordPopup
              setIsPopupOpen={setIsPopupOpen}
              userId={studentId}
              userEmail={studentState.email}
              role={role}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
