import React, { useState } from 'react'
import Dashboard from '../../Dashboard'
import Single from './Single'
import { useLocation } from 'react-router-dom'
import { useGetSingleHackathonQuery } from '../../../../services/api/api'

const Main = () => {

  const [showSidebar, setshowSidebar] = useState(false)
  let id = useLocation().pathname.split('/')[5]
  let hackathonData = useGetSingleHackathonQuery(id).data
  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Single hackathonData={hackathonData} setshowSidebar={setshowSidebar} />} />
    </div>
  )
}

export default Main
