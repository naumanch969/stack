import {
    HomeOutlined,
    DarkModeOutlined,
    WbSunnyOutlined,
    GridViewOutlined,
    NotificationsNoneOutlined,
    EmailOutlined,
    PersonOutlined,
    SearchOutlined
} from '@mui/icons-material'
import { loginImage } from '../../assets'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'


const Navbar = () => {

    const { isDarkMode, setIsDarkMode } = useStateContext()

    return (
        <div className={`sticky top-0 flex items-center justify-between px-[20px] py-[10px] h-[50px] border-b-[1px] border-border ${isDarkMode && 'border-border-dark'} `} >
            <div className='left flex items-center gap-[30px] ' >
                <Link to='/' className=' ' >
                    <span className='font-bold text-[20px] text-purple-900 ' >Lamasocial</span>
                </Link>
                <button className='' ><HomeOutlined /></button>
                {
                    isDarkMode
                        ?
                        <button className='' onClick={() => setIsDarkMode(false)} ><DarkModeOutlined /></button>
                        :
                        <button className='' onClick={() => setIsDarkMode(true)} ><DarkModeOutlined /></button>
                }
                <button className='' ><GridViewOutlined /></button>
                <div className={`search flex items-center gap-[10px] border-[1px] border-border ${isDarkMode && ' border-border-dark'} rounded-[5px] p-[5px] `} >
                    <SearchOutlined />
                    <input type='text' placeholder='Search' className='border-none outline-none w-[500px] ' />
                </div>
            </div>
            <div className='right flex items-center gap-[20px] ' >
                <button className='' ><PersonOutlined /></button>
                <button className='' ><EmailOutlined /></button>
                <button className='' ><NotificationsNoneOutlined /></button>
                <div className='user flex items-center gap-[30px]  ' >
                    <img src={loginImage} alt='' style={{ width: '30px', height: '30px' }} className='w-[30px] h-[30px] rounded-full object-cover  ' />
                    <span className='font-medium ' >Hamza Ali</span>
                </div>
            </div>
        </div>
    )
}


export default Navbar;