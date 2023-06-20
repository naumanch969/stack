import { Navbar, Rightbar, Leftbar } from "../components";
import { useStateContext } from '../contexts/ContextProvider'

const AppWrapper = ({ Children }) => {
    const { isDarkMode } = useStateContext()

    return (
        <div className={`bg-bg ${isDarkMode && `bg-bg-dark`} `} >
            <Navbar />
            <div className='flex   ' >
                <Leftbar />
                <div style={{ flex: '6' }} className='flex-[6] ' >
                    <Children />
                </div>
                <Rightbar />
            </div>
        </div>
    )
}

export default AppWrapper;
