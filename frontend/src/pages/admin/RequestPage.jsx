import React, { useEffect } from 'react'
import Main from '../../components/admin/JudgeRequest/Main'
import { useNavigate } from 'react-router-dom'

const RequestPage = () => {

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

export default RequestPage
