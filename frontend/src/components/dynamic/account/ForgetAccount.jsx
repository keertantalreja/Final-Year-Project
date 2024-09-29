import React, { useEffect, useState } from "react";
import { colors } from "../../../constant/color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../input/Input";
import Button from "../button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OTPInput from "react-otp-input";
import {
  useChangePasswordForAdminMutation,
  useChangePasswordForJudgeMutation,
  useChangePasswordForStudentMutation,
  useSendOtpToAdminMutation,
  useSendOtpToJudgeMutation,
  useSendOtpToStudentMutation,
  useVerifyOtpForAdminMutation,
  useVerifyOtpForJudgeMutation,
  useVerifyOtpForStudentMutation,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetAccount = ({ role }) => {
  // THREE STEPS FOR FORGET PASSWORD
  const [isForget, setisForget] = useState(true);
  const [isOtp, setisOtp] = useState(false);
  const [isChangePassword, setisChangePassword] = useState(false);

  // SHOW AND HIDE PASSWORD STATE
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [showError, setshowError] = useState(false);

  // THREE STEPS INPUT VALUE STATE
  const [otpValue, setotpValue] = useState(0);

  const [sendOtpState, setsendOtpState] = useState({
    email: "",
  });
  const [verifyOtpState] = useState({
    email: localStorage?.getItem("email"),
    otp: otpValue,
  });
  const [changePasswordState, setchangePasswordState] = useState();

  // NAVIGATION
  const nav = useNavigate();
  // CURRENT PATH
  let currentLocation = useLocation().pathname.split("/")[1];

  // API FOR EACH USER
  const [sendOtpToStudent] = useSendOtpToStudentMutation();
  const [verifyOtpForStudent] = useVerifyOtpForStudentMutation();
  const [changePasswordForStudent] = useChangePasswordForStudentMutation();

  const [sendOtpToJudge] = useSendOtpToJudgeMutation();
  const [verifyOtpForJudge] = useVerifyOtpForJudgeMutation();
  const [changePasswordForJudge] = useChangePasswordForJudgeMutation();

  const [sendOtpToAdmin] = useSendOtpToAdminMutation();
  const [verifyOtpForAdmin] = useVerifyOtpForAdminMutation();
  const [changePasswordForAdmin] = useChangePasswordForAdminMutation();
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onChangesendOtpState = (e) => {
    setsendOtpState({ ...sendOtpState, [e.target.name]: e.target.value });
  };

  const onChangechangePasswordState = (e) => {
    setchangePasswordState(e.target.value);
  };

  // SUBMISSION OF FORM
  const submitSendOtp = async (e) => {
    e.preventDefault();
    if (!sendOtpState.email) {
      toast.error("All Fields Are Required");
    } else if (emailPattern.test(sendOtpState.email)) {
      if (role === "student") {
        let result = await sendOtpToStudent(sendOtpState);
        if (result?.data) {
          if (result?.data?.msg == "Otp Has Been To Your Email") {
            toast("Otp Has Sent To Your Email");
            localStorage.setItem("email", sendOtpState.email);
            setTimeout(() => {
              setisForget(false);
              setisOtp(true);
              setsendOtpState({ email: "" });
            }, 3000);
          }
        } else if (result.error) {
          if (result.error.status === 404) {
            toast.error("Email Not Registered");
          }
        }
      } else if (role === "judge") {
        let result = await sendOtpToJudge(sendOtpState);
        if (result?.data?.msg == "Otp Has Been To Your Email") {
          toast("Otp Has Sent To Your Email");
          localStorage.setItem("email", sendOtpState.email);
          setTimeout(() => {
            setisForget(false);
            setisOtp(true);
            setsendOtpState({ email: "" });
          }, 3000);
        } else if (result.error) {
          if (result.error.status === 404) {
            toast.error("Email Not Registered");
          }
        }
      } else if (role === "admin") {
        let result = await sendOtpToAdmin(sendOtpState);
        if (result?.data?.msg == "Otp Has Been To Your Email") {
          toast("Otp Has Sent To Your Email");
          localStorage.setItem("email", sendOtpState.email);
          setTimeout(() => {
            setisForget(false);
            setisOtp(true);
            setsendOtpState({ email: "" });
          }, 3000);
        } else if (result.error) {
          if (result.error.status === 404) {
            toast.error("Email Not Registered");
          }
        }
      }
    } else {
      toast.error("Email Should Be Valid");
    }
  };

  const submitVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpValue) {
      toast.error("All Fields Are Required");
    } else {
      if (role === "student") {
        let result = await verifyOtpForStudent({
          email: localStorage.getItem("email"),
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setTimeout(() => {
              setisOtp(false);
              setisChangePassword(true);
              setotpValue(0);
            }, 3000);
          }
        } else if (result.error) {
          if (result.error.status === 403) {
            toast.error("Invalid Otp");
          } else if (result.error.status === 410) {
            toast.error("Otp Has Been Expired");
            setTimeout(() => {
              setisForget(true);
              setisOtp(false);
              otpValue("");
            }, 3000);
          }
        }
      } else if (role === "judge") {
        let result = await verifyOtpForJudge({
          email: localStorage.getItem("email"),
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setTimeout(() => {
              setisOtp(false);
              setisChangePassword(true);
              otpValue(0);
            }, 3000);
          }
        } else if (result.error) {
          if (result.error.status === 403) {
            toast.error("Invalid Otp");
          } else if (result.error.status === 410) {
            toast.error("Otp Has Been Expired");
            setTimeout(() => {
              setisForget(true);
              setisOtp(false);
              otpValue("");
            }, 3000);
          }
        }
      } else if (role === "admin") {
        let result = await verifyOtpForAdmin({
          email: localStorage.getItem("email"),
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setTimeout(() => {
              setisOtp(false);
              setisChangePassword(true);
              otpValue(0);
            }, 3000);
          }
        } else if (result.error) {
          if (result.error.status === 403) {
            toast.error("Invalid Otp");
          } else if (result.error.status === 410) {
            toast.error("Otp Has Been Expired");
            setTimeout(() => {
              setisForget(true);
              setisOtp(false);
              otpValue("");
            }, 3000);
          }
        }
      }
    }
  };

  const submitChangePassword = async (e) => {
    e.preventDefault();
    if (!changePasswordState) {
      toast.error("All Fields Are Required");
    } else if (passwordPattern.test(changePasswordState)) {
      if (changePasswordState != verifyPassword) {
        toast.error("Password Not Match");
      } else {
        if (role === "student") {
          let result = await changePasswordForStudent({
            email: localStorage.getItem("email"),
            password: changePasswordState,
          });
          if (result?.data) {
            if (result?.data?.message === "Your Password Has Been Changed") {
              toast("Password Changed");
              localStorage.removeItem("email");
              setTimeout(() => {
                nav("/");
              }, 3000);
            }
          } else if (result.error) {
            if (result.error.status === 401) {
              toast.error("Otp Not Verified");
              localStorage.removeItem("email");
              setTimeout(() => {
                setisForget(true);
                setisChangePassword(false);
                setchangePasswordState({ password: "" });
              }, 3000);
            }
          }
        } else if (role === "judge") {
          let result = await changePasswordForJudge(changePasswordState);
          if (result?.data) {
            if (result?.data?.message === "Your Password Has Been Changed") {
              toast("Password Changed");
              localStorage.removeItem("email");
              setTimeout(() => {
                nav("/judge");
              }, 3000);
            }
          } else if (result.error) {
            if (result.error.status === 401) {
              toast.error("Otp Not Verified");
              localStorage.removeItem("email");
              setTimeout(() => {
                setisForget(true);
                setisChangePassword(false);
                setchangePasswordState({ password: "" });
              }, 3000);
            }
          }
        } else if (role === "admin") {
          let result = await changePasswordForAdmin(changePasswordState);
          if (result?.data) {
            if (result?.data?.message === "Your Password Has Been Changed") {
              toast("Password Changed");
              localStorage.removeItem("email");
              setTimeout(() => {
                nav("/admin");
              }, 3000);
            }
          } else if (result.error) {
            if (result.error.status === 401) {
              toast.error("Otp Not Verified");
              localStorage.removeItem("email");
              setTimeout(() => {
                setisForget(true);
                setisChangePassword(false);
                setchangePasswordState({ password: "" });
              }, 3000);
            }
          }
        }
      }
    } else {
      setshowError(true);
      setTimeout(() => {
        setshowError(false);
      }, 2000);
    }
  };

  return (
    <div
      style={{ backgroundColor: colors?.dark_blue }}
      className="w-screen h-screen overflow-x-hidden overflow-y-auto sm:overflow-y-hidden  p-0 sm:p-8 font-popins"
    >
      {/* HEADEIND AND NAVIGATION */}
      <div className="flex w-[100%] justify-between p-4 sm:p-0">
        <div className="flex sm:gap-x-3 gap-x-2 items-center">
          <div
            style={{ backgroundColor: colors?.sky_blue }}
            className="sm:w-[1.5rem] w-[1rem] h-[1rem] sm:h-[1.5rem] rounded-full"
          ></div>
          <h1 className="text-white text-lg tracking-wider">
            Hackathon <span style={{ color: colors?.sky_blue }}>.</span>{" "}
          </h1>
        </div>

        <div>
          <Link
            to={"/"}
            style={{
              color:
                currentLocation == "forget" ? colors.sky_blue2 : colors?.gray,
            }}
            className="mr-4 text-sm"
          >
            Student
          </Link>
          <Link
            to={"/judge"}
            style={{
              color:
                currentLocation == "judge" ? colors.sky_blue2 : colors?.gray,
            }}
            className="text-sm"
          >
            Judge
          </Link>
        </div>
      </div>

      {/* MAIN FORM  */}

      <div className="sm:h-[89vh] h-[70vh] flex sm:justify-start items-center mt-10 sm:mt-0 mb-10 sm:mb-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isForget) {
              submitSendOtp(e);
            } else if (isOtp) {
              submitVerifyOtp(e);
            } else if (isChangePassword) {
              submitChangePassword(e);
            }
          }}
        >
          <div className="p-4 sm:p-0">
            <p style={{ color: colors?.gray }} className="text-sm">
              START FOR FREE
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-3 text-white">
              {"Forget Your Password"}{" "}
              <span style={{ color: colors.sky_blue }}>.</span>
            </h1>
            <p
              style={{ color: colors?.gray }}
              className="mt-2 text-sm tracking-wider"
            >
              No worries ! you can change your{" "}
              <span
                style={{ color: colors.sky_blue }}
                className="cursor-pointer"
              >
                password
              </span>
            </p>
          </div>

          {/* ENTER EMAIL INPUT  */}
          {isForget ? (
            <div className="mt-5 flex justify-start ml-4 sm:ml-0 mr-4 sm:mr-0 items-center sm:block w-[100vw] sm:w-[100%]">
              <Input
                onChangeFunc={onChangesendOtpState}
                style={{ backgroundColor: colors?.input_bg }}
                type={"email"}
                placeholder={"Email"}
                name={"email"}
                className={
                  "h-[3rem] w-[90vw]  sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                }
              />
            </div>
          ) : null}

          {/* ENTER OTP INPUT  */}
          {isOtp ? (
            <div className="sm:ml-0 ml-4">
              <OTPInput
                value={otpValue}
                onChange={setotpValue}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "4rem",
                  height: "4rem",
                  marginTop: "1rem",
                  backgroundColor: colors?.input_bg,
                  marginRight: "10px",
                  color: colors.sky_blue,
                  marginBottom: "1rem",
                  outline: "none",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  fontWeight: "bolder",
                  fontSize: "1.5rem",
                }}
              />
            </div>
          ) : null}

          {/* CHANGE PASSWORD LAST STEP */}

          {isChangePassword ? (
            <div className="mt-10 flex flex-col  sm:flex-row gap-6 w-[100vw] sm:ml-0 ml-4 mr-4 sm:mr-0">
              <div className="relative  w-[90vw]  sm:w-[15rem]">
                <Input
                  onChangeFunc={onChangechangePasswordState}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={!showPassword ? "password" : "text"}
                  placeholder={"New Password"}
                  name={"password"}
                  className={
                    "h-[3rem] w-[90vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
                {showPassword ? (
                  <AiFillEye
                    onClick={() => setshowPassword(!showPassword)}
                    style={{ color: colors?.icon_bg }}
                    className="text-xl absolute top-4 right-4 cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setshowPassword(!showPassword)}
                    style={{ color: colors?.icon_bg }}
                    className="text-xl absolute top-4 right-4 cursor-pointer"
                  />
                )}
              </div>

              <div className="relative w-[90vw]  sm:w-[15rem]">
                <Input
                  style={{ backgroundColor: colors?.input_bg }}
                  onChangeFunc={(e) => setVerifyPassword(e.target.value)}
                  type={!showPassword2 ? "password" : "text"}
                  placeholder={"Confirm Password"}
                  name={"firstname"}
                  className={
                    "h-[3rem] w-[90vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
                {showPassword2 ? (
                  <AiFillEye
                    onClick={() => setshowPassword2(!showPassword2)}
                    style={{ color: colors?.icon_bg }}
                    className="text-xl absolute top-4 right-4 cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setshowPassword2(!showPassword2)}
                    style={{ color: colors?.icon_bg }}
                    className="text-xl absolute top-4 right-4 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ) : null}

          {/* BUTTON  */}
          <div className="mt-4 w-[100vw] flex  sm:justify-start sm:items-start flex-col sm:ml-0 ml-4 mr-4 sm:flex-row gap-6">
            <Button
              onClickFunc={() => nav("/")}
              style={{ backgroundColor: colors?.btn_bg }}
              btnValue={"Login Page"}
              className={
                "w-[90vw] sm:w-[15rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
              }
            />
            <Button
              style={{ backgroundColor: colors?.sky_blue2 }}
              btnValue={isChangePassword ? "Change Password" : "Continue"}
              className={
                "w-[90vw] sm:w-[15rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
              }
            />
          </div>
        </form>
      </div>
      {showError ? (
        <div
          style={{ backgroundColor: colors?.gray }}
          className=" absolute top-[2rem] right-3  h-fit p-3 w-fit text-red-900"
        >
          <p className="mb-2">Password Must Contain</p>
          <p className="mb-2">Atleast 1 Upper Case</p>
          <p className="mb-2">Atleast 1 Lower Case</p>
          <p className="mb-2">Atleast 1 Special Char</p>
          <p className="mb-2">Atleast 1 Number</p>
          <p className="mb-2">Minimum Length 8</p>
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
    </div>
  );
};

export default ForgetAccount;
