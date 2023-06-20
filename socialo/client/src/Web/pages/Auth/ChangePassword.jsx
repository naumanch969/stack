import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { changePassword, sendForgetPasswordOTP } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import Input from './Input'

const ChangePassword = () => {

    const { userState, setUserState, } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const changePasswordValidated = userState.userValidation.email == '' && userState.userValidation.password == ''

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////
    const [timer, setTimer] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

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
    const handleChangePassword = () => {
        if (!changePasswordValidated) return null                 // if  email || password field is empty/unprovided then return null
        const { email, password, forgetPasswordOTP } = userState.userData
        const userData = { email, password, otp: forgetPasswordOTP }
        dispatch(changePassword(userData, userState, setUserState))
    }
    const handleSendForgetPasswordOTP = () => {
        const { email } = userState.userData
        dispatch(sendForgetPasswordOTP(email, userState, setUserState))
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


    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////


    return (
        <div className='w-full h-[35rem] flex flex-col justify-start items-center pt-[5rem] bg-purple-100 ' >
            <div className='w-[22rem] flex flex-col items-start gap-[1rem] ' >
                <div className='w-full  ' >
                    {
                        timer == 0
                            ?
                            <p className="" >Have not receive the verifiction code sent to {userState.userData.email}? <button onClick={handleSendForgetPasswordOTP} className="underline cursor-pointer font-medium  " >Resend</button> </p>
                            :
                            <h4 className="text-[18px] " >A verifiction code will be sent to <span className='font-bold' >{userState.userData.email}</span> within {timer}s </h4>
                    }
                </div>
                <div className="flex flex-col justify-start gap-[1rem] w-full bg-purple-200 p-[2rem] rounded-[4px] ">
                    <div className="flex flex-col items-start w-full gap-[1rem] " >
                        <Input
                            attribute="forgetPasswordOTP"
                            type="text"
                            placeholder="Verification Code"
                        />
                        <Input
                            attribute="password"
                            type='password'
                            placeholder="New Password..."
                            blurFunction={passwordBlur}
                            showEyeIcon
                        />
                        <button onClick={handleChangePassword} className="w-full transition-all duration-300 text-purple-100 bg-purple-800 hover:bg-purple-900 py-[8px] rounded-[4px] " >
                            {isLoading ? <span className='flex justify-center items-center gap-[1rem] ' ><span className='' >submitting...</span><CircularProgress style={{ color: '#ecd4f9', width: '20px', height: '20px' }} className="w-[20px] h-[20px] text-purple-100 " /></span> : 'submit'}
                        </button>
                    </div>
                    <p onClick={() => setUserState({ ...userState, page: 'forget_password' })} className="text-linkBlue cursor-pointer " >Wrong Email?</p>
                    {
                        userState.errorObj.changePassword &&
                        <p className="text-red text-[14px] capitalize " >{userState.errorObj.changePassword} </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangePassword