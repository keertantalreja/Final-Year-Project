import React from 'react'
import { FaUser, FaUsers } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { SiNextra } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ component, setshowSidebar, showSidebar }) => {

    const nav = useNavigate()

    const logoutFunction = () => {
        localStorage.removeItem("admintoken")
        toast.success("Logout Sucessfull")
        setTimeout(() => {
            nav("/admin")
        }, 3000);
    }


    return (

        <div>
            <div className='font-popins flex items-start w-screen h-screen overflow-y-auto relative'>

                {/* LEFT SIDE NAV  */}
                <div className='w-[13rem] min-w-[13rem] h-screen overflow-y-scroll bg-[#282a37] pt-4 pb-4 relative hidden md:block'>

                    {/* HEADING  */}
                    <div>
                        <h1 className='text-center text-white text-lg font-semibold tracking-widest'><span className='text-[#1d90f4] '>Code</span> With Ease</h1>
                    </div>

                    {/* MAIN LINKS  */}
                    <div className='pl-2 pr-2 mt-10'>

                        <Link to={"/admin/dashboard/users"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <FaUser className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Students</p>
                        </Link>

                        <Link to={"/admin/dashboard/judges"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <FaUsers className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Judge</p>
                        </Link>

                        <Link to={"/admin/dashboard/hackathons"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <FaNoteSticky className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Hackathons</p>
                        </Link>

                        <Link to={"/admin/dashboard/judges/request"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <SiNextra className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Extras</p>
                        </Link>
                        <Link to={"/admin/dashboard/payments"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <FaUser className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Payments</p>
                        </Link>

                        <div onClick={logoutFunction} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                            <HiLogout className='text-sm' />
                            <p className='tracking-widest font-medium text-sm'>Logout</p>
                        </div>



                    </div>

                    {/* PROFILE ICONS  */}
                    <div className='absolute bottom-3 w-[92%] h-[2.5rem] rounded-md ml-2 mr-2 bg-[#6b7483]'></div>

                </div>

                {/* RESPONSIVE LEFT SIDE NAV  */}

                {
                    showSidebar && (

                        <div className='absolute top-0 left-0 w-[13rem] md:hidden block h-screen overflow-y-scroll bg-[#282a37] z-50  pt-4 pb-4'>

                            {/* HEADING  */}
                            <div className='flex justify-center items-center gap-x-4'>
                                <h1 className='text-center text-white  font-semibold tracking-widest'><span className='text-[#1d90f4] '>Code</span> With Ease</h1>
                                <ImCross className='text-[#1d90f4] cursor-pointer' onClick={() => setshowSidebar(false)} />
                            </div>

                            {/* MAIN LINKS  */}
                            {/* MAIN LINKS  */}
                            <div className='pl-2 pr-2 mt-10'>

                                <Link to={"/admin/dashboard/users"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <FaUser className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Students</p>
                                </Link>

                                <Link to={"/admin/dashboard/judges"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <FaUsers className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Judge</p>
                                </Link>

                                <Link to={"/admin/dashboard/hackathons"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <FaNoteSticky className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Hackathons</p>
                                </Link>

                                <Link to={"/admin/dashboard/judges/request"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <SiNextra className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Extras</p>
                                </Link>
                                <Link to={"/admin/dashboard/payments"} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <FaUser className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Payments</p>
                                </Link>

                                <div onClick={logoutFunction} className='flex items-center gap-x-3 text-white hover:bg-[#6b7483] p-2 rounded-md cursor-pointer mb-2'>
                                    <HiLogout className='text-sm' />
                                    <p className='tracking-widest font-medium text-sm'>Logout</p>
                                </div>

                            </div>

                            {/* PROFILE ICONS  */}
                            <div className='absolute bottom-3 w-[92%] h-[2.5rem] rounded-md ml-2 mr-2 bg-[#6b7483]'></div>

                        </div>
                    )
                }

                {/* MAIN PAGE CONTENT  */}
                <div className='flex-1 h-[100%] overflow-y-auto'>
                    {component}
                </div>

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

export default Dashboard
