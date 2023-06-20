import { useStateContext } from '../../../contexts/ContextProvider'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import {motion} from 'framer-motion'
import { VisibilityOff, RemoveRedEye } from '@mui/icons-material'

const Input = ({ type, placeholder, attribute, blurFunction, showEyeIcon }) => {      // attribute may either of 'email', 'name', 'password', 'confirmPassword'

    const { userState, setUserState } = useStateContext()
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        setUserState({
            ...userState,
            userData: { ...userState.userData, [attribute]: e.target.value }
        })
    }

    return (
        <div className="flex flex-col gap-[4px] w-full " >

            <div className="relative flex flex-col gap-[4px] " >
                <input
                    autoComplete='off'
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    name={attribute}
                    value={userState.userData[attribute]}
                    onChange={handleChange}
                    onBlur={blurFunction}
                    className='w-full placeholder-purple-800 text-purple-800 border-b-[1px] border-purple-800 bg-white p-[8px] text-[14px] rounded-[4px] outline-none  '
                    required
                />
                {
                    showEyeIcon &&
                    <button onClick={() => setShowPassword(pre => !pre)} className="absolute right-0 top-[50%] transform translate-y-[-50%] " > {showPassword ? <VisibilityOff /> : <RemoveRedEye />}  </button>
                }
            </div>
            {
                userState.userValidation[attribute] &&
                <p className="text-[12px] text-red " >{userState.userValidation[attribute]}</p>
            }

        </div>
    )

}

export default Input