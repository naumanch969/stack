import { Navbar } from '../Web/components'

const WebPageWrapper = ({ Component }) => {


    return (
        <div className=" w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col " >

            <div className=" sticky left-0 top-0 z-50 w-full bg-white " >
                <Navbar />
            </div>

            <div className="w-full " >
                <Component />
            </div>

        </div>
    )
}

export default WebPageWrapper;