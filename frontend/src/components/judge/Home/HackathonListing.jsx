import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  useGetJudgeHackthonsQuery,
  useGetSingleJudgeQuery,
} from "../../../services/api/api";
import Popup from "./Popup";

const HackathonListing = ({ judgeId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState("");
  const nav = useNavigate();
  const data = useGetJudgeHackthonsQuery(judgeId).data;
  const judgeData = useGetSingleJudgeQuery(judgeId).data;
  return (
    <div className="ml-5 mr-5 mt-10 font-popins">
      {/* HEADING  */}
      <h1 className="text-xl mb-10">
        <span className="text-[#1d90f4]">WELCOME</span>{" "}
        {judgeData?.firstname + " " + judgeData?.lastname} 
      </h1>

      {!judgeData?.approved && !judgeData?.decline && (
        <h1 className="sm:text-xl text-center mt-10 mb-10 ">
          Your Account Approval Request is Pending
        </h1>
      )}
      {!judgeData?.approved && judgeData?.decline && (
        <h1 className="sm:text-xl text-center mt-10 mb-10 ">
          Your Account Approval Request is Decline
        </h1>
      )}

      {/* SEARCH FILTER  */}
      {data & (data?.length > 0) ? (
        <div className="mb-5 ">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search ..."
            className="flex-1 bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]"
          />
        </div>
      ) : null}

      {data && data.length > 0 ? (
        <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white ">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Id
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Hackathon Title
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Participant
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Fees
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Starting Date
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Ending Date
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Expired
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Test Duration
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Upload Question
                </th>
                {<th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Upload Result
                </th>}
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  View
                </th>
              </tr>
            </thead>

            <tbody className="">
              {data
                ?.filter((item) => {
                  return searchValue
                    ? item?._id
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    item?.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    item?.participant?.length === Number(searchValue) ||
                    item?.fees === Number(searchValue)
                    : true;
                })
                ?.map((item) => {
                  return (
                    <tr key={item?._id}>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?._id}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.title}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.participant?.length || 0}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.fees}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.startingDate}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.endingDate}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        False
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.testDuration}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.questionImage ? (
                          <a href={item?.questionImage}>Download</a>
                        ) : (
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              setShowPopup(true), setId(item?._id);
                            }}
                          >
                            Upload Question Paper
                          </p>
                        )}
                      </td>
                      {<td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.questionImage == null ? <span>N/A</span> : item?.isResultUploaded ? (
                          <span>Uploaded</span>
                        ) : (
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              nav(`/judge/upload-result/${item?._id}`);
                            }}
                          >
                            Upload Result
                          </p>
                        )}
                      </td>}
                      <td
                        className="pt-4 pb-4 pl-2 pr-2 text-lg text-gray-600 border-2 border-[#E9EBED] tracking-wider"
                        onClick={() => nav(`/judge/hackathon/${item?._id}`)}
                      >
                        <AiFillEye className="cursor-pointer text-center w-[100%]" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-lg text-center mt-10">NO HACKATHON ASSIGNED</h1>
      )}

      {/* POPUP  */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <Popup id={id} setShowPopup={setShowPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonListing;
