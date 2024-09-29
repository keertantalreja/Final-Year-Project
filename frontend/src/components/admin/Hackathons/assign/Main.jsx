import React, { useState } from 'react'
import Dashboard from '../../Dashboard'
import { useLocation } from 'react-router-dom'
import Table from './Table'
import { useAvailableJudgeQuery } from '../../../../services/api/api'

const Main = () => {
  const [showSidebar, setshowSidebar] = useState(false)
  let id = useLocation().pathname.split('/')[5]
  let judge = useAvailableJudgeQuery().currentData
  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Table id={id} judge={judge} setshowSidebar={setshowSidebar} />} />
    </div>
  )
}

export default Main