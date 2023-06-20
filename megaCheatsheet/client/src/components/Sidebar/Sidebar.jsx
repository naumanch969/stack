import { useState, useEffect, useRef } from "react"
import { Card, IconButton, Tooltip } from "@mui/material"
import {
    TextSnippetOutlined,
    Dehaze,
    GridViewOutlined,
    AssignmentOutlined,
    FormatListNumberedOutlined,
    TimelineOutlined,
    PsychologyAltOutlined,
    LinkedIn,
    Twitter,
    Facebook,
    Instagram,
    PlaylistAdd,
    Pending,
    PlaylistAddCheck
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"

import SidebarHeader from "./SidebarHeader"
import PredefinedFolders from "./predefinedFolders/SidebarItem"
import UserDefinedFolders from "./userDefinedFolders/SidebarItem"
import { useStateContext } from "../../contexts/ContextProvider"
import { getFolders } from '../../actions/folder'


const initialFolders = [
    {
        name: 'overview',
        icon: <GridViewOutlined />
    },
    {
        name: 'document',
        icon: <AssignmentOutlined />
    },
    {
        name: 'notes',
        icon: <TextSnippetOutlined />
    },
    {
        name: 'activity',
        icon: <TimelineOutlined />
    },
    {
        name: 'support',
        icon: <PsychologyAltOutlined />
    },
    {
        name: 'tasks',
        icon: <FormatListNumberedOutlined />
    },
    {
        name: 'Apps',
        icon: <FormatListNumberedOutlined />,
        children: [
            {
                name: 'Calender',
                icon: <PlaylistAdd className="text-[20px] " />
            },
            {
                name: 'Calculator',
                icon: <Pending className="text-[20px] " />
            },
            {
                name: 'Color Picker',
                icon: <PlaylistAddCheck className="text-[20px] " />
            },
        ]
    }
]



const Sidebar = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const wrapperRef = useRef(null);
    const { folders } = useSelector((state) => state.folder)


    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [foldersArr, setFoldersArr] = useState(initialFolders)
    const { openSidebar, folderState, setFolderState, setOpenSidebar } = useStateContext()


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getFolders())
    }, [])


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    function useOutsideAlerter(ref) {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current.parentNode == event.target) {
                    setFolderState({ ...folderState, folderHierarchyForCreate: {}, folderHierarchyForUpdate: {}, activeFile: {}, activeFolder: {}, currentFileId: '', currentFolderId: '', showInputField: false })
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);



    return (
        <div ref={wrapperRef} className={`${!openSidebar && 'hidden  '} w-full static overflow-hidden h-full bg-gray-900 text-gray-300 `} >

            <div raised="true" style={{ background: '#202124', boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className="h-[3.6rem] flex items-center justify-between px-[13px] bg-gray-900 " >
                <h2 className="font-bolder text-[2rem] text-gray-300" >Diary</h2>
                <IconButton onClick={() => setOpenSidebar((prev) => !prev)} ><Dehaze className="text-[2rem] text-gray-300 cursor-pointer " /></IconButton>
            </div>




            <div className="h-[83vh] relative  " >

                <div style={{ maxHeight: '83vh' }} className=" sidebar_scroll px-[13px] sticky top-0 left-0 overflow-y-scroll overflow-x-hidden max-h-[83vh] " >
                    {foldersArr.map((file, index) => (
                        <>
                            <PredefinedFolders item={file} key={index} initialFolders={initialFolders} />
                        </>
                    ))
                    }
                    <hr className="my-[8px] bg-gray-300 " />

                    <SidebarHeader />
                    {
                        openSidebar &&
                        <>
                            {
                                folders?.map((rootFolder, index) => (
                                    <UserDefinedFolders key={index} result={folders} item={rootFolder} />
                                ))
                            }
                        </>
                    }



                </div>



            </div>
            <Card elevation={3} style={{ background: "#202124" }} className="flex flex-col px-[13px] bg-gray-900  " >
                <div style={{ justifyContent: 'space-around' }} className="flex justify-around " >
                    <Tooltip title="Facebook" placement="top" >
                        <IconButton onClick={() => { }} ><Facebook style={{ height: '18px' }} className="text-gray-300 h-[18px]  " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Instagram" placement="top" >
                        <IconButton onClick={() => { }} ><Instagram style={{ height: '18px' }} className="text-gray-300 h-[18px]  " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Twitter" placement="top" >
                        <IconButton onClick={() => { }} ><Twitter style={{ height: '18px' }} className="text-gray-300 h-[18px]  " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Linkedin" placement="top" >
                        <IconButton onClick={() => { }} ><LinkedIn style={{ height: '18px' }} className="text-gray-300 h-[18px]  " /></IconButton>
                    </Tooltip>
                </div>
                <div className="flex justify-center items-center" >
                    <p className="text-[11px] text-gray-300 " >2022 All Rights Reserved</p>
                </div>
            </Card>


        </div>
    )
}


export default Sidebar

