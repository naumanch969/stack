import { Dehaze, AccountCircle, DashboardOutlined, SavedSearch, Logout } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import { AppBar, Avatar, Card, IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../../../redux/actions/user"
import { motion } from 'framer-motion'
import { useStateContext } from "../../../contexts/ContextProvider"

const Navbar = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { userState, setUserState, rightbar, setIsSignUpPage, showSidebar, setShowSidebar, setRightbar } = useStateContext()
    const [openAccountMenu, setOpenAccountMenu] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => (
        console.log('showSidebar', showSidebar)
    ), [showSidebar])
    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const handleSignUpClick = () => {
        navigate('/auth')
        setIsSignUpPage(true)
    }

    const hanldeLoginClick = () => {
        navigate('/auth')
        setIsSignUpPage(false)
    }

    const handleLogout = () => {
        dispatch(logout(navigate, userState, setUserState))
        setOpenAccountMenu(false)
    }

    const handleAccountClick = () => {
        navigate("/account")
        setOpenAccountMenu(false)
    }

    const handleToggleRightbar = () => {
        setRightbar(!rightbar)
    }

    const Menu = () => (
        <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute shadow-2xl top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-4 p-4 border-[2px] bg-purple-200 border-purple-800 rounded-[4px]  " >
            <button onClick={handleAccountClick} className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
            <button className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><DashboardOutlined /> <span className="" >Dashboard</span> </button>
            <button className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
            <button onClick={handleLogout} className="w-full flex hover:bg-purple-400 p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
        </motion.div>
    )

    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className="sticky top-0 flex justify-between items-center h-[4rem] w-full lg:px-[2rem] md:px-[1.5rem] px-[4rem] z-[100] " >

            <div className="h-full flex items-center justify-between gap-[8px] " >
                <button className='w-[40px] h-[40px] rounded-full text-purple-500 hover:bg-gray-100' onClick={() => setShowSidebar(pre => !pre)} ><Dehaze className="" /></button>
                <Link to='/' style={{ fontFamily: 'Delicious Handrawn', fontFamily: 'cursive' }} className="font-bolder text-[2rem] font-bold text-purple-500" >Diary</Link>
            </div>


            <div className=" " >
                {
                    userState.user ?
                        <div className="relative flex gap-4 items-center " >
                            <div className="flex gap-[8px] items-center justify-center " >
                                <h3 className="text-purple-800 font-bolder text-[16px] capitalize " >Hello, {userState.user?.name}</h3>
                                <div className="relative" >
                                    <div className="relative" >
                                        <Avatar onClick={() => setOpenAccountMenu((prev) => !prev)} className="bg-purple-200 cursor-pointer capitalize text-black " >{userState.user?.name?.charAt(0)}</Avatar>   {/* #423e65 */}
                                        {openAccountMenu && <Menu />}
                                    </div>
                                    {
                                        openAccountMenu && <Menu />
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <button style={{ boxShadow: '0px 0px 2px 4px rgb(0 0 0 / 20%)' }} onClick={handleSignUpClick} className="h-full bg-purple-900 text-white rounded-[3px] px-[8px] " >Register</button>
                            <button onClick={hanldeLoginClick} className="h-full text-white border-[1px] outline-none border-white  rounded-[3px] px-4 " >Login</button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar;