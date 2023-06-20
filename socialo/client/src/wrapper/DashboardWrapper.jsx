import { Navbar } from "../App/components"
import Sidebar from "../App/pages/Dashboard/Sidebar/Sidebar"
import { useStateContext } from "../contexts/ContextProvider"

const DashboardWrapper = ({ Component }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <div className=" flex flex-col w-full " >
            <div className="sticky left-0 top-0 z-50 w-full  " >{/* backdrop-brightness-50  */}
                <Navbar />
            </div>

            <div className="md:w-screen flex bg-purple-100 " >
                <div style={{ height: 'calc(100vh-4rem)' }} className="lg:w-[20%] md:w-[25%] border-r-[8px] border-gray-500 " >
                    <Sidebar />
                </div>

                <div style={{ background: '#202124' }} className="lg:w-[80%] md:w-[75%] flex justify-center px-8 " >
                    <Component />
                </div>
            </div>
        </div>
    )
}

export default DashboardWrapper