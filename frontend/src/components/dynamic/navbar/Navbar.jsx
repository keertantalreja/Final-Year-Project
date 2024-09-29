import React, { useState } from "react";
import { colors } from "../../../constant/color";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showNavbar, setshowNavbar] = useState(false);
  const nav = useNavigate();
  const logoutFunction = () => {
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <>
      <div
        style={{ backgroundColor: colors?.navBg }}
        className="relative w-screen h-[6rem] sm:h-[5rem] p-4 font-popins  text-white flex justify-between items-center"
      >
        <div>
          <Link
            to={"/student/home"}
            className="text-2xl font-semibold cursor-pointer"
          >
            Code With Ease{" "}
            <span style={{ color: colors?.sky_blue }} className="text-3xl">
              .
            </span>
          </Link>
        </div>

        <div className="sm:block  hidden font-thin">
          {localStorage.getItem("token") ? (
            <div className="flex gap-x-3">
              <Link to={"/student/home"} className="tracking-wider">
                Home
              </Link>
              <Link to={"/student/achievements"} className="tracking-wider">
              Achievements
              </Link>
              <Link to={"/student/payment"} className="tracking-wider">
                Payment
              </Link>
              {/* <Link to={"/student/home"} className=" tracking-wider">
                Notification
              </Link> */}
              <Link to={"/student/profile"} className=" tracking-wider">
                Profile
              </Link>
              <p className="cursor-pointer" onClick={logoutFunction}>
                Logout
              </p>
            </div>
          ) : (
            <div className="flex gap-x-4">
              <Link to={"/student/home"} className="tracking-wider">
                Home
              </Link>
              <Link to={"/"} className="cursor-pointer">
                Login
              </Link>
            </div>
          )}
        </div>

        {/* RESPONSIVE CODE  */}

        <div className="sm:hidden block">
          <GiHamburgerMenu
            onClick={() => setshowNavbar((prev) => !prev)}
            className="text-3xl cursor-pointer"
          />
        </div>

        {showNavbar ? (
          <div
            style={{ backgroundColor: colors?.navBg }}
            className="sm:hidden block p-4 w-screen absolute top-[5rem] right-0"
          >
            {localStorage.getItem("token") ? (
              <div>
                <Link to={"/student/home"} className=" tracking-wider block">
                  Home
                </Link>
                <Link to={"/student/achievements"} className=" tracking-wider block">
                  Achievements
                </Link>
                <Link to={"/student/payment"} className=" tracking-wider block">
                  Payment
                </Link>
                {/* <Link to={"/student/home"} className=" tracking-wider block">
                  Notification
                </Link> */}
                <Link to={"/student/profile"} className=" tracking-wider block">
                  Profile
                </Link>
                <p className="cursor-pointer" onClick={logoutFunction}>
                  Logout
                </p>
              </div>
            ) : (
              <Link to={"/"} className="cursor-pointer block">
                Login
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
