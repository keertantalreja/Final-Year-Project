import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import Listing from './Listing'
import { useGetAllHackathonQuery } from '../../../services/api/api'

const Main = () => {

  const [showSidebar, setshowSidebar] = useState(false)
  let hackathonData = useGetAllHackathonQuery().data
  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Listing hackathonData={hackathonData} setshowSidebar={setshowSidebar}/>}/>
    </div>
  )
}

export default Main
