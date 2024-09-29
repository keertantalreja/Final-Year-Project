import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetSingleHackathonQuery, useUpdateHackathonMutation } from '../../../services/api/api';
import { Select } from 'antd';

const UpdatePopup = ({ setUpdateHackathonPopup, hackathonId }) => {

    let hackathonData = useGetSingleHackathonQuery(hackathonId).data

    const [HackathonData, setHackathonData] = useState({
        title: hackathonData?.title,
        description: hackathonData?.description,
        startingDate: hackathonData?.startingDate,
        endingDate: hackathonData?.endingDate,
        testDuration: hackathonData?.testDuration,
        fees: hackathonData?.fees,
        category: hackathonData?.category
    })

    const [coverImage, setCoverImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null);
    const [updateHackathon] = useUpdateHackathonMutation()

    const handleImageChange = (e) => {
        setCoverImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };
    const onChangeInput = (e) => {
        setHackathonData({ ...HackathonData, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('title', HackathonData.title ? HackathonData.title : hackathonData.title)
        formData.append('description', HackathonData.description ? HackathonData.description : hackathonData.description)
        formData.append('startingDate', HackathonData.startingDate ? HackathonData.startingDate : hackathonData.startingDate)
        formData.append('endingDate', HackathonData.endingDate ? HackathonData.endingDate : hackathonData.endingDate)
        formData.append('fees', HackathonData.fees ? HackathonData.fees : hackathonData.fees)
        formData.append('coverImage', coverImage)
        formData.append('testDuration', HackathonData.testDuration ? HackathonData.testDuration : hackathonData.testDuration)
        formData.append('category', category !== "" ? category : hackathonData.category)

        console.log(HackathonData)
        let result = await updateHackathon({ id: hackathonId, data: formData })
        if (result?.data) {
            toast.success("Hackathon Updated")
            setLoading(false)
            setTimeout(() => {
                setUpdateHackathonPopup(false)
            }, 3000);
        }
        else {
            console.log(result.error)
            setLoading(false)
            toast.error("Unexpected Error")
        }


    }

    const CATEGORIES = [
        {
            label: "Java Script",
            value: "JAVA_SCRIPT",
        },
        {
            label: "UI/UX",
            value: "UI_UX",
        },
        {
            label: "Object Oriented Programming",
            value: "OBJECT_ORIENTED_PROGRAMMING",
        },
        {
            label: "Java",
            value: "JAVA",
        },
        {
            label: "Python",
            value: "PYTHON",
        },
        {
            label: "Go Lang",
            value: "GO_LANG",
        },
        {
            label: "Micro Services",
            value: "MICROSERVICES",
        },
        {
            label: "Database",
            value: "DATABASE",
        },
        {
            label: "React JS",
            value: "REACT_JS",
        },

        {
            label: "Node JS",
            value: "NODE_JS",
        },
        {
            label: "Block Chain",
            value: "BLOCK_CHAIN",
        },
    ];

    const [category, setCategory] = useState("");

    return (
        <div className='bg-white w-[100%] sm:w-fit rounded-md p-4 ml-4 mr-4 sm:ml-0 sm:mr-0'>

            {/* HEADING AND CLOSE ICON  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-xl'><span className='text-[#1d90f4]'>UPDATE</span> HACKATHON !</h1>
                <ImCross onClick={() => setUpdateHackathonPopup(false)} className='cursor-pointer' />
            </div>

            {/* MAIN NAME EMAIL EMAIL AND PASSWORD FIELDS  */}

            {/* TITLE DESCRIPTION  */}
            <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>

                <div>
                    <p className='mb-1 font-poppin text-[#757575]'>Title</p>
                    <input defaultValue={hackathonData?.title} onChange={onChangeInput} name='title' type="text" placeholder='Title' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
                <div>
                    <p className='mb-1 font-poppin text-[#757575]'>Description</p>
                    <input defaultValue={hackathonData?.description} onChange={onChangeInput} name='description' type="text" placeholder='Description' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
            </div>

            {/* STARTING ENDING DATE  */}
            <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>

                <div className='w-[100%]'>
                    <p className='mb-1 font-poppin text-[#757575]'>Starting Date</p>
                    <input defaultValue={hackathonData?.startingDate} onChange={onChangeInput} name='startingDate' type="date" placeholder='Starting Date' className='flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
                <div className='w-[100%]'>
                    <p className='mb-1 font-poppin text-[#757575]'>Ending Date</p>
                    <input defaultValue={hackathonData?.endingDate} onChange={onChangeInput} name='endingDate' type="date" placeholder='Ending Date' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
            </div>

            {/* TEST DURATIION AND*/}
            <div className='block sm:flex sm:gap-x-4 sm:items-center mt-4'>

                <div>
                    <p className='mb-1 font-poppin text-[#757575]'>Test Duration</p>
                    <input defaultValue={hackathonData?.testDuration} onChange={onChangeInput} name='testDuration' type="number" placeholder='Test Duration' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
                <div>
                    <p className='mb-1 font-poppin text-[#757575]'>Fees</p>
                    <input defaultValue={hackathonData?.fees} onChange={onChangeInput} name='fees' type="number" placeholder='Fees' className=' flex-none block w-[100%] mb-4 sm:mb-0 sm:flex-1 outline-none pl-2 pr-2 bg-white rounded-md h-[2.4rem] border-2 border-[#E9EBED] ' />
                </div>
            </div>

            {/* Category*/}
            <div className='sm:items-center mt-4'>
                <div>
                    <p className='mb-1 font-poppin text-[#757575]'>Category</p>
                    <Select
                        showSearch
                        value={category !== "" ? category :  hackathonData?.category}
                        style={{ width: "100%", height: 36 }}
                        placeholder="Select Category"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(e) => {
                            setCategory(e)
                            // console.log(e);
                            // dispatch(setCountryId(e));
                        }}
                        options={CATEGORIES}
                    /> </div>

            </div>



            {/* UPLOAD IMAGE  */}

            <div className={`bg-white flex justify-center items-center rounded-md  border-2 border-[#E9EBED] w-[100%] h-[2.5rem] mt-4`}>
                <label htmlFor="file-input">
                    <button className={`text-[#818283]`} onClick={handleClick}>{coverImage?.name ? "File Uploaded" : "Upload Cover Image"}</button>
                </label>
                <input id="file-input" type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            {/* BUTTON  */}
            <div className='mt-3 sm:mt-2' onClick={onSubmit}>
                <button className='bg-[#1d90f4] text-white rounded-md w-[100%] h-[2.5rem]'>{loading ? "Loading ..." : "Update Hakathon"}</button>
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

export default UpdatePopup
