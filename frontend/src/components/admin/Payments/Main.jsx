import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import Listing from './Listing'
import { useGetAllPaymentsQuery, useGetAllStudentQuery } from '../../../services/api/api'
import { AdminjwtDecodeFunction } from '../../../services/jwtDecoder'
const Main = () => {

  const [showSidebar, setshowSidebar] = useState(false)
  // const paymentData = useGetAllPaymentsQuery().data
  const judgeId = AdminjwtDecodeFunction().createUser?._id

  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Listing id={judgeId} setshowSidebar={setshowSidebar} />} />
    </div>
  )
}

export default Main
