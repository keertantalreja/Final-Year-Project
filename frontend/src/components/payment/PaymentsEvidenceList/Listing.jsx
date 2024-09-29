import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Payment from "./CreatePaymentEvidence";
import PaymentTable from "./Table";
import { colors } from "../../../constant/color";
import CreatePaymentEvidence from "./CreatePaymentEvidence";

const PaymentListing = () => {
  const [isPaymentForm, setPaymentForm] = useState(false);
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
            Payments <span style={{ color: colors?.sky_blue }}>.</span>
          </h1>
        </div>
      </div>

      <div className="w-[100%] h-[100%] overflow-y-auto pt-4 pb-4 overflow-x-auto relative">
        {isPaymentForm == true ? (
          <CreatePaymentEvidence
            setPaymentForm={setPaymentForm}
            isPaymentForm={isPaymentForm}
          />
        ) : (
          <>
            <div className="mb-5 flex justify-between items-center gap-x-4">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                placeholder="Search ..."
                className=" bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[85%] h-[2.7rem]"
              />
              <button
                onClick={() => {
                  setPaymentForm(!isPaymentForm);
                }}
                className="bg-blue-600 text-white rounded-md  border-2 border-[#E9EBED] text-sm sm:text-base h-[2.7rem] w-[15%] px-3"
              >
                Upload New Evidence
              </button>
            </div>

            <div>
              <PaymentTable
                searchValue={searchValue}
                isPaymentForm={isPaymentForm}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentListing;
