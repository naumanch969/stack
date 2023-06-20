import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { register, sendEmailVerificationOTP } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import Input from './Input'


const OTP = () => {

    const { userState, setUserState, } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const registerValidated = userState.userValidation.name == '' && userState.userValidation.email == '' && userState.userValidation.password == '' && userState.userValidation.confirmPassword == ''

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////
    const [timer, setTimer] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////
    useEffect(() => {
        const id = setInterval(() => {
            setTimer(count => count - 1);
        }, 1000);
        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            console.log("Timer stopped");
            clearInterval(intervalId);
        }
    }, [timer, intervalId]);

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const handleRegister = () => {
        if (!registerValidated) return null
        const { name, userName, location, gender, DOB, email, password, phone, registerOTP } = userState.userData
        const userData = { name, userName, location, gender, DOB, email, password, phone, otp: registerOTP }
        dispatch(register(userData, userState, setUserState))
    }
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
    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////

    return (
        <div className='w-full h-[35rem] flex flex-col justify-start items-center pt-[5rem] bg-purple-100 ' >
            <div className='w-[22rem] flex flex-col items-start gap-[1rem] ' >
                <div className='w-full  ' >
                    {
                        timer == 0
                            ?
                            <p className="" >Have not receive the verifiction code sent to {userState.userData.email}? <button onClick={handleSendRegisterOTP} className="underline cursor-pointer font-medium  " >Resend</button> </p>
                            :
                            <h4 className="text-[18px] " >A verifiction code will be sent to <span className='font-bold' >{userState.userData.email}</span> within {timer}s </h4>
                    }
                </div>
                <div className="flex flex-col justify-start gap-[1rem] w-full bg-purple-200 p-[2rem] rounded-[4px] ">
                    <div className="flex flex-col items-start w-full gap-[1rem] " >
                        <Input
                            attribute="registerOTP"
                            type="text"
                            placeholder="Verification Code"
                        />
                        <button onClick={handleRegister} className="w-full transition-all duration-300 text-purple-100 bg-purple-800 hover:bg-purple-900 py-[8px] rounded-[4px] "  >
                            {isLoading ? <span className='flex justify-center items-center gap-[1rem] ' ><span className='' >submitting...</span><CircularProgress style={{ color: '#ecd4f9', width: '20px', height: '20px' }} className="w-[20px] h-[20px] text-purple-100 " /></span> : 'submit'}
                        </button>
                    </div>
                    <p onClick={() => setUserState({ ...userState, page: 'register' })} className="text-linkBlue cursor-pointer underline " >Wrong Email?</p>
                    {
                        userState.errorObj.register &&
                        <p className="text-red text-[14px] capitalize " >{userState.errorObj.register}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default OTP