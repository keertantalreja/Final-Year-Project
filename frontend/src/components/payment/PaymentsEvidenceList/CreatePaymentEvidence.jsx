import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../../constant/color'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../../dynamic/input/Input'
import Button from '../../dynamic/button/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAllHackathonQuery, useUploadPaymentMutation } from '../../../services/api/api'
import { StudentjwtDecodeFunction } from '../../../services/jwtDecoder'

const CreatePaymentEvidence = ({ setPaymentForm, isPaymentForm }) => {
    const [loader, setLoader] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const [isLogin, setisLogin] = useState(true)

    const [registerationState, setregisterationState] = useState({
        hackathon: "",
        paymentType: "",
        cashAmount: "",
        paymentDate: "",
    })
    const [image, setImage] = useState(null)
    const [cv, setCv] = useState(null)
    const inputRef = useRef(null);
    const cvRef = useRef(null)
    const [showError, setshowError] = useState(false)
    const [showHackathons, setShowHackathons] = useState(false)
    const [showPaymentTypes, setShowPaymentTypes] = useState(false)
    const nav = useNavigate()
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleCvChange = (e) => {
        setCv(e.target.files[0])
    };
    const handleCvClick = () => {
        cvRef.current.click();
    };

    let currentLocation = useLocation().pathname.split('/')[1]

    // let [registerStudent] = useRegisterStudentMutation()
    // let [registerJudge] = useRegisterJudgeMutation()
    // let [registerAdmin] = useRegisterAdminMutation()
    // let [loginStudent] = useLoginStudentMutation()
    // let [loginJudge] = useLoginJudgeMutation()
    // let [loginAdmin] = useLoginAdminMutation()
    let [uploadPayment] = useUploadPaymentMutation()

    const [hackathonData, setHackathonData] = useState([])
    const { data, error } = useGetAllHackathonQuery();
    const getHackathon = async () => {
        try {
            setHackathonData(data)
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (hackathonData?.length == 0) {
            getHackathon();
        }
    }, []);

    const [hackathonId, setHackathonId] = useState("");

    const paymentTypes = [
        {
            "title": "Online",
            "value": "Online",

        },
        {
            "title": "Cash",
            "value": "Cash",
        },
    ]

    if (currentLocation === '') {
        currentLocation = "student"
    }

    const onChangeInput = (e) => {
        setregisterationState({ ...registerationState, [e.target.name]: e.target.value })
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onSubmitForm = async (e) => {
        const studentId = StudentjwtDecodeFunction();
        console.log(studentId);
        e.preventDefault()
        setLoader(true)
        console.log("registerationState", registerationState);
        if (registerationState.paymentType !== "" && registerationState.cashAmount !== "" && registerationState.paymentDate !== "") {
            let formData = new FormData()
            formData.append("hackthon", hackathonId)
            formData.append("paymentType", registerationState.paymentType.toUpperCase())
            formData.append("paymentDate", new Date(registerationState.paymentDate).toISOString())
            if (registerationState.paymentType == "Online") {
                formData.append("paymentEvidenceImage", image)
            }
            else {
                formData.append("paymentEvidenceImage", null)
            }

            formData.append("studentId", studentId.findUser._id)
            formData.append("amount", registerationState.cashAmount)
            console.log("formData", formData);
            let result = await uploadPayment(formData)
            // console.log("result", result);
            if (result?.data) {
                // localStorage.setItem("judgetoken", result.data.token)
                toast.success("Payment Evidence Uploaded")
                setLoader(false)
                setTimeout(() => {
                    // nav('/student/home')
                    setPaymentForm(!isPaymentForm)
                }, 2000);
            }
            else {
                setLoader(false)
                toast.error("Something went wrong")

            }
        }

        else {
            toast.error("Password fill all the fields")
            setLoader(false)
        }

    }

    const changeState = () => {
        setisLogin(!isLogin)
        setregisterationState({ "email": "", "password": "" })
        setLoginState({ "email": "", "password": "" })
    }
    // const nav = useNavigate();

    return (

        <>

            {/* HEADEIND AND NAVIGATION */}


            {/* MAIN FORM  */}

            <div className={`sm:h-[89vh] "h-[90%]" flex items-center mt-10 sm:mt-0 mb-10 sm:mb-0 `}>

                <div className='w-[100%] flex flex-col p-[30%]'>

                    <div className='p-4 sm:p-0'>

                        <h1 className='text-3xl sm:text-4xl font-bold mt-3 text-black'>Payment Evidence <span style={{ color: colors.sky_blue }}>.</span></h1>
                    </div>

                    <div className='mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]'>

                        {/* <div>
                            <Input onChangeFunc={onChangeInput} style={{ backgroundColor: colors?.input_bg }} type={"text"} placeholder={"Phone Number"} name={"phone"} className={"h-[3rem] w-[93vw]  sm:w-[15rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"} />
                        </div> */}
                        <div className='relative'>

                            <div onClick={() => setShowHackathons(!showHackathons)} style={{ backgroundColor: "white", border: "2px solid silver" }} type={"text"} className={"h-[3rem] cursor-pointer w-[100%]  sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem]  text-black flex justify-start items-center"}>
                                <p style={{ color: "black" }} >{!registerationState.hackathon ? "Select Hackathon" : registerationState.hackathon}</p>
                            </div>
                            {/* setregisterationState */}
                            {
                                showHackathons ?
                                    <div style={{ backgroundColor: colors?.gray }} type={"text"} className={"h-[10rem]  absolute top-[3.5rem] z-50 cursor-pointer w-[100%]  sm:w-[31.4rem] rounded-[0.5rem] pl-5 pr-4 pt-2 overflow-y-auto"}>
                                        {
                                            hackathonData?.map((item, index) => {
                                                return (
                                                    <p key={index + 1} onClick={() => {
                                                        setregisterationState({ ...registerationState, "hackathon": item?.title })
                                                        setHackathonId(item._id);
                                                        setShowHackathons(false)
                                                    }} className='text-white mb-2'>{item?.title}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    : null
                            }

                        </div>

                    </div>
                    <div className='mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]'>

                        <div className='relative'>

                            <div onClick={() => setShowPaymentTypes(!showPaymentTypes)} style={{ backgroundColor: "white", border: "2px solid silver" }} type={"text"} className={"h-[3rem] cursor-pointer w-[100%]  sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem]  text-white flex justify-start items-center"}>
                                <p style={{ color: "black" }} >{!registerationState.paymentType ? "Select Payment Type" : registerationState.paymentType}</p>
                            </div>
                            {/* setregisterationState */}
                            {
                                showPaymentTypes ?
                                    <div style={{ backgroundColor: colors?.gray }} type={"text"} className={"h-[10rem]  absolute top-[3.5rem] z-50 cursor-pointer w-[100%]  sm:w-[31.4rem] rounded-[0.5rem] pl-5 pr-4 pt-2 overflow-y-auto"}>
                                        {
                                            paymentTypes?.map((item, index) => {
                                                return (
                                                    <p key={index + 1} onClick={() => {
                                                        setregisterationState({ ...registerationState, "paymentType": item.title })
                                                        setShowPaymentTypes(false)
                                                    }} className='text-white mb-2'>{item?.title}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    : null
                            }

                        </div>

                    </div>

                    <div className='mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]'>
                        <Input value={registerationState.paymentDate} onChangeFunc={onChangeInput} style={{ backgroundColor: "white", border: "2px solid silver" }} type="date" placeholder="Payment Date" name="paymentDate" className={"h-[3rem] w-[93vw]  sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-black"} />
                    </div>



                    {registerationState.paymentType == "Online" ?
                        <div>
                            {/* UPLOAD IMAGE  */}

                            <div style={{ backgroundColor: "white", border: "2px solid silver" }} className={`flex justify-center items-center rounded-md  border-2 border-[#323645] w-[93vw]  sm:w-[31.4rem] h-[2.5rem] mt-4`}>
                                <label htmlFor="file-input">
                                    <button className={``} onClick={handleClick}>{image?.name ? "File Uploaded" : "Upload Image"}</button>
                                </label>
                                <input id="file-input" type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                            <div className='mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]'>
                                <Input value={registerationState.cashAmount} onChangeFunc={onChangeInput} style={{ backgroundColor: "white", border: "2px solid silver" }} type={"text"} placeholder={"Amount"} name={"cashAmount"} className={"h-[3rem] w-[93vw] sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-black"} />
                            </div>

                        </div> :
                        <div className='mt-5 flex justify-center items-center sm:block w-[100vw] sm:w-[100%]'>
                            <Input value={registerationState.cashAmount} onChangeFunc={onChangeInput} style={{ backgroundColor: "white", border: "2px solid silver" }} type={"text"} placeholder={"Amount"} name={"cashAmount"} className={"h-[3rem] w-[93vw] sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-black"} />
                        </div>
                    }

                    {/* PASSWORD
                    <div className='mt-5'>

                        <div className='relative w-[100%] flex justify-center items-center sm:w-[31.4rem]'>
                            <Input value={registerationState.password} onChangeFunc={onChangeInput} style={{ backgroundColor: colors?.input_bg }} type={!showPassword ? "password" : "text"} placeholder={"Password"} name={"password"} className={"h-[3rem] w-[93vw] sm:w-[31.4rem] pl-5 pr-4 rounded-[0.5rem] outline-none text-white"} />
                            {
                                !showPassword ?
                                    <AiFillEye onClick={() => setshowPassword(!showPassword)} style={{ color: colors?.icon_bg }} className=' absolute top-[0.85rem] sm:right-3 right-8 cursor-pointer text-xl' />
                                    : <AiFillEyeInvisible onClick={() => setshowPassword(!showPassword)} style={{ color: colors?.icon_bg }} className=' absolute top-[0.85rem] sm:right-3 right-8 cursor-pointer text-xl' />
                            }
                        </div>

                    </div> */}



                    {/* BUTTONS */}
                    <div className='mt-4 pb-4 flex justify-center sm:justify-start sm:items-start items-center flex-col sm:flex-row gap-6'>
                        <Button
                            onClickFunc={onSubmitForm}
                            style={{ backgroundColor: colors?.sky_blue2 }} btnValue={loader ? "Loading ..." : "Upload Payment Evidence"} className={"w-[93vw]  sm:w-[31.4rem] text-white text-sm h-[3rem] shadow-btnShdow1 rounded-[10px]"} />
                    </div>

                </div>
            </div >

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

        </>
    )
}

export default CreatePaymentEvidence