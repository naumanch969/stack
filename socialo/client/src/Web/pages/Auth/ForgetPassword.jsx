import { useDispatch, useSelector } from 'react-redux'
import validator from 'email-validator'
import { CircularProgress } from '@mui/material'
import { sendForgetPasswordOTP } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import Input from './Input'


const ForgetPassword = () => {

    const { userState, setUserState, } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const handleSendForgetPasswordOTP = () => {
        const { email } = userState.userData
        dispatch(sendForgetPasswordOTP(email, userState, setUserState))
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

    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////


    return (
        <div className='w-full h-[35rem] flex flex-col justify-start items-center pt-[5rem] bg-purple-100 ' >
            <div className='w-[22rem] flex flex-col items-start gap-[1rem] ' >
                <div className='w-full  ' >
                    <h4 className="text-[18px] font-medium " >Enter your registered email.</h4>
                </div>
                <div className="flex flex-col justify-start gap-[1rem] w-full bg-purple-200 p-[2rem] rounded-[4px] ">
                    <div className="flex flex-col items-start w-full gap-[1rem] " >
                        <Input
                            attribute="email"
                            type="email"
                            placeholder="Email..."
                            blurFunction={emailBlur}
                        />
                        <button onClick={handleSendForgetPasswordOTP} className="w-full transition-all duration-300 text-purple-100 bg-purple-800 hover:bg-purple-900 py-[8px] rounded-[4px] "  >
                            {isLoading ? <span className='flex justify-center items-center gap-[1rem] ' ><span className='' >submitting...</span><CircularProgress style={{ color: '#ecd4f9', width: '20px', height: '20px' }} className="w-[20px] h-[20px] text-purple-100 " /></span> : 'submit'}
                        </button>
                    </div>
                    <p onClick={() => setUserState({ ...userState, page: 'login' })} className="text-linkBlue cursor-pointer underline " >Go Back</p>
                    {
                        userState.errorObj.sendForgetPasswordOTP &&
                        <p className="text-red text-[14px] " >{userState.errorObj.sendForgetPasswordOTP}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword