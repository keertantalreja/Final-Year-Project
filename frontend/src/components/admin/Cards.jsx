import React from "react";
import {
  useGetAllHackathonQuery,
  useGetAllJudgeQuery,
  useGetAllStudentQuery,
} from "../../services/api/api";

const Cards = () => {
  const hackathonData = useGetAllHackathonQuery().data;
  const judgeData = useGetAllJudgeQuery().data;
  const studentData = useGetAllStudentQuery().data;

  return (
    <div className="flex flex-nowrap gap-x-5 overflow-x-scroll p-4">
      <div className="w-[20rem] min-w-[15rem] h-[8rem] rounded-md bg-[#fff] p-4 shadow-cardShadow">
        <h1 className="text-lg">Total Students</h1>
        <p className="text-lg">{studentData?.length || 0}</p>
      </div>

      <div className="w-[20rem] min-w-[15rem] h-[8rem] rounded-md bg-[#fff] p-4 shadow-cardShadow">
        <h1 className="text-lg">Total Judge</h1>
        <p className="text-lg">{judgeData?.length || 0}</p>
      </div>

      <div className="w-[20rem] min-w-[15rem] h-[8rem] rounded-md bg-[#fff] p-4 shadow-cardShadow">
        <h1 className="text-lg">Running Hackathons</h1>
        <p className="text-lg">{hackathonData?.length || 0}</p>
      </div>

      {/* <div className='w-[20rem] min-w-[15rem] h-[8rem] rounded-md bg-[#fff] p-4 shadow-cardShadow'>
                <h1 className='text-lg'>Expire Hackathons</h1>
                <p className='text-lg'>100+</p>
            </div> */}
    </div>
  );
};

export default Cards;
