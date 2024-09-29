import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRegisterJudgeMutation } from '../../services/api/api';

const ApplyPopup = ({ setApply }) => {

    const [judgeData, setJudgeData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: 0,
        city: "",
        degree: "",
        specialized: ""
    })
    let [registerJudge] = useRegisterJudgeMutation()
    const [image, setImage] = useState(null)
    const [cv, setCv] = useState(null)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null);
    const cvRef = useRef(null)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleCvChange = (e) => {
        setCv(e.target.files[0])
    };
    const handleCvClick = () => {
        cvRef.current.click();
    };
    const onChangeInput = (e) => {
        setJudgeData({ ...judgeData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!judgeData.city || !judgeData.email || !judgeData.firstname || !judgeData.lastname || !judgeData.password || !judgeData.phone || !judgeData.degree || !judgeData.specialized) {
            setLoading(false)
            toast.error("All Fields Are Required")
        }
        else if (image.length === 0 || cv.length === 0) {
            toast.error("Resume And Image Is Required")
        }
        else if (!emailPattern.test(judgeData.email)) {
            setLoading(false)
            toast.error("Enter Valid Email")
        }
        else if (!passwordPattern.test(judgeData.password)) {
            toast.error("Password Must Contain A$9a")
        }
        else {
            let formData = new FormData()
            formData.append("firstname", judgeData.firstname)
            formData.append("lastname", judgeData.lastname)
            formData.append("email", judgeData.email)
            formData.append("password", judgeData.password)
            formData.append("phone", judgeData.phone)
            formData.append("city", judgeData.city)
            formData.append("degree", judgeData.degree)
            formData.append("specialized", judgeData.specialized)
            formData.append("image", image)
            formData.append("cv", cv)
            let result = await registerJudge(formData)
            if (result?.data?.token) {
                setLoading(false)
                toast.success("Account Approval Request Send")
                setTimeout(() => {
                    setApply(false)
                }, 3000);
            }
            else if (result?.error) {
                setLoading(false)
                if (result?.error?.status === 403) {
                    setLoading(false)
                    toast.error("Email Already Registered")
                }
                else {
                    setLoading(false)
                    toast.error("Unexpected Error")
                }
            }
        }
    }


    return (

        <div className='bg-white sm:w-fit w-[100%] ml-3 mr-3 mt-8 rounded-md p-4 font-popins'>

            {/* HEADING AND CLOSE ICON  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg'>APPLY AS <span className='text-[#1d90f4]'>JUDGE !</span></h1>
                <ImCross className='cursor-pointer text-[#6b7483]' onClick={() => setApply(false)} />
            </div>

            {/* MAIN FORM ELEMENTS  */}

            <div>
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

                {/* DEGREE AND EDUCATION  */}
                <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>
                    <input onChange={onChangeInput} name='degree' type="text" placeholder='Degree' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                    <input onChange={onChangeInput} name='specialized' type="text" placeholder='Specialized In' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>


                {/* UPLOAD IMAGE  */}

                <div className={`bg-white flex justify-center items-center rounded-md  border-2 border-[#E9EBED] w-[100%] h-[2.5rem] mt-4`}>
                    <label htmlFor="file-input">
                        <button className={`text-[#818283]`} onClick={handleClick}>{image?.name ? "File Uploaded" : "Upload Image"}</button>
                    </label>
                    <input id="file-input" type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </div>

                {/* UPLOAD RESUME  */}

                <div className={`bg-white flex justify-center items-center rounded-md  border-2 border-[#E9EBED] w-[100%] h-[2.5rem] mt-4`}>
                    <label htmlFor="file-input">
                        <button className={`text-[#818283]`} onClick={handleCvClick}>{cv?.name ? "File Uploaded" : "Upload CV"}</button>
                    </label>
                    <input id="file-input" type="file" ref={cvRef} onChange={handleCvChange} style={{ display: 'none' }} />
                </div>

                {/* BUTTON  */}
                <div className='mt-2 sm:mt-4' onClick={onSubmit}>
                    <button className='bg-[#1d90f4] text-white rounded-md w-[100%] h-[2.5rem]'>{loading ? "Loading ..." : "Send Request"}</button>
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

        </div>
    )
}

export default ApplyPopup
