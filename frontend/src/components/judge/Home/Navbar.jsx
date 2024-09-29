import React from "react";
import { HiLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutFunction = () => {
    localStorage.removeItem("judgetoken");
    toast.success("Logout Succesfull");
    setTimeout(() => {
      navigate("/judge");
    }, 3000);
  };

  return (
    <div>
      {/* MAIN NAVBAR CODE  */}

      <div className="font-popins w-screen pt-3 pb-3 pl-5 pr-5 shadow-inputSadow flex justify-between items-center">
        <div onClick={() => navigate("/judge/home")} className="cursor-pointer">
          <h1 className="text-lg tracking-wider font-medium">
            Code <span className="text-[#1d90f4]">With</span> Ease !{" "}
          </h1>
        </div>

        <div className="flex gap-x-5 items-start">
          <Link to={"/judge/profile"} className=" tracking-wider">
            <FaUser className="cursor-pointer text-[#717274] " />
          </Link>
          <HiLogout
            className="text-lg cursor-pointer text-[#717274] "
            onClick={logoutFunction}
          />
        </div>
      </div>

      {/* TOAST CONTAINER  */}
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

export default Navbar;
