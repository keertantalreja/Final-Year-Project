import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
const Single = ({ setshowSidebar,hackathonData }) => {
    return (
        <div className='w-[100%] h-[100%] bg-[#fbfcfe] overflow-y-auto pt-4 pb-4 overflow-x-auto relative pl-5 pr-5'>

            {/* HACKATHONS AND HAMBURGER MENU  */}
            <div className=' mb-5 flex justify-between items-center'>
                <h1 className='text-xl'><span className='text-[#1d90f4]'>SINGLE</span> HACKATHON !</h1>
                <GiHamburgerMenu onClick={() => setshowSidebar(true)} className='block md:hidden text-[#6b7488] rounded-md text-xl cursor-pointer' />
            </div>

            <div>
                {/* HACKATHON COVER IMAGE  */}
                <div className='flex justify-center items-center'>
                    <img className=' h-[25rem] bg-center rounded-md bg-cover' src={hackathonData?.coverImage||"https://c4.wallpaperflare.com/wallpaper/632/34/549/technology-monitor-alpha-coders-binary-wallpaper-preview.jpg"} alt="" />
                </div>

                {/* TITLE AND DESCRIPTION  */}
                <div className='mt-8'>
                    <h1 className='text-xl'>{hackathonData?.title}</h1>
                    <p className='mt-3 text-[#6b7483] text-sm leading-6'>{hackathonData?.description}</p>
                </div>
            </div>


        </div>
    )
}

export default Single
