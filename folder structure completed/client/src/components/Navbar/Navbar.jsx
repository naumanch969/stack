import { Dehaze, Search, Cancel, AccountCircle, Logout, SavedSearch } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { Avatar, Card } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../../actions/user"
import { useStateContext } from "../../contexts/ContextProvider"

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState('')
    const { setOpenSidebar, isSignUpPage, setIsSignUpPage } = useStateContext()
    const [openMenu, setOpenMenu] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location])

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
        setOpenMenu(false)
    }

    const handleAccountClick = () => {
        navigate("/account")
        setOpenMenu(false)
    }

    return (
        <div className=" w-full h-full flex justify-between items-center px-12 " >

            <div style={{ width: '8rem' }} className="flex justify-between items-center text-white w-[8rem]  " >
                <Dehaze onClick={() => setOpenSidebar((prev) => !prev)} style={{ fontSize: '2rem' }} className="text-[2rem] cursor-pointer " />
                <Link to="/" style={{ fontSize: '2rem' }} className="text-[2rem]  " > </Link>
            </div>


            <div className="relative w-[20rem] h-[2rem] rounded-[2rem]  " >
                <input className="w-full h-full rounded-[2rem] p-4 text-black " onChange={(e) => setValue(e.target.value)} placeholder="Search..." name="search" value={value} />
                <div className="absolute right-0 top-0 flex items-center gap-2 h-full " >
                    <Cancel style={{ fontSize: '1rem', display: `${value.length == 0 ? 'none' : 'block'}` }} onClick={() => setValue("")} className={` cursor-pointer text-black text-[1rem] h-[100%] w-[3rem] bg-orange-color rounded-full `} />
                    <Search style={{ height: '100%', width: '2.5rem' }} className=" text-black text-[26px] h-full w-[2.5rem] bg-orange-color rounded-r-[2rem] " />
                </div>
            </div>


            <div className="h-[2rem] " >
                {
                    user ?
                        <div className="relative  flex gap-4 items-center " >
                            <h3 className="text-white font-bolder text-[22px] capitalize " >{user.result.firstName} {user.result.lastName}</h3>
                            <div className="relative" >
                                <Avatar onClick={() => setOpenMenu((prev) => !prev)} className="bg-orange-color cursor-pointer capitalize text-black " >{user?.result?.firstName?.charAt(0)}</Avatar>
                                {
                                    openMenu &&
                                    <div className="absolute shadow-2xl top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-4 p-4 border-[2px] border-orange-color  " >
                                        <button onClick={handleAccountClick} className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
                                        <button onClick={handleLogout} className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
                                        <button className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
                                        <button className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><AccountCircle /> <span className="" >Account</span> </button>
                                        <button className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><Logout /> <span className="" >Logout</span> </button>
                                        <button className="w-full flex hover:bg-[#555555] p-[6px] rounded-[6px] gap-2 " ><SavedSearch /> <span className="" >Saved</span> </button>
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <button onClick={handleSignUpClick} className="h-full bg-orange-color rounded-[1rem] px-4 " >Sign Up</button>
                            <button onClick={hanldeLoginClick} className="h-full text-orange-color border-[1px] outline-none border-orange-color  rounded-[1rem] px-4 " >Login</button>
                        </div>
                }
            </div>


        </div>
    )
}

export default Navbar;