import React, { useEffect } from 'react'
import Main from '../../components/admin/Payments/Main'
import { useNavigate } from 'react-router-dom'

const PaymentsPage = () => {

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

export default PaymentsPage
