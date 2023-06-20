import { Search, Person } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import categories from './Categories.json'

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const { screenSize, setScreenSize, setActiveMenu, fetchHeadlines } = useStateContext()

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchClick = async () => {
        // navigate(`/news/${searchQuery}&pk&en`)
        console.log('handleSearchClick')
        // setSearchQuery("")
        fetchHeadlines()
    }

    return (
        <>
            <nav className='flex flex-col justify-center h-[56px]  ' >
                <div className="flex justify-between items-center w-full px-[5rem] bg-white "   >
                    <Link to="/">
                        <h5 className='text-[32px] font-bold text-blue ' style={{ fontFamily: 'cursive' }} >NEWZ</h5>
                    </Link>
                    <div className='h-full flex items-center gap-[1rem] ' >
                        <div className="bg-light-gray overflow-hidden relative flex items-center w-[25rem] h-[36px] border-[1px] rounded-[4px] border-gray-400 "   >
                            <input className="px-[12px] bg-inherit w-[90%] h-full  " placeholder="Search..." value={searchQuery} onChange={handleChange} />
                            <button className="absolute cursor-pointer right-0 top-0 h-full w-[3rem] bg-blue text-white rounded-[4px] flex justify-center items-center " disabled={searchQuery === ""} onClick={handleSearchClick} >
                                <Search position="absolute" />
                            </button>
                        </div>
                        {/* 
                        <div className="flex gap-[4px] h-[36px] " >
                            <button className="bg-blue w-[5rem] rounded-[4px] text-white " >Register</button>
                            <button className="bg-light-gray w-[4rem] rounded-[4px] text-blue border-[1px] border-blue " >Login</button>
                        </div> */}
                        <button className="w-[36px] h-[36px] bg-light-gray rounded-full border-[1px] border-gray-400 " >
                            <Person style={{ fontSize: '28px' }} className="text-[28px] " />
                        </button>
                    </div>

                </div>
            </nav>
            <div className="flex justify-center items-center h-[42px] border-b-[.5px] border-t-[.5px] border-gray-400 w-full bg-light-gray " >
                <div className="flex items-center gap-[12px] h-full py-[4px] "  >
                    {
                        categories.slice(0, 10).map((category, index) => (
                            <Link to='' key={index} className='hover:text-blue hover:bg-white text-black text-[18px] font-medium h-full flex justify-center items-center px-[12px] rounded-[4px] ' >
                                {category.topic}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar


    // < Avatar alt = { user.result.name } src = { user.result.imageUrl } > { user.result.name.charAt(0) }</ >
