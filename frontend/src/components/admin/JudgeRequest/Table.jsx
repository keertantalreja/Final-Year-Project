import React, { useEffect, useState } from "react";
import {
  useGetApprovalQuery,
  useUpdateStatusMutation,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const judgeRequests = useGetApprovalQuery().data;
  const [searchValue, setsearchValue] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [updateStatus] = useUpdateStatusMutation();
  const updateStatusFunction = async (id, approved) => {
    let result = await updateStatus({ id: id, data: { approved: approved } });
    toast.success("Status Updated");
    setRefresh(!refresh);
    // if (result.data) {
    //   toast.success("Status Updated");
    // } else if (result.data.msg === "DECLINE") {
    //   toast.success("Status Updated");
    // }
  };

  useEffect(() => {
    console.log("fdkjhf");
  }, [refresh]);

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col p-5 overflow-y-auto`}
    >
      {/* SEARCH FILTER  */}
      <div className="mb-5 ">
        <input
          onChange={() => setsearchValue(e.target.value)}
          type="search"
          placeholder="Search ..."
          className="flex-1 bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]"
        />
      </div>

      {/* TABLE  */}
      <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white ">
        {judgeRequests ? (
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
                  Phone
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  City
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Resume
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-center font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="">
              {judgeRequests
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
                          .includes(searchValue.toLowerCase()) ||
                        item?.email
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        item?.city
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                })
                ?.map((item) => {
                  return (
                    <tr key={item?._id}>
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
                        {item?.phone}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.city}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        <a href={item?.cv}>Download</a>
                      </td>
                      <td className="p-4 text-sm border-2 border-[#E9EBED]">
                        <button
                          onClick={() => updateStatusFunction(item?._id, true)}
                          className="w-[4rem] h-[2.3rem] mr-2 rounded-md text-xs text-white bg-slate-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatusFunction(item?._id, false)}
                          className="w-[4rem] h-[2.3rem] mr-2 rounded-md text-xs text-white bg-red-700"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center mt-8">No Request Found</h1>
        )}
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

export default Table;
