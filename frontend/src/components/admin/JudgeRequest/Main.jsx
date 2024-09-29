import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import Listing from './Listing'

const Main = () => {

    const [showSidebar, setshowSidebar] = useState(false)

  return (
    <div className=''>
      <Dashboard setshowSidebar={setshowSidebar} showSidebar={showSidebar} component={<Listing setshowSidebar={setshowSidebar}/>}/>
    </div>
  )
}

export default Main
