import { Dehaze, Search, DashboardOutlined, AccountCircle, Logout, SavedSearch, KeyboardBackspace } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import { AppBar, Avatar, Card, IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../../redux/actions/user"
import { motion } from 'framer-motion'
import { useStateContext } from "../../contexts/ContextProvider"

const Navbar = () => {

    //////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //////////////////////////// STATES ///////////////////////////////////////
    const { userState, setUserState, rightbar, setRightbar } = useStateContext()
    const [openAccountMenu, setOpenAccountMenu] = useState(false)


    //////////////////////////// USE EFFECTS //////////////////////////////////


    //////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleSignUpClick = () => {
        navigate('/auth')
        setUserState({ ...userState, page: 'register' })
    }
    const hanldeLoginClick = () => {
        navigate('/auth')
        setUserState({ ...userState, page: 'login' })
    }
    const handleLogout = () => {
        dispatch(logout(navigate, userState, setUserState))
        navigate("/")
        setOpenAccountMenu(false)
    }
    const handleAccountClick = () => {
        navigate("/account")
        setOpenAccountMenu(false)
    }


    const Menu = () => (
        <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute shadow-2xl top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-4 p-4 border-[2px] bg-purple-200 border-purple-400 rounded-[4px]  " >
            <button onClick={handleAccountClick} className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
            <button className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><DashboardOutlined /> <span className="" >Dashboard</span> </button>
            <button className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
            <button onClick={handleLogout} className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
        </motion.div>
    )

    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className=" w-full h-[4rem] flex justify-between items-center md:px-[64px] pr-4   " >

            <div className="" >
                <Link to='/' className="text-purple-500 text-[32px] font-bold " >Diary</Link>
            </div>

            {/* user */}
            <div className="" >
                {
                    userState.user ?
                        <div className="relative flex gap-[8px] justify-center items-center " >
                            <h3 className="text-purple-400 font-bolder text-[16px] capitalize " >Hello, {userState.user?.name}</h3>
                            <div className="relative" >
                                <Avatar onClick={() => setOpenAccountMenu((prev) => !prev)} className="bg-purple-200 cursor-pointer capitalize text-black " >{userState.user?.name?.charAt(0)}</Avatar>   {/* #423e65 */}
                                {openAccountMenu && <Menu />}
                            </div>
                        </div>
                        :
                        <div className="flex justify-between items-center h-full gap-[8px] " >
                            <button onClick={handleSignUpClick} className="text-[16px] h-full bg-purple-300 text-purple-900 rounded-[4px] px-[16px] py-[8px] " >Register</button>
                            <button onClick={hanldeLoginClick} className="text-[16px] h-full bg-purple-100 text-purple-900 rounded-[4px] px-[16px] py-[8px] " >Login</button>
                        </div>
                }
            </div>


        </div>
    )
}

export default Navbar;