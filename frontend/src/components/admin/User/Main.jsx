import React, { useState } from "react";
import Dashboard from "../Dashboard";
import Listing from "./Listing";
import { useGetAllStudentQuery } from "../../../services/api/api";
import { AdminjwtDecodeFunction } from "../../../services/jwtDecoder";
const Main = () => {
  const [showSidebar, setshowSidebar] = useState(false);
  const { data: studentData, refetch } = useGetAllStudentQuery();
  const judgeId = AdminjwtDecodeFunction().createUser?._id;

  return (
    <div className="">
      <Dashboard
        setshowSidebar={setshowSidebar}
        showSidebar={showSidebar}
        component={
          <Listing
            id={judgeId}
            studentData={studentData}
            setshowSidebar={setshowSidebar}
            refetch={refetch}
          />
        }
      />
    </div>
  );
};

export default Main;
