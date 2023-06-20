import { Dehaze, Search, Cancel, AccountCircle, Logout, SavedSearch, KeyboardBackspace } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import { AppBar, Avatar, Card, IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../../actions/user"
import { useStateContext } from "../../contexts/ContextProvider"

const Navbar = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [value, setValue] = useState('')
    const wrapperRef = useRef(null);
    const { userState, setUserState, rightbar, setIsSignUpPage, setRightbar } = useStateContext()
    const [openAccountMenu, setOpenAccountMenu] = useState(false)
    const [showSearchBorder, setShowSearchBorder] = useState(false)


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        setUserState({
            ...userState,
            user: JSON.parse(localStorage.getItem('profile'))
        })
    }, [location])


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
        dispatch(logout())
        navigate("/")
        setOpenAccountMenu(false)
    }

    const handleAccountClick = () => {
        navigate("/account")
        setOpenAccountMenu(false)
    }

    const handleSearch = () => {
        setShowSearchBorder(true)
    }

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current.parentNode == event.target) {
                    setShowSearchBorder(false)
                    console.log('in this')
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    const handleToggleRightbar = () => {
        setRightbar(!rightbar)
    }

    useOutsideAlerter(wrapperRef);


    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className=" w-full h-[3.6rem] flex justify-between items-center px-12 pr-4   " >



            <div className={` relative min-w-[17rem] flex justify-between gap-[0px] w-auto h-[2rem] bg-inherit `} >
                <Search onClick={() => handleSearch} style={{ height: "100%", width: '2rem' }} className="cursor-pointer relative top-[-1%] bg-inherit   text-gray-400  h-full text-[26px] w-[2rem] " />
                <div className=" w-[15rem] h-full relative " >
                    <input
                        style={{ outline: 'none' }}
                        className={`h-full w-full bg-inherit text-gray-400  outline-none pl-[8px] `}
                        onChange={(e) => setValue(e.target.value)} placeholder="Search..." name="search" value={value}
                        onFocus={() => setShowSearchBorder(true)}
                        ref={wrapperRef}
                    />
                    <Cancel style={{ display: `${value.length == 0 ? 'none' : 'block'} `, fontSize: '16px', top: '0', height: "100%" }} onClick={() => setValue("")} className={`${value.length == 0 ? 'none' : 'block'} cursor-pointer absolute right-[1%] top-0 h-full text-[16px]  `} />
                </div>
            </div>


            <div className="h-[2rem] " >
                {
                    userState.user ?
                        <div className="relative  flex gap-4 items-center " >
                            <div className="flex gap-[8px] items-center justify-center " >
                                <div className="relative" >
                                    <Avatar onClick={() => setOpenAccountMenu((prev) => !prev)} style={{ background: "#423e65" }} className="bg-gray-400 cursor-pointer capitalize text-black " >{userState.user?.result?.firstName?.charAt(0)}</Avatar>
                                    {
                                        openAccountMenu &&
                                        <div className="absolute shadow-2xl top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-4 p-4 border-[2px] bg-gray-900 border-gray-400 rounded-[4px]  " >
                                            <button onClick={handleAccountClick} className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
                                            <button onClick={handleLogout} className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
                                            <button className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
                                            <button className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
                                            <button className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
                                            <button className="w-full flex hover:bg-gray-400 p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
                                        </div>
                                    }
                                </div>
                                <h3 className="text-gray-400 font-bolder text-[16px] capitalize " >Hello, {userState.user.result.firstName}</h3>
                            </div>
                            <button onClick={handleToggleRightbar} className=" z-[10] w-[35px] h-[35px] bg-gray-400  rounded-full " >
                                <KeyboardBackspace style={{ rotate: `${!rightbar && '180deg'}` }} className={`text-[32px] ${!rightbar && 'rotate-180'} `} />
                            </button>
                        </div>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <button style={{ boxShadow: '0px 0px 2px 4px rgb(0 0 0 / 20%)' }} onClick={handleSignUpClick} className="h-full bg-gray-900 text-white rounded-[3px] px-[8px] " >Register</button>
                            <button onClick={hanldeLoginClick} className="h-full text-white border-[1px] outline-none border-white  rounded-[3px] px-4 " >Login</button>
                        </div>
                }
            </div>


        </div>
    )
}

export default Navbar;