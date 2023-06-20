import { useState } from "react"
import { ArrowForward, Cancel, Search, ArrowRightAlt } from "@mui/icons-material"
import { useStateContext } from "../../contexts/ContextProvider"
import { IconButton } from "@mui/material"
import { Link } from "react-scroll"


const Rightbar = () => {
    const { codeState, setCodeState } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const screenHeight = window.screen.height
    const screenWidth = window.screen.width
    const codesPerPage = codeState.codesPerPage
    const totalDocs = codeState.codesLength
    const numberOfPages = Math.ceil(totalDocs / codesPerPage)
    const startingPoint = (codeState.currentPage * codesPerPage) - codesPerPage
    const endPoint = (codeState.currentPage * codesPerPage)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [searchInput, setSearchInput] = useState('')

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleClick = () => {

    }
    /////////////////////////////////////////////////////////////// Actual Component ////////////////////////////////////////////////////////////////////////
    return (
        <div style={{ padding: '4px', paddingTop: '0' }} className="thinScrollbar w-full h-full p-[4px] pt-0 overflow-scroll " >

            {/* <IconButton><ArrowForward /></IconButton> */}


            <div className="sticky top-0 bg-inherit " >

                <h3 className="text-[24px] font-medium text-text-gray-100 h-[48px] flex justify-between items-center  " >In This Page</h3>

                <div className="relative  py-[5px] " >
                    <input style={{ borderRadius: '10px', paddingRight: '22px' }} className="w-full h-[2rem] rounded-[8px] p-[5px] border-[1px] border-gray-400 text-text-gray-100 pr-[22px] " value={searchInput} onChange={handleChange} placeholder="search" />
                    <Cancel style={{ position: 'absolute', top: '50%', right: "5px", transform: 'translate(0px,-50%)', fontSize: '18px' }} className={` ${searchInput.length == 0 ? 'hidden' : 'block'} outline-none cursor-pointer absolute right-[5px] top-[50%] transform translate-x-0 translate-y-[-50%] text-[18px] `} onClick={() => setSearchInput('')} />
                </div>

                <div className="" >
                    <p className="text-[20px] font-medium text-text-gray-200 pb-[5px] " >No. of posts: <span>{codeState.codesLength}</span>  </p>
                </div>
            </div>



            <div className="flex flex-col items-start  " >
                {
                    codeState?.codesArr?.slice(startingPoint, endPoint)?.map((code, index) => (
                        <Link
                            id="link"
                            to={code._id}
                            activeClass="active"
                            smooth={true}
                            spy={true}
                            offset={-100}
                            duration={300}
                            className="flex items-center gap-[5px] hover:text-gray-900 cursor-pointer "
                        >
                            <p >{index + 1}.</p>
                            <p className="my-[4px] underline " >
                                {code.title}
                            </p>
                        </Link>
                    ))
                }
            </div>


        </div>
    )
}

export default Rightbar




const links = [
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
    {
        title: 'what is tuple of python explained',
    },
    {
        title: 'Annoying Errors',
    },
    {
        title: 'conversion',
    },
    {
        title: 'useRef explained',
    },
    {
        title: 'folder structure example',
    },
    {
        title: 'this is title no. 6',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'URI Malformed',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'Funtion to copy text',
    },
    {
        title: 'code block',
    },
    {
        title: 'some explanation of nuxt js',
    },
    {
        title: 'env file',
    },
    {
        title: 'how to use useContext hook',
    },
    {
        title: 'config js file of tailwind',
    },
]