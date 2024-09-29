import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateHackathonMutation } from '../../../services/api/api';


const Popup = ({ setShowPopup,id}) => {
    const [questionImage, setQuestionImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null);
    const [updateHackathon] = useUpdateHackathonMutation()


    const handleImageChange = (e) => {
        setQuestionImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };
    const uploadQuestion = async () => {
        setLoading(true)
        if (!questionImage) {
            setLoading(false)
            toast.error("Please Upload Question Paper")
        }
        else {
            const formData = new FormData()
            formData.append("questionImage", questionImage)
            let result = await updateHackathon({ id: id, data: formData })
            if (result?.data) {
                setLoading(false)
                toast.success("Question Paper Added")
                setTimeout(() => {
                    setShowPopup(false)
                }, 3000);
            }
            else {
                setLoading(false)
                toast.error("Unexpected Error")
            }
        }
    }

    return (



        <div className='bg-white w-[20rem] rounded-md p-4 ml-4 mr-4 sm:ml-0 sm:mr-0'>

            {/* HEADING AND CLOSE ICON  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-xl'><span className='text-[#1d90f4]'>UPLOAD</span> QUESTION !</h1>
                <ImCross onClick={() => setShowPopup(false)} className='cursor-pointer' />
            </div>



            {/* UPLOAD QUESTION PAPER  */}

            <div className={`bg-white flex justify-center items-center rounded-md  border-2 border-[#E9EBED] w-[100%] h-[2.5rem] mt-8 mb-2`}>
                <label htmlFor="file-input">
                    <button className={`text-[#818283]`} onClick={handleClick}>{questionImage?.name ? "File Uploaded" : "Upload Question Paper"}</button>
                </label>
                <input id="file-input" type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            {/* BUTTON  */}
            <div className='mt-0 sm:mt-2' onClick={uploadQuestion}>
                <button className='bg-[#1d90f4] text-white rounded-md w-[100%] h-[2.5rem]'>{loading ? "Loading ..." : "Upload Question"}</button>
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
