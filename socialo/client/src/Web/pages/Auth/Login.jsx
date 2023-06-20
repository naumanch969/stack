import { Person } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import validator from 'email-validator'
import { motion } from 'framer-motion'
import Cookie from 'js-cookie'
import { login } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import { CircularProgress } from '@mui/material'
import Input from './Input'

const Login = () => {

    const { userState, setUserState, } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginValidated = userState.userValidation.email == '' && userState.userValidation.password == ''

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const handleLogin = () => {
        if (!loginValidated) return null                        // if email & password fields are empty then return null
        const { email, password } = userState.userData
        const userData = { email, password }
        dispatch(login(userData, navigate, userState, setUserState))
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
        <>
            <div className="w-screen h-[36rem] flex justify-center items-center gap-[1rem] rounded-[4px] bg-purple-100  " >
                {/* left section */}
                <div className="relative md:w-[55%] h-full bg-purple-900 flex flex-col justify-center items-center md:px-[3rem] lg:px-[5rem] py-[2rem] overflow-hidden " >
                    <motion.span animate={{ x: [200, 10, -100], y: [50, -250] }} className="absolute opacity-10 bg-purple-200 w-[140px] h-[140px] rounded-full " />
                    <h2 className="text-purple-100 font-poppins md:text-[40px] lg:text-[48px] font-bold capitalize " >Welcome back to your <span className="text-purple-300 capitalize italic " >Memory Vault</span></h2>
                    {/* <h2 className="text-purple-100  " >turn your memories into a legacy</h2> */}
                    <motion.span animate={{ x: [200, -100, 50], y: [20, 0, 100] }} className="absolute opacity-50 bg-purple-200 w-[20px] h-[20px] rounded-full " />
                    <motion.span animate={{ x: [0, 400, 300], y: [100, -40, 200] }} className="absolute opacity-30 bg-purple-200 w-[100px] h-[100px] rounded-full " />
                    <motion.span animate={{ x: [0, 300, -300], y: [0, 50, 150] }} className="absolute opacity-80 bg-purple-200 w-[50px] h-[50px] rounded-full " />
                </div>
                {/* right section */}
                <div className="md:w-[45%] h-full flex justify-center items-center p-[3rem] " >
                    <div className="  flex max-w-[28rem] flex-col justify-center items-center gap-[2rem] w-full h-full " >
                        <div className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full   " >
                            <Person style={{ fontSize: '4rem' }} className="text-[4rem] " />
                        </div>
                        <div className="flex flex-col gap-[2rem]  w-full " >
                            <Input
                                attribute="email"
                                type="email"
                                placeholder="Email..."
                                blurFunction={emailBlur}
                            />
                            <Input
                                attribute="password"
                                type={'password'}
                                placeholder="Password..."
                                blurFunction={passwordBlur}
                                showEyeIcon
                            />
                            <p onClick={() => setUserState({ ...userState, page: 'forget_password' })} className="text-linkBlue cursor-pointer " >Forget Password?</p>
                        </div>
                        <div className="flex flex-col items-center w-full gap-[8px]" >
                            <button onClick={handleLogin} className="w-full transition-all duration-300 text-purple-100 bg-purple-800 hover:bg-purple-900 py-[8px] rounded-[4px] " >
                                {isLoading ? <span className='flex justify-center items-center gap-[1rem] ' ><span className='' >Logging In...</span><CircularProgress style={{ color: '#ecd4f9', width: '20px', height: '20px' }} className="w-[20px] h-[20px] text-purple-100 " /></span> : 'login'}
                            </button>
                            <p className="" >Don't have account. <button onClick={() => setUserState({ ...userState, page: 'register' })} className="underline cursor-pointer text-linkBlue  " >create account</button> </p>
                        </div>
                        {
                            userState.errorObj.login &&
                            <p className="text-red text-[14px] " >{userState.errorObj.login}</p>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login