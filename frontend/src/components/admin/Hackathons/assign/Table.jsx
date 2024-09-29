import React, { useState } from "react";
import { useAssignHackathonMutation } from "../../../../services/api/api";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Table = ({ id, judge, setshowSidebar }) => {
  const [searchValue, setSearchValue] = useState("");
  const [assignHackathon] = useAssignHackathonMutation();
  const nav = useNavigate();

  const assignHackathonFunction = async (judgeId) => {
    let result = await assignHackathon({ id: id, data: { judge: judgeId } });
    if (result?.data) {
      toast.success("Hackathon Assign");
      setTimeout(() => {
        nav("/admin/dashboard/hackathons");
      }, 3000);
    }
  };

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col p-5 overflow-y-auto`}
    >
      {/* HACKATHONS AND HAMBURGER MENU  */}
      <div className=" mb-5 flex justify-between items-center">
        <h1 className="text-xl">
          <span className="text-[#1d90f4]">ASSIGN</span> HACKATHON !
        </h1>
        <GiHamburgerMenu
          onClick={() => setshowSidebar(true)}
          className="block md:hidden text-[#6b7488] rounded-md text-xl cursor-pointer"
        />
      </div>
      {/* SEARCH FILTER  */}
      <div className="mb-5 flex justify-between items-center gap-x-4">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Search ..."
          className="flex-1 bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]"
        />
      </div>

      {/* TABLE  */}

      {judge && judge?.length > 0 ? (
        <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white ">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Id
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Name
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Email
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  CV
                </th>
                {/* <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Hackathon Assign</th> */}
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  City
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Phone
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider cursor-pointer">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="">
              {judge
                ?.filter((item) => {
                  return searchValue
                    ? item?._id
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                        item?.firstname
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        item?.lastname
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                })
                ?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?._id}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.firstname + item?.lastname}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.email}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        <a href={item?.cv} download={true}>
                          {item?.cv ? "Download" : ""}
                        </a>
                      </td>
                      {/* <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>10</td> */}
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.city}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.phone}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] ">
                        <button
                          onClick={() => assignHackathonFunction(item?._id)}
                          className="cursor-pointer bg-[#1d90f4] text-white p-2 rounded-md"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-lg text-center mt-5">No Judge AVAILABLE</h1>
      )}

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
