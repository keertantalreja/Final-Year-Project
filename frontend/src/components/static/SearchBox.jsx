import React, { useEffect, useState } from 'react'
import Input from '../dynamic/input/Input'
import Button from '../dynamic/button/Button'
import { FaSearch } from 'react-icons/fa'
import { colors } from '../../constant/color'


const SearchBox = ({ setSearchValue, filterValue, setFilterValue }) => {
    const [filter_value, setfilter_value] = useState("All");

    const CATEGORIES = [
        {
            title: "Java Script",
            value: "JAVA_SCRIPT",
        },
        {
            title: "UI/UX",
            value: "UI_UX",
        },
        {
            title: "Object Oriented Programming",
            value: "OBJECT_ORIENTED_PROGRAMMING",
        },
        {
            title: "Java",
            value: "JAVA",
        },
        {
            title: "Python",
            value: "PYTHON",
        },
        {
            title: "Go Lang",
            value: "GO_LANG",
        },
        {
            title: "Micro Services",
            value: "MICROSERVICES",
        },
        {
            title: "Database",
            value: "DATABASE",
        },
        {
            title: "React JS",
            value: "REACT_JS",
        },

        {
            title: "Node JS",
            value: "NODE_JS",
        },
        {
            title: "Block Chain",
            value: "BLOCK_CHAIN",
        },
    ];
    return (
        <>
            <div className='flex items-center font-popins flex-col mt-10'>

                {/* SEARCH BOX  */}
                <div className='relative w-[92%] ml-4 mr-4 md::w-[50vw]'>
                    <Input onChangeFunc={(e) => setSearchValue(e.target.value)} placeholder={"Search"} type={"text"} name={"search"} style={{ border: "1px solid #c0c0bb" }} className={"w-[100%] h-[3.4rem] pl-12 placeholder:text-[#848482] placeholder:font-popins outline-none rounded-md shadow-inputSadow"} />
                    <FaSearch className='absolute top-5 left-4 text-[#848482]' />
                </div>

                {/* FILTERS  */}

                <div className='flex md:justify-center  overflow-y-hidden overflow-x-auto gap-2 mt-2 pt-3 pl-1 pr-1 h-[6rem] w-[92%] xl:w-[100%]'>
                    <Button onClickFunc={() => {
                        setfilter_value("All");
                        setFilterValue("All")
                    }} className={`w-[5rem] min-w-[5rem] h-[3rem] ${filter_value === "All" ? `bg-[#1d90f4]` : "bg-white"} ${filter_value == "All" ? "text-white" : `text-black`} rounded-md shadow-inputSadow`} btnValue={"All"} />

                    {

                        CATEGORIES.map((category, index) => {
                            return <Button onClickFunc={() => { setfilter_value(category.value), setFilterValue(category.value) }} className={`p-2 rounded-md min-w-[5rem] h-[3rem] ${filter_value !== category.value ? "bg-white" : `bg-[#1d90f4]`} ${filter_value == category.value ? "text-white" : `text-black`} shadow-inputSadow `} btnValue={category?.title} />

                        })
                    }
                    {/* <Button onClickFunc={()=>setfilter_value("All")} className={`w-[5rem] min-w-[5rem] h-[3rem] ${filter_value==="All"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"All"}/>
                <Button onClickFunc={()=>setfilter_value("UI/UX")} className={`w-[5rem] min-w-[5rem]  h-[3rem] ${filter_value==="UI/UX"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"UI/UX"}/>
                <Button onClickFunc={()=>setfilter_value("FRONTEND")} className={`w-[6rem] min-w-[6rem]  h-[3rem] ${filter_value==="FRONTEND"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"Frontend"}/>
                <Button onClickFunc={()=>setfilter_value("BACKEND")} className={`w-[6rem] min-w-[6rem] h-[3rem] ${filter_value==="BACKEND"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"Backend"}/>
                <Button onClickFunc={()=>setfilter_value("React")} className={`w-[5rem] min-w-[5rem]  h-[3rem] ${filter_value==="React"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"React"}/>
                <Button onClickFunc={()=>setfilter_value("Node")} className={`w-[5rem] min-w-[5rem]  h-[3rem] ${filter_value==="Node"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"Node"}/>
                <Button onClickFunc={()=>setfilter_value("Blockchain")} className={`w-[7rem] min-w-[7rem]  h-[3rem] ${filter_value==="Blockchain"?"bg-white":"bg-slate-200"} shadow-inputSadow`} btnValue={"Blockchain"}/> */}
                </div>


            </div>
        </>
    )
}

export default SearchBox