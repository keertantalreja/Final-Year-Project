import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteStudentMutation } from "../../../services/api/api";

const Table = ({ studentData, refetch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [deleteStudent] = useDeleteStudentMutation();
  const deleteAccount = async (id) => {
    const result = await deleteStudent(id);
    if (result.data?.msg === "DELETED") {
      toast.success("Student Deleted");
      refetch();
    } else {
      console.log(result);
    }
  };

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col p-5 overflow-y-auto`}
    >
      {/* SEARCH FILTER  */}
      <div className="mb-5">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Search ..."
          className="bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]"
        />
      </div>

      {/* TABLE  */}

      {studentData && studentData.length > 0 ? (
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
                  Level
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Level Progress
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="">
              {studentData
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
                          .includes(searchValue.toLowerCase())
                    : true;
                })
                .map((item) => {
                  return (
                    <tr key={item?.id}>
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
                        {item?.level}
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider">
                        {item?.levelProgress}%
                      </td>
                      <td className="pt-4 pb-4 pl-2 pr-2 text-lg text-gray-600 border-2 border-[#E9EBED] tracking-wider">
                        <AiFillDelete
                          onClick={() => deleteAccount(item?._id)}
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
        <h1 className=" text-center mt-5 text-lg">NO STUDENT FOUND</h1>
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
