import { useEffect, useRef } from "react"
import { CalendarMonth, ViewKanban, FormatPaint, Colorize, Home } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"

import SidebarHeader from "./SidebarHeader/SidebarHeader"
import SidebarItem from "./SidebarItem/SidebarItem"
import { useStateContext } from "../../contexts/ContextProvider"
import { getFolders } from '../../actions/folder'


const Sidebar = () => {
    const dispatch = useDispatch()
    const wrapperRef = useRef(null);

    const { openSidebar, folderState, setFolderState } = useStateContext()
    const { folders } = useSelector((state) => state.folder)

    useEffect(() => {
        dispatch(getFolders())
    }, [])

    function useOutsideAlerter(ref) {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current.parentNode == event.target) {
                    setFolderState({ ...folderState, folderHierarchyForCreate: {}, folderHierarchyForUpdate: {}, activeFile: {}, activeFolder: {}, currentFileId: '', currentFolderId: '' })
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
        <div className={`${!openSidebar && 'hidden  '} ml:3 h-full px-[.4rem] bg-gray-shadow md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10`} >
            <SidebarHeader />
            {
                openSidebar &&
                <>
                    <div ref={wrapperRef} className="flex flex-col gap-[3px] " >
                        {
                            folders?.map((rootFolder, index) => (
                                <SidebarItem key={index} result={folders} item={rootFolder} />
                            ))
                        }
                    </div>
                </>

            }
        </div>
    )
}

export default Sidebar