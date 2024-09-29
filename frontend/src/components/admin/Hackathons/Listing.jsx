import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Table from './Table'
import Cards from '../Cards'

const Listing = ({setshowSidebar,hackathonData}) => {

  return (

    <div className='w-[100%] h-[100%] bg-[#fbfcfe] overflow-y-auto pt-4 pb-4 overflow-x-auto relative'>

      {/* HACKATHONS AND HAMBURGER MENU  */}
      <div className=' mb-5 flex justify-between items-center pl-4 pr-4'>
        <h1 className='text-xl'><span className='text-[#1d90f4]'>MANAGE</span> HACKATHONS !</h1>
        <GiHamburgerMenu onClick={()=>setshowSidebar(true)} className='block md:hidden text-[#6b7488] rounded-md text-xl cursor-pointer' />
      </div>

      {/* USER CARDS  */}
      <div>
        <Cards />
      </div>

      {/* HACKATHON TABLE  */}
      <div>
        <Table hackathonData={hackathonData}/>
      </div>

      

    </div>
  )
}

export default Listing
