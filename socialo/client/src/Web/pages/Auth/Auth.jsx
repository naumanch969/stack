// register - creating user
// login    - creating token, profile and inserting in accounts
// switch   - replacing profile
// logout   - removing profile
// remove   - filtering through accounts

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, getAllUsers } from '../../../redux/actions/user'
import { useStateContext } from '../../../contexts/ContextProvider'
import Register from './Register'
import Login from './Login'
import ForgetPassword from './ForgetPassword'
import ChangePassword from './ChangePassword'
import OTP from './OTP'

const Auth = () => {

    const { userState, setUserState, } = useStateContext()

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////

    const logoutFunc = () => {
        dispatch(logout(navigate, userState, setUserState))
    }

    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////

    return (
        <div className="w-full h-full min-h-[35rem] flex justify-center items-center " >

            <>
                {
                    userState.user
                        ?
                        <button onClick={logoutFunc} className="text-white " >logout</button>
                        :
                        <>
                            {
                                userState.page == 'register' &&
                                <Register />
                            }
                            {
                                userState.page == 'register_otp'
                                &&
                                <OTP />
                            }
                            {
                                userState.page == 'login' &&
                                <Login />
                            }
                            {
                                userState.page == 'forget_password' &&
                                <ForgetPassword />
                            }
                            {
                                userState.page == 'change_password' &&
                                <ChangePassword />
                            }
                        </>
                }
            </>

        </div>
    )
}

export default Auth


// client id
// 852629080543-59fla6jkhjahqh6fdn3ijdu925d4li0k.apps.googleusercontent.com
// client secret
// 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
