import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import {
    KeyboardBackspaceOutlined, Home,
    GridViewOutlined, GridView, AssignmentOutlined, Assignment, TextSnippetOutlined, TextSnippet, TimelineOutlined, Timeline, PsychologyAltOutlined, PsychologyAlt, FormatListNumberedOutlined, FormatListNumbered, PlaylistAddOutlined, PlaylistAdd, PendingOutlined, Pending, PlaylistAddCheckOutlined, PlaylistAddCheck
} from "@mui/icons-material"
import { Link } from 'react-router-dom'
import { lowercase } from '../../../../utils/functions/function'


const Sidebar = () => {

    //////////////////////////// VARIABLES ////////////////////////////////////
    const navigate = useNavigate()
    //////////////////////////// STATES ///////////////////////////////////////
    const [activeNavLink, setActiveNavLink] = useState(window.location.pathname)

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////




    const NavItem = ({ item, to }) => (
        <Link
            to={to}
            onClick={() => setActiveNavLink(`/app/dashboard/${lowercase(item.name)}`)}
            className={`flex gap-[12px] py-[4px] px-[6px] w-full capitalize rounded-[4px] hover:bg-purple-100 hover:text-purple-500 cursor-pointer `}
        >
            {
                activeNavLink == `/app/dashboard/${lowercase(item.name)}`
                    ?
                    <item.iconFilled className={`${activeNavLink == `/app/dashboard/${lowercase(item.name)}` && 'font-extrabold text-purple-500 '}`} />
                    :
                    <item.iconOutlined className='' />
            }
            <span className={`${activeNavLink == `/app/dashboard/${lowercase(item.name)}` && 'font-bold text-purple-500 '} text-[18px] font-medium `} >{item.name}</span>
        </Link>
    )

    // <div className = "flex items-center gap-[1rem] bg-purple-500 text-purple-100 p-[1rem] text-[20px] font-semibold " >
    //         <button onClick={() => navigate('/app')} className=" " ><KeyboardBackspaceOutlined /></button>
    //         <h3>Dashboard</h3>
    //     </div>
    return (
        <div
            style={{ height: 'calc(100vh - 4rem)' }}
            className={`w-full sticky top-[4rem] flex flex-col `}
        >
            <div className="flex flex-col gap-[4px] py-[1rem] px-[1rem]" >
                <div className="relative top-[-10px] flex items-center gap-[1rem] py-[8px] text-[20px] font-semibold " >
                    <button onClick={() => navigate('/app')} className="flex items-end gap-[4px] p-[4px] rounded-full hover:bg-purple-200 hover:text-purple-800 " >
                        <Home style={{ fontSize: '24px' }} className="text-[30px]" />
                        <span className="text-[16px] font-medium " >Home</span>
                    </button>
                </div>
                <div className={`overflow-y-scroll overflow-hidden flex flex-col justify-start gap-[1rem]   w-full h-full`}>
                    {
                        sidebarArr.map((item, index) => (
                            <NavItem item={item} to={`/app/dashboard/${lowercase(item.name)}`} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Sidebar



const sidebarArr = [
    {
        name: 'overview',
        iconOutlined: GridViewOutlined,
        iconFilled: GridView,
    },
    {
        name: 'document',
        iconOutlined: AssignmentOutlined,
        iconFilled: Assignment,
    },
    {
        name: 'notes',
        iconOutlined: TextSnippetOutlined,
        iconFilled: TextSnippet,
    },
    {
        name: 'activity',
        iconOutlined: TimelineOutlined,
        iconFilled: Timeline,
    },
    {
        name: 'tasks',
        iconOutlined: FormatListNumberedOutlined,
        iconFilled: FormatListNumbered,
    },
]
