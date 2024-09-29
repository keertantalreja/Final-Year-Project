import React, { useState } from 'react'
import { useRegisterJudgeByAdminMutation } from '../../../services/api/api';
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewModal = ({ setOnlinePaymentPopup, onClick, item }) => {
    const [loading, setLoading] = useState(false);
    console.log(item)

    return (

        <div className='bg-white w-[100%] sm:w-fit rounded-md p-4 ml-4 mr-4 sm:ml-0 sm:mr-0'>

            {/* HEADING AND CLOSE ICON  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-xl'><span className='text-[#1d90f4]'>VIEW IMAGE</span></h1>
                <ImCross onClick={() => {
                    setOnlinePaymentPopup(false)
                }} className='cursor-pointer' />
            </div>

            {/* Online Payment Image  */}

            <div className='h-[450px] w-[350px] mt-5'>
                <img src={item?.paymentEvidence} alt="" style={{
                    height: "450px",width:"100%"
                }} />
            </div>



            {/* BUTTON  */}

            <div className='mt-0 sm:mt-4' onClick={() => {
                setLoading(true);
                onClick();
                setOnlinePaymentPopup(false)
            }}>
                <button className='bg-[#1d90f4] text-white rounded-md w-[100%] h-[2.5rem]'>{loading ? "Loading ..." : "Approve"}</button>
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

export default ViewModal
