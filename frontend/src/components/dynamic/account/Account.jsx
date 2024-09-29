import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../../constant/color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../input/Input";
import Button from "../button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  useLoginAdminMutation,
  useLoginJudgeMutation,
  useLoginStudentMutation,
  useRegisterAdminMutation,
  useRegisterJudgeMutation,
  useRegisterStudentMutation,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cityData } from "../../../constant/cities";

const Account = ({ role }) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [registerationState, setregisterationState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    degree: "",
    specialized: "",
  });
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const inputRef = useRef(null);
  const cvRef = useRef(null);
  const [showError, setshowError] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const nav = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };
  const handleCvClick = () => {
    cvRef.current.click();
  };

  let currentLocation = useLocation().pathname.split("/")[1];

  let [registerStudent] = useRegisterStudentMutation();
  let [registerJudge] = useRegisterJudgeMutation();
  let [registerAdmin] = useRegisterAdminMutation();
  let [loginStudent] = useLoginStudentMutation();
  let [loginJudge] = useLoginJudgeMutation();
  let [loginAdmin] = useLoginAdminMutation();

  if (currentLocation === "") {
    currentLocation = "student";
  }

  const onChangeInput = (e) => {
    if (role === "student") {
      if (isLogin) {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
      } else {
        setregisterationState({
          ...registerationState,
          [e.target.name]: e.target.value,
        });
      }
    } else if (role === "judge") {
      if (isLogin) {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
      } else {
        setregisterationState({
          ...registerationState,
          [e.target.name]: e.target.value,
        });
      }
    } else if (role === "admin") {
      if (isLogin) {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
      } else {
        setregisterationState({
          ...registerationState,
          [e.target.name]: e.target.value,
        });
      }
    }
  };
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (
      !isLogin
        ? passwordPattern.test(registerationState.password)
        : passwordPattern.test(loginState.password)
    ) {
      if (
        !isLogin
          ? emailPattern.test(registerationState.email)
          : emailPattern.test(loginState.email)
      ) {
        if (isLogin) {
          if (!loginState?.email || !loginState?.password) {
            toast.error("All Fields Are Required");
            setLoader(false);
          } else {
            if (role === "student") {
              let result = await loginStudent(loginState);
              if (result?.data?.token) {
                localStorage.setItem("token", result.data.token);
                toast("Account Login");
                setLoader(false);
                setTimeout(() => {
                  nav("/student/home");
                }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 404) {
                  toast.error("Email Not Registered");
                  setLoader(false);
                } else if (result?.error?.status === 400) {
                  toast.error("Invalid Credentails");
                  setLoader(false);
                }
              }
            } else if (role === "judge") {
              let result = await loginJudge(loginState);
              if (result?.data?.token) {
                localStorage.setItem("judgetoken", result.data.token);
                toast.success("Account Login");
                setLoader(false);
                setTimeout(() => {
                  nav("/judge/home");
                }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 404) {
                  toast.error("Email Not Registered");
                  setLoader(false);
                } else if (result?.error?.status === 400) {
                  toast.error("Invalid Credentails");
                  setLoader(false);
                }
              }
            } else if (role === "admin") {
              let result = await loginAdmin(loginState);
              if (result?.data?.token) {
                localStorage.setItem("admintoken", result?.data?.token);
                setLoader(false);
                toast("Account Login");
                setTimeout(() => {
                  nav("/admin/dashboard/users");
                }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 404) {
                  toast.error("Email Not Registered");
                  setLoader(false);
                } else if (result?.error?.status === 400) {
                  toast.error("Invalid Credentails");
                  setLoader(false);
                }
              }
            }
          }
        } else {
          if (
            !registerationState?.email ||
            !registerationState?.password ||
            !registerationState?.firstname ||
            !registerationState?.lastname ||
            !registerationState.city ||
            !registerationState.phone
          ) {
            toast.error("All Fields Are Required");
            setLoader(false);
          } else {
            if (role === "student") {
              let result = await registerStudent(registerationState);
              if (result?.data?.token) {
                // localStorage.setItem("token", result.data.token)
                setLoader(false);
                toast("Account Registered");
                let result = await loginStudent({
                  email: registerationState.email,
                  password: registerationState.password,
                });
                if (result?.data?.token) {
                  localStorage.setItem("token", result.data.token);
                  // toast("Account Login");
                  setLoader(false);
                  setTimeout(() => {
                    nav("/student/home");
                  }, 3000);
                }
                // setTimeout(() => {
                //   nav('/student/home')
                // }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 403) {
                  setLoader(false);
                  toast.error("Email Already Registered");
                }
              }
            } else if (role === "judge") {
              let formData = new FormData();
              formData.append("firstname", registerationState.firstname);
              formData.append("lastname", registerationState.lastname);
              formData.append("email", registerationState.email);
              formData.append("password", registerationState.password);
              formData.append("phone", registerationState.phone);
              formData.append("city", registerationState.city);
              formData.append("degree", registerationState.degree);
              formData.append("specialized", registerationState.specialized);
              formData.append("image", image);
              formData.append("cv", cv);
              let result = await registerJudge(formData);
              if (result?.data?.token) {
                localStorage.setItem("judgetoken", result.data.token);
                toast.success("Approval Request Send");
                setLoader(false);
                setTimeout(() => {
                  nav("/judge/home");
                }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 403) {
                  setLoader(false);
                  toast.error("Email Already Registered");
                }
              }
            } else if (role === "admin") {
              let result = await registerAdmin(registerationState);
              if (result?.data?.token) {
                localStorage.setItem("admintoken", result?.data?.token);
                toast("Account Registered");
                setLoader(false);
                setTimeout(() => {
                  nav("/admin/dashboard/users");
                }, 3000);
              } else if (result?.error) {
                if (result?.error?.status === 403) {
                  setLoader(false);
                  toast.error("Admin Already Present");
                }
              }
            }
          }
        }
      } else {
        toast.error("Email Should Be Valid");
        setLoader(false);
      }
    } else {
      toast.error("Password must contain Aa1%");
      setLoader(false);
    }
  };

  useEffect(() => {
    if (role === "student") {
      localStorage?.getItem("token") ? nav("/student/home") : null;
    }
  }, []);

  const changeState = () => {
    setisLogin(!isLogin);
    setregisterationState({ email: "", password: "" });
    setLoginState({ email: "", password: "" });
  };

  return (
    <div
      style={{ backgroundColor: colors?.dark_blue }}
      className="w-screen relative h-screen overflow-x-hidden overflow-y-auto  p-0 sm:p-8 font-popins"
    >
      {/* HEADEIND AND NAVIGATION */}
      <div className="flex w-[100%] justify-between p-4 sm:p-0 lg:mb-[2rem] sm:mb-[4rem] mb-[8rem]">
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
          {/* <Link to={"/payment"} style={{ color: currentLocation === "payment" ? colors.sky_blue2 : colors?.gray }} className='mr-4 text-sm'>Payment</Link> */}
          <Link
            to={"/"}
            style={{
              color:
                currentLocation === "student" ? colors.sky_blue2 : colors?.gray,
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

      <div
        className={`sm:h-[89vh] ${isLogin ? "h-[70vh]" : "h-[90%]"} ${
          currentLocation === "judge" && isLogin === false ? "pt-[10rem]" : null
        }   flex justify-start items-center mt-10sm:mt-0 mb-10 sm:mb-0`}
      >
        <div>
          <div className="p-4 sm:p-0">
            <p style={{ color: colors?.gray }} className="text-sm">
              START FOR FREE
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3 text-white">
              {!isLogin ? "Create new account" : "Login to account"}{" "}
              <span style={{ color: colors.sky_blue }}>.</span>
            </h1>
            <p
              style={{ color: colors?.gray }}
              className="mt-2 text-sm tracking-wider"
            >
              {!isLogin ? "Already" : "Not"} A Member ?{" "}
              <span
                onClick={changeState}
                style={{ color: colors.sky_blue }}
                className="cursor-pointer"
              >
                {!isLogin ? "Log In" : "Register"}
              </span>
            </p>
          </div>

          {/* MAIN INPUT FIELDS  */}

          {/* FIRST NAME LAST NAME  */}

          {!isLogin ? (
            <div className="mt-10 flex flex-col  items-center sm:flex-row gap-6 w-[100vw]">
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  placeholder={"First Name"}
                  name={"firstname"}
                  className={
                    "h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
              </div>

              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  placeholder={"Last Name"}
                  name={"lastname"}
                  className={
                    "h-[3rem] w-[93vw] sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
              </div>
            </div>
          ) : null}

          {/* EMAIL   */}

          <div className="mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]">
            <Input
              value={!isLogin ? registerationState.email : loginState.email}
              onChangeFunc={onChangeInput}
              style={{ backgroundColor: colors?.input_bg }}
              type={"email"}
              placeholder={"Email"}
              name={"email"}
              className={
                "h-[3rem] w-[93vw]  sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
              }
            />
          </div>

          {/* Country Password */}

          {!isLogin ? (
            <div className="mt-4 flex flex-col  items-center sm:flex-row gap-6 w-[100vw]">
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  placeholder={"Phone Number"}
                  name={"phone"}
                  className={
                    "h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
              </div>

              <div className="relative">
                <div
                  onClick={() => setShowCity(!showCity)}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  className={
                    "h-[3rem] cursor-pointer w-[93vw] sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem]  text-white flex justify-start items-center"
                  }
                >
                  <p style={{ color: colors?.icon_bg }}>
                    {!registerationState.city
                      ? "Select City"
                      : registerationState.city}
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
                            setregisterationState({
                              ...registerationState,
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
          ) : null}

          {!isLogin && currentLocation === "judge" && (
            <div className="mt-4 flex flex-col  items-center sm:flex-row gap-6 w-[100vw]">
              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  placeholder={"Degree"}
                  name={"degree"}
                  className={
                    "h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
              </div>

              <div>
                <Input
                  onChangeFunc={onChangeInput}
                  style={{ backgroundColor: colors?.input_bg }}
                  type={"text"}
                  placeholder={"Specialized In"}
                  name={"specialized"}
                  className={
                    "h-[3rem] w-[93vw] sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                  }
                />
              </div>
            </div>
          )}

          {!isLogin && currentLocation === "judge" && (
            <div>
              {/* UPLOAD IMAGE  */}

              <div
                className={`bg-[#323645] flex justify-center items-center rounded-md  border-2 border-[#323645] w-[93vw]  sm:w-[31.4rem] h-[2.5rem] mt-4`}
              >
                <label htmlFor="file-input">
                  <button className={`text-[#818283]`} onClick={handleClick}>
                    {image?.name ? "File Uploaded" : "Upload Image"}
                  </button>
                </label>
                <input
                  id="file-input"
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* UPLOAD RESUME  */}

              <div
                className={`bg-[#323645] flex justify-center items-center rounded-md  border-2 border-[#323645] w-[93vw] sm:w-[31.4rem] h-[2.5rem] mt-4`}
              >
                <label htmlFor="file-input">
                  <button className={`text-[#818283]`} onClick={handleCvClick}>
                    {cv?.name ? "File Uploaded" : "Upload CV"}
                  </button>
                </label>
                <input
                  id="file-input"
                  type="file"
                  ref={cvRef}
                  onChange={handleCvChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          )}

          {/* PASSWORD  */}
          <div className="mt-5">
            <div className="relative w-[100%] flex justify-center items-center sm:w-[31.4rem]">
              <Input
                value={
                  !isLogin ? registerationState.password : loginState.password
                }
                onChangeFunc={onChangeInput}
                style={{ backgroundColor: colors?.input_bg }}
                type={!showPassword ? "password" : "text"}
                placeholder={"Password"}
                name={"password"}
                className={
                  "h-[3rem] w-[93vw] sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"
                }
              />
              {!showPassword ? (
                <AiFillEye
                  onClick={() => setshowPassword(!showPassword)}
                  style={{ color: colors?.icon_bg }}
                  className=" absolute top-[0.85rem] sm:right-3 right-8 cursor-pointer text-xl"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setshowPassword(!showPassword)}
                  style={{ color: colors?.icon_bg }}
                  className=" absolute top-[0.85rem] sm:right-3 right-8 cursor-pointer text-xl"
                />
              )}
            </div>
          </div>

          {/* FORGET PASSWORD  */}
          {isLogin ? (
            <div
              style={{ color: colors?.sky_blue }}
              className="mt-3 flex justify-end items-end sm:mr-0 mr-4"
            >
              {currentLocation === "student" ? (
                <Link to={"/forget/password"} className="text-sm">
                  Forget Password ?
                </Link>
              ) : null}
              {currentLocation === "judge" ? (
                <Link to={"/judge/forget/password"} className="text-sm">
                  Forget Password ?
                </Link>
              ) : null}
              {currentLocation === "admin" ? (
                <Link to={"/admin/forget/password"} className="text-sm">
                  Forget Password ?
                </Link>
              ) : null}
            </div>
          ) : null}

          {/* BUTTONS */}
          <div className="mt-4 pb-4 flex justify-center sm:justify-start sm:items-start items-center flex-col sm:flex-row gap-6">
            {role === "student" ? (
              <Button
                onClickFunc={onSubmitForm}
                style={{ backgroundColor: colors?.sky_blue2 }}
                btnValue={
                  !isLogin
                    ? loader
                      ? "Loading ..."
                      : "Create Student account"
                    : loader
                    ? "Loading ..."
                    : "Login Student Account"
                }
                className={
                  "w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
                }
              />
            ) : null}

            {role === "judge" ? (
              <Button
                onClickFunc={onSubmitForm}
                style={{ backgroundColor: colors?.sky_blue2 }}
                btnValue={
                  !isLogin
                    ? loader
                      ? "Loading ..."
                      : "Apply As A Judge"
                    : loader
                    ? "Loading ..."
                    : "Login Judge Account"
                }
                className={
                  "w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
                }
              />
            ) : null}
            {role === "admin" ? (
              <Button
                onClickFunc={onSubmitForm}
                style={{ backgroundColor: colors?.sky_blue2 }}
                btnValue={
                  !isLogin
                    ? loader
                      ? "Loading ..."
                      : "Create Admin account"
                    : loader
                    ? "Loading ..."
                    : "Login Admin Account"
                }
                className={
                  "w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"
                }
              />
            ) : null}
          </div>
        </div>
      </div>

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

export default Account;
