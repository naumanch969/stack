import { useState, useEffect, useRef } from "react"
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, Route, Routes } from "react-router-dom"

import { Sidebar, UserProfile } from "../components"
import { Pins } from "./"
import { client } from "../client"
import logo from "../assets/logo.png"
import { userQuery } from "../utils/data"

const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const scrollRef = useRef(null)
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('profile')) : localStorage.clear()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [])
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out " >

{/* desktop sidebar */}
            <div className="hidden md:flex h-screen flex-initial  " >
                <Sidebar user={user && user} />
            </div>

{/* mobile sidebar */}
            <div className="flex md:hidden flex-row  " >

                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md " >
                    <HiMenu className="cursor-pointer" fontSize={40} onClick={() => setToggleSidebar(true)} />
                    <Link to="/" >
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`} >
                        <img src={user?.image} alt="logo" className="w-28" />
                    </Link>
                </div>

                {toggleSidebar && (
                    <div className="fixed w-4/5 bg-white overflow-y-auto h-screen shadow-md z-10 animate-slide-in " >
                        <div className="absolute w-full flex justify-end items-center p-2 " >
                            <AiFillCloseCircle fontSize="30px" className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}

            </div>

            <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef} >
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/" element={<Pins user={user && user} />} />
                </Routes>
            </div>

        </div>
    )
}


export default Home;