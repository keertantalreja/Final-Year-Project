import React, { useState } from 'react'
import { colors } from '../../constant/color'
import Button from '../dynamic/button/Button'
import "../../components/static/style.css"
import Image1 from '../../assets/g3.avif'

const Header = () => {
  return (
    <>
      <div style={{backgroundImage:`url(${Image1})`,width:"100vw",backgroundSize:"cover"}} className="font-roboto flex justify-center items-center flex-col h-[88.5vh] bg-no-repeat">
        <Button  btnValue={"Participate In Hackathons"} style={{backgroundColor:colors?.sky_blue}} className={"mb-[2rem] text-white w-[14rem] h-[3rem] font-roboto rounded-lg shadow-btnShdow1"}/>
        <h1 className='text-2xl mb-4 ml-4 mr-4  text-white sm:text-3xl tracking-wide sm:pl-0 sm:pr-0 pl-4 pr-4 font-bold text-center leading-8'>Hackathon Season is Here! Participate in Hackathons and Win Exciting Prizes</h1>
        <h1 className='text-white ml-4 mr-4 text-lg text-center mt-2'>Enhance your skills and knowledge by participating in hackathons <span style={{ color: colors.sky_blue }}>#CodewithEase</span>.</h1>
      </div>


    </>
  )
}

export default Header