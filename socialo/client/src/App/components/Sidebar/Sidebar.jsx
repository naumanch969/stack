import { useState, useEffect } from "react"
import {
    HomeOutlined, DashboardOutlined, PersonOutlined, GroupOutlined, CollectionsBookmarkOutlined, NotificationsNoneOutlined, AddBoxOutlined, AccountCircleOutlined, DensityMediumOutlined,
    Home, Dashboard, Person, Group, CollectionsBookmark, NotificationsNone, AddBox, AccountCircle, DensityMedium
} from "@mui/icons-material"
import { lowercase } from '../../../utils/functions/function'
import { Tooltip } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'


const Sidebar = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const { showSidebar, setShowSidebar } = useStateContext()
    const location = useLocation()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [route, setRoute] = useState(location.pathname.split('/'))

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <div style={{ height: 'calc(100vh-4rem)' }} className={`h-full w-full flex gap-[1.5rem] py-[1.5rem] overflow-y-scroll ${showSidebar ? 'px-[1rem]' : 'px-0 '} `}>
            {
                showSidebar
                    ?
                    <div className={`flex flex-col justify-between gap-[1rem] w-full h-full`}>
                        {
                            sidebarArr.map((item, index) => (
                                <Link
                                    key={index}
                                    to={`/app/${lowercase(item.name)}`}
                                    onClick={() => setRoute(['', 'app', lowercase(item.name)])}
                                    className={`${route[2] == lowercase(item.name) && 'font-extrabold bg-purple-100 text-purple-500 '} flex gap-[12px] py-[4px] px-[6px] w-full capitalize rounded-[4px] hover:bg-purple-100 hover:text-purple-500 cursor-pointer `}
                                >
                                    {
                                        route[2] == lowercase(item.name)
                                            ?
                                            <item.iconFilled className='' />
                                            :
                                            <item.iconOutlined className='' />
                                    }
                                    <span className={`${route[2] == lowercase(item.name) && 'font-bold text-purple-500 '} text-[18px] font-medium `} >{item.name}</span>
                                </Link>))
                        }
                    </div>
                    :
                    <div className={`flex flex-col justify-between gap-[8px] w-full h-full`}>
                        {
                            sidebarArr.map((item, index) => (
                                <Tooltip
                                    key={index}
                                    placement='right' title={item.namme}
                                >
                                    <Link
                                        to={`/app/${lowercase(item.name).split('/')}`}
                                        onClick={() => setRoute(['', 'app', lowercase(item.name)])}
                                        className={`py-[4px] px-[6px] w-full rounded-[4px]   cursor-pointer flex justify-center items-center `}
                                    >
                                        {
                                            route[2] == lowercase(item.name)
                                                ?
                                                <button className={`${route[2] == lowercase(item.name) && 'font-extrabold bg-gray-100 text-purple-500 '} w-[40px] h-[40px] rounded-full hover:bg-gray-100 hover:text-purple-500 ${route[2] == lowercase(item.name) && 'bg-gray-100'} `} >
                                                    <item.iconFilled className={``} />
                                                </button>
                                                :
                                                <button className={`${route[2] == lowercase(item.name) && 'font-extrabold bg-gray-100 text-purple-500 '} w-[40px] h-[40px] rounded-full hover:bg-gray-100 hover:text-purple-500 ${route[2] == lowercase(item.name) && 'bg-gray-100'} `} >
                                                    <item.iconOutlined className={``} />
                                                </button>
                                        }
                                    </Link>
                                </Tooltip>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default Sidebar



const sidebarArr = [
    {
        name: 'Home',
        iconFilled: Home,
        iconOutlined: HomeOutlined
    },
    {
        name: 'Dashboard',
        iconFilled: Dashboard,
        iconOutlined: DashboardOutlined
    },
    {
        name: 'Friends',
        iconFilled: Person,
        iconOutlined: PersonOutlined
    },
    {
        name: 'Groups',
        iconFilled: Group,
        iconOutlined: GroupOutlined
    },
    {
        name: 'Collections',
        iconFilled: CollectionsBookmark,
        iconOutlined: CollectionsBookmarkOutlined
    },
    {
        name: 'Notifications',
        iconFilled: NotificationsNone,
        iconOutlined: NotificationsNoneOutlined
    },
    {
        name: 'Create',
        iconFilled: AddBox,
        iconOutlined: AddBoxOutlined
    },
    {
        name: 'Profile',
        iconFilled: AccountCircle,
        iconOutlined: AccountCircleOutlined
    },
    {
        name: 'More',
        iconFilled: DensityMedium,
        iconOutlined: DensityMediumOutlined
    },
]
