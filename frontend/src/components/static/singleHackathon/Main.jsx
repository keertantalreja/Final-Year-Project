import React from 'react'
import Navbar from '../../dynamic/navbar/Navbar'
import SingleHackathon from './SingleHackathon'
import { useLocation } from 'react-router-dom'
import { useGetSingleHackathonQuery } from '../../../services/api/api'

const Main = () => {
  const id = useLocation().pathname.split('/')[3]

  const { data: hackathonData, refetch } = useGetSingleHackathonQuery(id);

  return (
    <div>
      <Navbar />
      <SingleHackathon hackathonData={hackathonData} refetch={refetch} />
    </div>
  )
}

export default Main
