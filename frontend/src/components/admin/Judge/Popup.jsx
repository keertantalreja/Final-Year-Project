import React, { useState } from 'react'
import {useRegisterJudgeByAdminMutation } from '../../../services/api/api';
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({ setCreateJudgePopup }) => {

  const [judgeData, setJudgeData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: 0,
    city: ""
  })
  let [registerJudgeByAdmin] = useRegisterJudgeByAdminMutation()
  const [loading, setLoading] = useState(false)
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onChangeInput = (e) => {
    setJudgeData({ ...judgeData, [e.target.name]: e.target.value })
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    if (!judgeData.city || !judgeData.email || !judgeData.firstname || !judgeData.lastname || !judgeData.password || !judgeData.phone) {
      setLoading(false)
      toast.error("All Fields Are Required")
    }
    else if (!passwordPattern.test(judgeData.password)) {
      setLoading(false)
      toast.error("Password must contain Aa1%")
    }
    else if (!emailPattern.test(judgeData.email)) {
      setLoading(false)
      toast.error("Enter Valid Email")
    }
    else {
      let result = await registerJudgeByAdmin(judgeData)
      if (result?.data?.token) {
        setLoading(false)
        toast.success("Account Created")
        setTimeout(() => {
          setCreateJudgePopup(false)
        }, 3000);
      }
      else if (result?.error) {
        setLoading(false)
        if (result?.error?.status === 403) {
          setLoading(false)
          toast.error("Email Already Registered")
        }
        else{
          setLoading(false)
          toast.error("Unexpected Error")
        }
      }
    }
  }

  
  return (

    <div className='bg-white w-[100%] sm:w-fit rounded-md p-4 ml-4 mr-4 sm:ml-0 sm:mr-0'>

      {/* HEADING AND CLOSE ICON  */}
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'><span className='text-[#1d90f4]'>CREATE</span> ACCOOUNT !</h1>
        <ImCross onClick={() => setCreateJudgePopup(false)} className='cursor-pointer' />
      </div>

      {/* MAIN NAME EMAIL EMAIL AND PASSWORD FIELDS  */}

      {/* FIRST NAME LAST NAME  */}
      <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>
        <input onChange={onChangeInput} name='firstname' type="text" placeholder='First Name' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
        <input onChange={onChangeInput} name='lastname' type="text" placeholder='Last Name' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
      </div>

      {/* EMAIL PHONE NUMBER  */}
      <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>
        <input onChange={onChangeInput} name='email' type="text" placeholder='Email' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
        <input onChange={onChangeInput} name='phone' type="number" placeholder='Phone Number' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
      </div>

      {/* CITY AND PASSWORD  */}
      <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>
        <input onChange={onChangeInput} name='city' type="text" placeholder='City' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
        <input onChange={onChangeInput} name='password' type="text" placeholder='Password' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
      </div>

      {/* BUTTON  */}

      <div className='mt-0 sm:mt-4' onClick={onSubmit}>
        <button className='bg-[#1d90f4] text-white rounded-md w-[100%] h-[2.5rem]'>{loading?"Loading ...":"Create Account"}</button>
      </div>

      {/* TOASTIFY CONTAINER  */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />



    </div>
  )
}

export default Popup
