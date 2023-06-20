import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from "@react-oauth/google"
import validator from 'email-validator'
import jwt_decode from "jwt-decode"
import { sendEmailVerificationOTP } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import Input from './Input'


const Register = () => {

    const { userState, setUserState, postState, setPostState } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerValidated = userState.userValidation.name == '' && userState.userValidation.email == '' && userState.userValidation.password == '' && userState.userValidation.confirmPassword == ''
    const yearDiff = new Date().getFullYear() - 1970

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////
    const [show, setShow] = useState({ date: false, month: false, year: false })

    var userDOB = userState.userData?.DOB?.split('/')

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////


    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const handleSendRegisterOTP = () => {
        if (!registerValidated) return null                 // if name || email || password || confirmPasswrd field is empty then return null
        const { email, password, confirmPassword } = userState.userData
        if (password !== confirmPassword) {                 // password and confirmPassword should be same
            setUserState({ ...userState, errorObj: { ...userState.errorObj, sendEmailVerificationOTP: 'password and confirmPassword should be same' } })
        }
        else {
            dispatch(sendEmailVerificationOTP(email, userState, setUserState))
        }
    }


    const selectDate = (date) => {
        const month = userDOB[1]
        const year = userDOB[2]
        userState.userData.DOB = `${date}/${month}/${year}`
        setShow({ ...show, date: false })
        setUserState({ ...userState })
    }
    const selectMonth = (month) => {
        const date = userDOB[0]
        const year = userDOB[2]
        userState.userData.DOB = `${date}/${month}/${year}`
        setShow({ ...show, month: false })
        setUserState({ ...userState })
    }
    const selectYear = (year) => {
        const date = userDOB[0]
        const month = userDOB[1]
        userState.userData.DOB = `${date}/${month}/${year}`
        setShow({ ...show, year: false })
        setUserState({ ...userState })
    }


    const nameBlur = () => {
        if (userState.userData.name == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, name: 'name field is required' } })
        }
        else if (userState.userData.name.length < 3) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, name: 'name must be atleast of 3 character' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, name: '' } })
        }
    }
    const userNameBlur = () => {
        if (userState.userData.userName == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, userName: 'username field is required' } })
        }
        else if (userState.userData.userName.length < 8) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, userName: 'username must be atleast of 8 character' } })
        }
        else if (Boolean(userState?.usersArr.find(user => user.userName == userState.userData.userName))) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, userName: `username ${userState.userData.userName} has already been taken!` } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, userName: '' } })
        }
    }
    const locationBlur = () => {
        if (userState.userData.location == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, location: 'location field is required' } })
        }
        else if (userState.userData.location.length < 5) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, location: 'location must be atleast of 5 character' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, location: '' } })
        }
    }
    const emailBlur = () => {
        if (userState.userData.email == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, email: 'email field is required' } })
        }
        else if (!(validator.validate(userState.userData.email))) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, email: 'please enter valid email address' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, email: '' } })
        }
    }
    const phoneBlur = () => {
        if (userState.userData.phone == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, phone: 'phone field is required' } })
        }
        else if (userState.userData.phone.length !== 11) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, phone: 'please enter a valid phone number' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, phone: '' } })
        }
    }
    const passwordBlur = () => {
        if (userState.userData.password == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, password: 'password field is required' } })
        }
        else if (userState.userData.password.length < 5) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, password: 'password must be atleast of 5 characters' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, password: '' } })
        }
    }
    const confirmPasswordBlur = () => {
        if (userState.userData.confirmPassword == ``) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, confirmPassword: 'confirmPassword field is required' } })
        }
        else if (userState.userData.confirmPassword.length < 5) {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, confirmPassword: 'confirmPassword must be atleast of 5 character' } })
        }
        else {
            setUserState({ ...userState, userValidation: { ...userState.userValidation, confirmPassword: '' } })
        }
    }
    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////

    return (
        <div style={{ height: 'calc(100vh-4rem)' }} className="w-screen h-[40rem] overflow-y-scroll flex justify-center items-center gap-[1rem] rounded-[4px] bg-purple-100  " >
            {/* left section */}
            <motion.div className="relative md:w-[55%] lg:w-[55%] h-full bg-purple-900 flex flex-col justify-center items-start md:px-[3rem] lg:px-[5rem] py-[2rem] overflow-hidden " >
                <motion.span animate={{ x: [200, 10, 400], y: [50, 0] }} className="absolute opacity-90 bg-purple-200 w-[40px] h-[40px] rounded-full " />
                <h2 className="relative  bottom-[5rem] text-purple-100 font-poppins text-[32px] font-medium " >Join us</h2>
                <p style={{ fontFamily: 'Delicious Handrawn' }} className="relative  bottom-[5rem] text-purple-200 text-[22px] "  >and</p>
                <div className="relative  bottom-[5rem] flex flex-col justify-start h-fit md:mt-[3rem] lg:mt-[5rem] " >
                    <h2 className="text-purple-100 font-poppins md:text-[40px] lg:text-[48px] font-bold capitalize " >create a <span className="text-purple-300 capitalize italic " >digital archive</span> of your life's events</h2>
                    {/* <h2 className="text-purple-100  " >turn your memories into a legacy</h2> */}
                </div>
                <div className="relative bottom-[5rem] " >
                    <motion.span animate={{ x: [200, 10, 50], y: [20, 0, 10] }} className="absolute opacity-50 bg-purple-200 w-[20px] h-[20px] rounded-full " />
                    <motion.span animate={{ x: [0, 400, 300] }} className="absolute opacity-30 bg-purple-200 w-[100px] h-[100px] rounded-full " />
                    <motion.span animate={{ x: [0, 300, 100], y: [0, 100] }} className="absolute opacity-80 bg-purple-200 w-[50px] h-[50px] rounded-full " />
                </div>
            </motion.div>
            {/* right section */}
            <div className="md:w-[45%] lg:w-[50%] h-full flex justify-center items-center p-[3rem] " >
                <div className="flex flex-col justify-center items-center w-full h-full " >
                    <div className="relative flex max-w-[28rem] flex-col justify-between items-center gap-[2rem] w-full " >
                        <div className="flex flex-col gap-[1rem] w-full " >
                            {/* name */}
                            <Input
                                attribute="name"
                                type="text"
                                placeholder="Name..."
                                blurFunction={nameBlur}
                            />
                            {/* username */}
                            <Input
                                attribute="userName"
                                type="text"
                                placeholder="Username..."
                                blurFunction={userNameBlur}
                            />
                            {/* location */}
                            <Input
                                attribute="location"
                                type="text"
                                placeholder="Location..."
                                blurFunction={locationBlur}
                            />
                            {/* radio */}
                            <div className="flex justify-between items-end" >
                                <div className="" >
                                    <span className="font-semibold text-purple-800 " >Gender:</span>
                                </div>
                                <div className="flex gap-[12px] " >
                                    <div className="flex gap-[4px] " >
                                        <input type='radio' id='male' name='gender' value='male' checked={userState.userData.gender == 'male'} onChange={(e) => { userState.userData.gender = e.target.value; setUserState({ ...userState }) }} ></input>
                                        <label htmlFor='male' >Male</label>
                                    </div>
                                    <div className="flex gap-[4px] " >
                                        <input type='radio' id='female' name='gender' value='female' checked={userState.userData.gender == 'female'} onChange={(e) => { userState.userData.gender = e.target.value; setUserState({ ...userState }) }} ></input>
                                        <label htmlFor='female' >Female</label>
                                    </div>
                                    <div className="flex gap-[4px] " >
                                        <input type='radio' id='other' name='gender' value='other' checked={userState.userData.gender == 'other'} onChange={(e) => { userState.userData.gender = e.target.value; setUserState({ ...userState }) }} ></input>
                                        <label htmlFor='other' >Other</label>
                                    </div>
                                </div>
                            </div>
                            {/* DOB */}
                            <div className="flex justify-between items-center " >
                                <div className="" >
                                    <span className="font-semibold text-purple-800 " >Dath of Birth:</span>
                                </div>
                                <div className="flex justify-end gap-[8px] " >
                                    <div className="relative w-fit bg-purple-500 text-white rounded-[4px] border-[1px] border-black " >
                                        <span onClick={() => setShow({ ...show, date: !show.date })} className="w-full h-full px-[1rem] py-[1px] flex justify-center items-center cursor-pointer " >{userDOB[0]}</span>
                                        {
                                            show.date &&
                                            <div className="flex flex-col absolute top-[110%] right-0 w-full h-[15rem] overflow-y-scroll bg-purple-200 rounded-[4px] z-50  " >
                                                {
                                                    Array(31).fill('').map((_nothing, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => selectDate(index + 1)}
                                                            className={`${userDOB[0] == index + 1 && 'bg-purple-300 '} px-[1rem] py-[1px] hover:bg-purple-300 rounded-[4px] `}
                                                        >{index + 1}</button>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="relative w-fit bg-purple-500 text-white rounded-[4px] border-[1px] border-black " >
                                        <span onClick={() => setShow({ ...show, month: !show.month })} className="w-full h-full px-[1rem] py-[1px] flex justify-center items-center cursor-pointer " >{userDOB[1]}</span>
                                        {
                                            show.month &&
                                            <div className="flex flex-col absolute top-[110%] right-0 w-full h-[15rem] overflow-y-scroll bg-purple-200 rounded-[4px] z-50  " >
                                                {
                                                    Array(12).fill('').map((_nothing, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => selectMonth(index + 1)}
                                                            className={`${userDOB[1] == index + 1 && 'bg-purple-300 '} px-[1rem] py-[1px] hover:bg-purple-300 rounded-[4px] `}
                                                        >{index + 1}</button>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="relative w-fit bg-purple-500 text-white rounded-[4px] border-[1px] border-black " >
                                        <span onClick={() => setShow({ ...show, year: !show.year })} className="w-full h-full px-[1rem] py-[1px] flex justify-center items-center cursor-pointer " >{userDOB[2]}</span>
                                        {
                                            show.year &&
                                            <div className="flex flex-col absolute top-[110%] right-0 w-full h-[15rem] overflow-y-scroll bg-purple-200 rounded-[4px] z-50  " >
                                                {
                                                    Array(yearDiff).fill('').map((_nothing, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => selectYear(1970 + index + 1)}
                                                            className={`${userDOB[2] == 1970 + index + 1 && 'bg-purple-300 '} px-[1rem] py-[1px] hover:bg-purple-300 rounded-[4px] `}
                                                        >{1970 + index + 1}</button>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                            {/* email */}
                            <Input
                                attribute="email"
                                type="email"
                                placeholder="Email..."
                                blurFunction={emailBlur}
                            />
                            {/* phone */}
                            <Input
                                attribute="phone"
                                type="tel"
                                placeholder="Phone..."
                                blurFunction={phoneBlur}
                            />
                            {/* password */}
                            <Input
                                attribute="password"
                                type='password'
                                placeholder="Password..."
                                blurFunction={passwordBlur}
                                showEyeIcon
                            />
                            <Input
                                attribute="confirmPassword"
                                type='password'
                                placeholder="Confirm Password..."
                                blurFunction={confirmPasswordBlur}
                                showEyeIcon
                            />
                        </div>
                        <div className="flex flex-col items-center w-full gap-[2rem] " >
                            <div className="flex flex-col items-start gap-[8px] w-full " >
                                <button onClick={handleSendRegisterOTP} className="w-full transition-all duration-300 text-purple-100 bg-purple-500 hover:bg-purple-600 py-[8px] rounded-[4px] " >
                                    {isLoading ? <span className='flex justify-center items-center gap-[1rem] ' ><span className='' >Registering...</span><CircularProgress style={{ color: '#ecd4f9', width: '20px', height: '20px' }} className="w-[20px] h-[20px] text-purple-100 " /></span> : 'register'}
                                </button>
                                <p className="" >Already have account. <button onClick={() => setUserState({ ...userState, page: 'login' })} className="underline cursor-pointer font-medium  " >login here</button> </p>
                            </div>
                        </div>
                    </div>
                    {
                        userState.errorObj.sendEmailVerificationOTP &&
                        <p className="text-red text-[14px] " >{userState.errorObj.sendEmailVerificationOTP}</p>
                    }
                </div>
            </div>
        </div>
        // Welcome Back to Your Memory Vault
    )
}

export default Register



