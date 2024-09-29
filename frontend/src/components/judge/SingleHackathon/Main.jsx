import React from 'react'
import Navbar from '../Home/Navbar'
import Single from './Single'
import { useLocation } from 'react-router-dom'
import {useGetSingleHackathonQuery} from '../../../services/api/api'

const Main = () => {

  const id = useLocation().pathname.split("/")[3]
  let hackathonData = useGetSingleHackathonQuery(id).data

  return (
    <div>
        <Navbar/>
        <Single hackathonData={hackathonData}/>
    </div>
  )
}

export default Main
