import { useState, useEffect } from "react"
import { FolderCopy, FileCopy, DriveFileRenameOutline, UnfoldLess } from "@mui/icons-material"
import { IconButton, Alert, Tooltip } from "@mui/material"
import { useStateContext } from "../../../contexts/ContextProvider"
import Modal from "../Modal"

const SidebarHeader = () => {

    const [hideFolderButton, setHideFolderButton] = useState(false)
    const { folderState, setFolderState } = useStateContext()
    const [showAlert, setShowAlert] = useState(false)

    const handleCreateFolder = () => {
        if (folderState.folderHierarchyForCreate.error) {
            setFolderState({ ...folderState, showAlert: true })
            // alert(folderState.folderHierarchyForCreate.error)
            setTimeout(() => {
                setFolderState({ ...folderState, showAlert: false })
                console.log('gety false')
            }, 2000);
        }
        else {
            setFolderState({ ...folderState, modal: { type: 'folder', function: 'create' }, openModal: true })
        }
    }
    useEffect(() => {
        console.log('showAlert', showAlert)
    }, [showAlert])


    const handleCreateFile = () => {
        setFolderState({ ...folderState, modal: { type: 'file', function: 'create' }, openModal: true })
    }

    const handleRename = () => {
        folderState.modal.type == 'file'
            ?
            setFolderState({ ...folderState, modal: { type: 'file', function: 'update' }, openModal: true })
            :
            setFolderState({ ...folderState, modal: { type: 'folder', function: 'update' }, openModal: true })
    }

    const handleCollapse = () => {
        setFolderState({ ...folderState, closeAllFolders: true })
    }

    return (
        <>
            <div className='flex justify-center mb-[.4rem] gap-4 ' >
                <Tooltip title="Create Folder" placement="top" >
                    <IconButton onClick={handleCreateFolder} ><FolderCopy className={`${hideFolderButton && 'hidden'} text-gray-400  h-[1.2rem] hover:text-orange-color `} /></IconButton>
                </Tooltip>
                <Tooltip title="Create File" placement="top" >
                    <IconButton onClick={handleCreateFile} ><FileCopy className="text-gray-400 h-[1.2rem] hover:text-orange-color " /></IconButton>
                </Tooltip>
                <Tooltip title="Rename" placement="top" >
                    <IconButton onClick={handleRename} ><DriveFileRenameOutline className="text-gray-400 h-[1.2rem] hover:text-orange-color " /></IconButton>
                </Tooltip>
                <Tooltip title="Compress" placement="top" >
                    <IconButton onClick={handleCollapse} ><UnfoldLess className="text-gray-400 h-[1.2rem] hover:text-orange-color " /></IconButton>
                </Tooltip>
            </div>
            <Modal />
        </>
    )
}

export default SidebarHeader
