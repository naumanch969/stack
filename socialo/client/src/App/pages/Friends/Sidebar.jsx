import { useEffect } from "react"
import {
    Dehaze,
    HomeOutlined, PersonSearchOutlined, PermContactCalendarOutlined, EmojiPeopleOutlined, Diversity3Outlined,
    Home, PersonSearch, PermContactCalendar, EmojiPeople, Diversity3,
} from "@mui/icons-material"
import { lowercase } from '../../../utils/functions/function'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'


const Sidebar = ({ selectedItem }) => {

    //////////////////////////// VARIABLES ////////////////////////////////////
    const { showFriendSidebar, setShowFriendSidebar, setShowSidebar } = useStateContext()

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////
    useEffect(() => {
        setShowSidebar(false)
    }, [])

    //////////////////////////// FUNCTIONS /////////////////////////////////////


    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className={`h-full w-full sticky  flex flex-col items-start z-50 gap-[1.5rem]  `}>
            {
                showFriendSidebar
                    ?
                    <div className={`overflow-y-scroll overflow-hidden flex flex-col justify-start gap-[1rem] w-full h-full px-[8px] py-[1rem] `}>
                        <button onClick={() => setShowFriendSidebar(pre => !pre)} className='w-[40px] h-[40px] rounded-full text-purple-500 hover:bg-gray-100'  ><Dehaze className="" /></button>
                        {sidebarArr.map((item, index) => (
                            <Link
                                key={index}
                                to={`/app/friends/${item.link}`}
                                className={`${selectedItem == item.link && ' bg-purple-100 text-purple-500'} flex gap-[12px] py-[10px] px-[8px] w-full capitalize rounded-[4px] hover:bg-purple-100 hover:text-purple-500 cursor-pointer `}
                            >
                                {
                                    selectedItem == item.link
                                        ?
                                        <item.iconFilled />
                                        :
                                        <item.iconOutlined />
                                }
                                <span className={``} >{item.name}</span>
                            </Link>
                        ))}
                    </div>
                    :
                    <div className={`overflow-y-scroll overflow-hidden flex flex-col ${showFriendSidebar ? 'justify-center' : 'justify-start'} items-center gap-[1rem] w-full h-full py-[1rem] `}>
                        <button onClick={() => setShowFriendSidebar(pre => !pre)} className='w-[40px] h-[40px] rounded-full text-purple-500 hover:bg-gray-100'  ><Dehaze className="" /></button>
                        {sidebarArr.map((item, index) => (
                            <Link
                                key={index}
                                to={`/app/friends/${item.link}`}
                                className={`${selectedItem == item.link && 'font-extrabold bg-purple-100 text-purple-500'} flex justify-center items-center gap-[12px]  capitalize rounded-full `}
                            >
                                {
                                    selectedItem == item.link
                                        ?
                                        <button className={`
                                            ${selectedItem == lowercase(item.link) && 'font-extrabold bg-gray-100 text-purple-500 '} 
                                            ${selectedItem == lowercase(item.link) && 'bg-gray-100'} 
                                            w-[40px] h-[40px] rounded-full hover:bg-gray-100 hover:text-purple-500`}
                                        >
                                            <item.iconFilled className={``} />
                                        </button> :
                                        <button className={`
                                            ${selectedItem == lowercase(item.link) && 'font-extrabold bg-gray-100 text-purple-500 '} 
                                            ${selectedItem == lowercase(item.link) && 'bg-gray-100'} 
                                            w-[40px] h-[40px] rounded-full hover:bg-gray-100 hover:text-purple-500`}
                                        >
                                            <item.iconOutlined className={``} />
                                        </button>}
                            </Link>
                        ))}
                    </div>
            }
        </div>
    )
}
export default Sidebar



const sidebarArr = [
    {
        name: 'Home',
        link: 'home',
        iconFilled: Home,
        iconOutlined: HomeOutlined
    },
    {
        name: 'Friends',
        link: 'friends',
        iconFilled: Diversity3,
        iconOutlined: Diversity3Outlined
    },
    {
        name: 'Suggestions',
        link: 'suggestions',
        iconFilled: PermContactCalendar,
        iconOutlined: PermContactCalendarOutlined
    },
    {
        name: 'Requests',
        link: 'requests',
        iconFilled: EmojiPeople,
        iconOutlined: EmojiPeopleOutlined
    },
    {
        name: 'Search',
        link: 'search',
        iconFilled: PersonSearch,
        iconOutlined: PersonSearchOutlined
    },
]
