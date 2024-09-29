import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import Listing from './Listing'
import { useGetAllJudgeQuery } from '../../../services/api/api'

const Main = () => {

    const [showSidebar, setshowSidebar] = useState(false)
    const judgeData =  useGetAllJudgeQuery().data

  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Listing judgeData={judgeData} setshowSidebar={setshowSidebar}/>}/>
    </div>
  )
}

export default Main
