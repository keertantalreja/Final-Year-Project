import React, { useEffect } from 'react'
import Main from '../../components/admin/Judge/Main'
import { useNavigate } from 'react-router-dom'

const JudgesPage = () => {

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

export default JudgesPage
