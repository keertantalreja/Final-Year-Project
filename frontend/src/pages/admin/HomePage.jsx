import React, { useEffect } from 'react'
import Main from '../../components/admin/User/Main'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const nav = useNavigate()
  useEffect(()=>{
    !localStorage.getItem('admintoken') && nav('/admin')
  },[])

  return (
    <div>
      <Main/>
    </div>
  )
}

export default HomePage
