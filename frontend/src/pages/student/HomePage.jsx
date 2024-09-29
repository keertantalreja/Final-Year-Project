import React, { useEffect, useState } from 'react'
import Navbar from '../../components/dynamic/navbar/Navbar'
import Header from '../../components/static/Header'
import SearchBox from '../../components/static/SearchBox'
import Listing from '../../components/dynamic/hackathon/Listing'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const nav = useNavigate()
  // useEffect(()=>{
  //   !localStorage?.getItem("token")? nav("/"):null
  // },[])

  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("All");


  return (
    <div>
      <Navbar />
      <Header />
      <SearchBox setSearchValue={setSearchValue} filterValue={filterValue} setFilterValue={setFilterValue} />
      <Listing searchValue={searchValue} filterValue={filterValue} />
    </div>
  )
}

export default HomePage