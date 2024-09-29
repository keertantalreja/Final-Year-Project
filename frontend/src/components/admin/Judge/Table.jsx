import React, { useState } from 'react'
import Popup from './Popup'
import { useDeleteJudgeMutation } from '../../../services/api/api'
import { AiFillDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = ({ judgeData }) => {
    const [searchValue, setSearchValue] = useState("")
    const [createJudgePopup, setCreateJudgePopup] = useState(false)
    const [deleteJudge] = useDeleteJudgeMutation()
    const deleteAccount = async (id) => {
        const result = await deleteJudge(id)
        if (result.data?.msg === "DELETED") {
            toast.success("Judge Deleted")
        }
        else {
            console.log(result)
        }
    }
    return (

        <div className={`font-roboto w-[100%] h-[100%] flex flex-col p-5 overflow-y-auto`}>

            {/* SEARCH FILTER  */}
            <div className='mb-5 flex justify-between items-center gap-x-4'>
                <input onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder='Search ...' className='flex-1 bg-white rounded-md outline-none border-2 border-[#E9EBED] pl-2 pr-3 w-[100%] h-[2.7rem]' />
                <button onClick={() => setCreateJudgePopup(true)} className='bg-white rounded-md  border-2 border-[#E9EBED] w-[6rem] text-sm sm:text-base sm:w-[10rem] h-[2.7rem]'>Add Judge</button>
            </div>

            {/* TABLE  */}

            {
                judgeData && judgeData?.length > 0 ?

                    <div className='w-full overflow-x-scroll md:overflow-x-auto bg-white '>
                        <table className='w-full'>

                            <thead>
                                <tr className=''>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Id</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Name</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Email</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>CV</th>
                                    {/* <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Hackathon Assign</th> */}
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>City</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Phone</th>
                                    <th className='pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>Action</th>
                                </tr>
                            </thead>

                            <tbody className=''>

                                {
                                    judgeData?.filter((item) => {
                                        return searchValue ? item?._id.toLowerCase().includes(searchValue.toLowerCase()) || item?.firstname.toLowerCase().includes(searchValue.toLowerCase()) || item?.lastname.toLowerCase().includes(searchValue.toLowerCase()) || item?.email.toLowerCase().includes(searchValue.toLowerCase()) || item?.city.toLowerCase().includes(searchValue.toLowerCase()) : true
                                    })
                                        ?.map((item) => {
                                            return (
                                                <tr key={item._id}>
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?._id}</td>
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.firstname + item?.lastname}</td>
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.email}</td>
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'><a href={item?.cv} download={true}>{item?.cv ? "Download" : "-"}</a></td>
                                                    {/* <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>10</td> */}
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.city}</td>
                                                    <td className='p-4 text-sm text-gray-600 whitespace-nowrap border-2 border-[#E9EBED] tracking-wider'>{item?.phone}</td>
                                                    <td className='pt-4 pb-4 pl-2 pr-2 text-lg text-gray-600 border-2 border-[#E9EBED] tracking-wider'>
                                                        <AiFillDelete onClick={() => deleteAccount(item?._id)} className='inline cursor-pointer' />
                                                    </td>
                                                </tr>

                                            )
                                        })
                                }


                            </tbody>

                        </table>
                    </div>

                    : <h1 className='text-lg text-center mt-5'>No Judge Found</h1>

            }

            {/* ADD JUDGE ACCOUNT POPUP  */}

            <div>
                {
                    createJudgePopup && (
                        <div className='absolute w-[100%] h-screen top-0 left-0 bg-black bg-opacity-50'>
                            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                                <Popup setCreateJudgePopup={setCreateJudgePopup} />
                            </div>
                        </div>
                    )
                }
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

export default Table
