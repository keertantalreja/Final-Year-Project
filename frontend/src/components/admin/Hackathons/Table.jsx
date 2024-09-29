import React, { useState } from "react";
import Popup from "./Popup";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { useDeleteHackathonMutation } from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import UpdatePopup from "./UpdatePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = ({ hackathonData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [createHackathonPopup, setCreateHackathonPopup] = useState(false);
  const [updateHackathonPopup, setUpdateHackathonPopup] = useState(false);
  const [hackathonId, sethackathonId] = useState("");
  const navigate = useNavigate();
  const [deleteHackathon] = useDeleteHackathonMutation();

  const deleteHackathonFunction = async (id) => {
    let result = await deleteHackathon(id);
    if (result?.data?.msg === "DELETED") {
      toast.success("Hackathon Deleted");
    }
  };

  function formatUnderscoredString(inputString) {
    if (inputString.includes("_")) {
      return inputString
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    } else {
      return (
        inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
      );
    }
  }

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col p-5 overflow-y-auto`}
    >
      {/* SEARCH FILTER  */}
      <div className="mb-5 flex justify-between items-center gap-x-4">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Search ..."
          className="flex-1 bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]"
        />
        <button
          onClick={() => setCreateHackathonPopup(true)}
          className="bg-white rounded-md  border-2 border-[#E9EBED] w-[6rem] text-sm sm:text-base sm:w-[10rem] h-[2.7rem]"
        >
          Add Hackathon
        </button>
      </div>

      {hackathonData && hackathonData?.length > 0 ? (
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
                  Category
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Assign
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Judge Name
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Question Paper
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
                  Test Duration
                </th>

                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {hackathonData
                ?.filter((item) => {
                  return searchValue
                    ? item?._id?.includes(searchValue) ||
                        item?.title?.includes(searchValue) ||
                        item?.fees === Number(searchValue) ||
                        item?.testDuration === Number(searchValue)
                    : item;
                })
                .map((item) => {
                  return (
                    <tr key={item?._id}>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?._id}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.title}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.category == ""
                          ? "Not Selected"
                          : formatUnderscoredString(item?.category)}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider">
                        {item?.judge ? (
                          "assigned"
                        ) : (
                          <button
                            className="cursor-pointer bg-[#1d90f4] text-white p-2 rounded-md"
                            onClick={() =>
                              navigate(
                                `/admin/dashboard/hackathons/assisgn/${item._id}`
                              )
                            }
                          >
                            Assign Hackathon
                          </button>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.judge ? item?.judge?.firstname : "-"}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.questionImage ? (
                          <a href={item?.questionImage}>Download</a>
                        ) : (
                          "-"
                        )}
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
                        {item?.testDuration}
                      </td>

                      <td className="pt-4 pb-4 pl-2 pr-2 text-lg text-gray-600 border-2 border-[#E9EBED] tracking-wider">
                        <AiFillEye
                          className="inline mr-3 cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/admin/dashboard/hackathons/single/${item?._id}`
                            )
                          }
                        />
                        <AiFillEdit
                          className="inline mr-3 cursor-pointer"
                          onClick={() => {
                            setUpdateHackathonPopup(true),
                              sethackathonId(item._id);
                          }}
                        />
                        <AiFillDelete
                          onClick={() => deleteHackathonFunction(item?._id)}
                          className="inline cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center mt-10">NO HACTHON FOUND</h1>
      )}

      {/* TABLE  */}

      {/* CREATE HACKATHON POPUP  */}
      <div>
        {createHackathonPopup && (
          <div className="absolute w-[100%] h-screen top-0 left-0 bg-black bg-opacity-50">
            <div className="w-[100%] h-[100%] flex justify-center items-center">
              <Popup setCreateHackathonPopup={setCreateHackathonPopup} />
            </div>
          </div>
        )}
      </div>

      {/* UPDATE HACKATHON POPUP  */}
      <div>
        {updateHackathonPopup && (
          <div className="absolute w-[100%] h-screen top-0 left-0 bg-black bg-opacity-50">
            <div className="w-[100%] h-[100%] flex justify-center items-center">
              <UpdatePopup
                hackathonId={hackathonId}
                setUpdateHackathonPopup={setUpdateHackathonPopup}
              />
            </div>
          </div>
        )}
      </div>

      {/* TOASTIFY CONTAINER  */}
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

export default Table;
