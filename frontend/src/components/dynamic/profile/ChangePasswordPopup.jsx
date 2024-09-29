import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Input from "../input/Input";
import { colors } from "../../../constant/color";
import Button from "../button/Button";
import {
  useResetPasswordMutation,
  useValidatePasswordMutation,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OTPInput from "react-otp-input";

const ChangePasswordPopup = ({ setIsPopupOpen, userId, userEmail, role }) => {
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

  const [isOtp, setisOtp] = useState(false);
  const [isChangePassword, setisChangePassword] = useState(false);

  const [sendOtpState, setsendOtpState] = useState({
    email: userEmail,
  });

  const [currentPassword, setCurrentPassword] = useState({
    currentPassword: "",
  });

  const [newPassword, setNewPaswword] = useState({
    newPassword: "",
    userId: "",
  });

  const onChangeInput = (e) => {
    setCurrentPassword({ ...currentPassword, [e.target.name]: e.target.value });
  };

  const onChangeInputForNewPassword = (e) => {
    setNewPaswword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const [valiadtePassword, validateJudgePassword] =
    useValidatePasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [loading, setLoading] = useState(false);
  const [isPasswordValidate, setIsPasswordValiadte] = useState(false);

  // THREE STEPS INPUT VALUE STATE
  const [otpValue, setotpValue] = useState(0);

  const submitSendOtp = async () => {
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
  };

  const submitVerifyOtp = async () => {
    if (!otpValue) {
      toast.error("All Fields Are Required");
    } else {
      if (role === "student") {
        let result = await verifyOtpForStudent({
          email: userEmail,
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setisOtp(false);
            setIsPasswordValiadte(true);
            setotpValue(0);
          }
        } else if (result.error) {
          if (result.error.status === 403) {
            toast.error("Invalid Otp");
          } else if (result.error.status === 410) {
            toast.error("Otp Has Been Expired");
            setisOtp(false);
            setIsPasswordValiadte(true);
            setotpValue(0);
          }
        }
      } else if (role === "judge") {
        let result = await verifyOtpForJudge({
          email: userEmail,
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setisOtp(false);
            setIsPasswordValiadte(true);
            setotpValue(0);
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
            }, 1500);
          }
        }
      } else if (role === "admin") {
        let result = await verifyOtpForAdmin({
          email: userEmail,
          otp: otpValue,
        });
        if (result?.data) {
          if (result.data.message === "Otp Has Been Verified") {
            toast("Otp Verified");
            setTimeout(() => {
              setisOtp(false);
              setIsPasswordValiadte(true);
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

  const validateUserPassword = async () => {
    setLoading(true);
    try {
      const result = await valiadtePassword({
        id: userId,
        data: { currentPassword: currentPassword.currentPassword },
      }).unwrap();
      console.log(result);
      toast.success("Current password is validated");
      submitSendOtp();
      setisOtp(true);
      //   refetch();
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetUserPassword = async () => {
    setLoading(true);
    try {
      const result = await resetPassword({
        data: { password: newPassword.newPassword, userId: userId },
      }).unwrap();
      console.log(result);
      toast.success("Password has been reset");
      setIsPasswordValiadte(false);
      setIsPopupOpen(false);
      //   refetch();
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 bg-white font-roboto rounded-md w-[30%]">
      <div className="flex justify-between items-center">
        <p className="text-[#1d90f4] font-serif text-xl">
          {isOtp
            ? "Verify OTP"
            : isPasswordValidate
            ? "Reset Password"
            : "Validate Password"}
        </p>
        <ImCross
          className="cursor-pointer"
          onClick={() => setIsPopupOpen(false)}
        />
      </div>

      {isPasswordValidate ? (
        <>
          <div className="mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]">
            <Input
              onChangeFunc={onChangeInputForNewPassword}
              style={{ backgroundColor: "white" }}
              type={"pssword"}
              placeholder={"New Password"}
              name={"newPassword"}
              value={newPassword?.newPassword}
              className={
                "h-[2.5rem] w-[100%] pl-5 pr-4 rounded-[0.5rem] text-black border-2"
              }
            />
          </div>

          <Button
            onClickFunc={resetUserPassword}
            style={{ backgroundColor: colors?.sky_blue2 }}
            btnValue={loading ? "Loading..." : "Reset Password"}
            className={
              "w-[100%] text-white text-sm h-[2.5rem] shadow-btnShdow1 rounded-[10px] mt-4"
            }
          />
        </>
      ) : isOtp ? (
        <>
          {" "}
          <div className="mt-5 flex justify-center items-center w-[100%]">
            <OTPInput
              value={otpValue}
              onChange={setotpValue}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                marginTop: "1rem",
                border: "1px solid lightgray",
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
          <Button
            onClickFunc={submitVerifyOtp}
            style={{ backgroundColor: colors?.sky_blue2 }}
            btnValue={loading ? "Loading..." : "Verify OTP"}
            className={
              "w-[100%] text-white text-sm h-[2.5rem] shadow-btnShdow1 rounded-[10px] mt-4"
            }
          />
        </>
      ) : (
        <>
          {" "}
          <div className="mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]">
            <Input
              onChangeFunc={onChangeInput}
              style={{ backgroundColor: "white" }}
              type={"pssword"}
              placeholder={"Current Password"}
              name={"currentPassword"}
              value={currentPassword?.currentPassword}
              className={
                "h-[2.5rem] w-[100%] pl-5 pr-4 rounded-[0.5rem] text-black border-2"
              }
            />
          </div>
          <Button
            onClickFunc={validateUserPassword}
            style={{ backgroundColor: colors?.sky_blue2 }}
            btnValue={loading ? "Loading..." : "Validate Password"}
            className={
              "w-[100%] text-white text-sm h-[2.5rem] shadow-btnShdow1 rounded-[10px] mt-4"
            }
          />
        </>
      )}
    </div>
  );
};

export default ChangePasswordPopup;
