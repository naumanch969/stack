import { Navbar, Sidebar } from "../App/components"
import { useStateContext } from "../contexts/ContextProvider"

const AppPageWrapper = (props) => {

    const { showSidebar, } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <div className=" w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col " >
            <div className="sticky left-0 top-0 z-[100] w-full bg-white " >{/* backdrop-brightness-50  */}
                <Navbar />
            </div>

            <div className="md:w-screen flex " >
                <div style={{ height: 'calc(100vh - 4rem) ' }} className={` ${showSidebar ? 'lg:w-[20%] md:w-[25%]' : 'lg:w-[5%] md:w-[6%] '} bg-white sticky top-[4rem] transition-all border-r-[2px] border-gray-100  `} >
                    <Sidebar />
                </div>

                <props.Component {...props} />

            </div>
        </div>
    )
}

export default AppPageWrapper