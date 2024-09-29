import React, { useEffect, useState } from "react";
import {
  useApprovePaymentMutation,
  useGetAllPaymentsQuery,
} from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentjwtDecodeFunction } from "../../../services/jwtDecoder";

const PaymentTable = ({ searchValue, isPaymentForm }) => {
  console.log(searchValue);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState("");
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [approvePayment] = useApprovePaymentMutation();
  // const [searchValue, setSearchValue] = useState("")
  // var queryData = useGetAllPaymentsQuery().data;
  const { data: queryData, refetch } = useGetAllPaymentsQuery();
  const studentId = StudentjwtDecodeFunction();

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  useEffect(() => {
    refetch();
  }, [isPaymentForm]);

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col overflow-y-auto`}
    >
      {/* SEARCH FILTER  */}
      {/* <div className='mb-5'>
                <input onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder='Search ...' className='bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]' />
            </div> */}

      {/* TABLE  */}

      {data && data.length > 0 ? (
        <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white ">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Id
                </th>
                {/* <th className='pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>First Name</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Last Name</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Email</th> */}
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Hackathon
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Type
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Amount
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Date
                </th>
                <th className="pb-2 pt-2 pl-4 pr-4 text-lg  font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="">
              {data
                ?.filter((item) => {
                  return searchValue
                    ? item?._id
                        .toLowerCase()
                        .includes(searchValue?.toLowerCase()) ||
                        item?.student?.firstname
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        item?.student?.lastname
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                        item?.student?.email
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                })
                .filter(
                  (item) => studentId.findUser?._id === item?.student?._id
                )
                .map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td className="p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                        {item?._id}
                      </td>
                      {/* <td className='p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.student?.firstname}</td>
                                                <td className='p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.student?.lastname}</td>
                                                <td className='p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.student?.email}</td> */}
                      <td className="p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                        {item?.hackthon?.title}
                      </td>
                      <td className="p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                        {item?.paymentType}
                      </td>
                      <td className="p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                        {item?.amount}
                      </td>
                      <td className="p-3 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider text-center">
                        {item?.paymentDate.slice(0, 10)}
                      </td>
                      <td className="pt-4 pb-4 pl-2 pr-2 text-sm text-gray-600 border-2 border-[#E9EBED] tracking-wider text-center">
                        {/* <button className={`text-sm p-2 bg-blue-600 ${item?.isApproved ? "opacity-50" : "opacity-100"} w-[100%] text-white rounded-md`} disabled={true} onClick={() => { }}>
                                                        {item?.isApproved ? "Approved" : loading && loadingId == item?._id ? "Loading..." : item?.paymentType == "ONLINE" ? "View And Approve" : "Approve"}
                                                    </button>
                                                    <AiFillDelete onClick={() => approveStudentPayment(item?._id)} className='inline cursor-pointer' /> */}
                        {item?.isApproved ? "Approved" : "Approval on Pending"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className=" text-center mt-5 text-lg">NO Payments Found</h1>
      )}
    </div>
  );
};

export default PaymentTable;
