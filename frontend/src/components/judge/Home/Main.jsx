import React from 'react'
import Navbar from './Navbar'
import HackathonListing from './HackathonListing'
import {judgeJwtDecode} from '../../../services/jwtDecoder'


const Main = () => {

  const judgeId = judgeJwtDecode()?.createUser?._id

  return (
    <div>
      <Navbar/>
      <HackathonListing judgeId={judgeId} />
    </div>
  )
}

export default Main
