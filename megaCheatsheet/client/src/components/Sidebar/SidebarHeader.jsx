import { useState, useEffect } from "react"
import { FolderCopy, FileCopy, DriveFileRenameOutline, UnfoldLess, Cancel, ArrowForward, Delete } from "@mui/icons-material"
import { IconButton, Alert, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper, Card, InputBase } from "@mui/material"
import { useDispatch } from "react-redux"
import Draggable from 'react-draggable';
import { useDetectClickOutside } from 'react-detect-click-outside';


import { createFile, createSubFile, updateFile, updateSubFile, deleteFile, deleteSubFile } from "../../actions/file"
import { createFolder, createSubFolder, updateFolder, updateSubFolder, deleteFolder, deleteSubFolder } from "../../actions/folder"
import { useStateContext } from "../../contexts/ContextProvider"


const PaperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}




const SidebarHeader = () => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState } = useStateContext()
    const [fileFolderName, setFileFolderName] = useState('')
    const [hideFolderButton, setHideFolderButton] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        // console.log('showAlert', showAlert)
    }, [showAlert])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const closeInputField = () => {
        setFolderState({ ...folderState, showInputField: false })
    }

    // 1)
    const handleCreate = () => {
        if (folderState.inputField.type == 'file') {
            folderState.fileHierarchy.subParentFolder
                ?           // creating file in subFolder
                dispatch(createSubFile({ ...folderState.fileHierarchy, fileName: fileFolderName }))
                :           // creating file in parent Folder
                dispatch(createFile({ ...folderState.fileHierarchy, fileName: fileFolderName }))
            setFolderState({ ...folderState, showInputField: false, lastAction: `${fileFolderName} fileCreated` })
        }
        else {
            folderState.folderHierarchyForCreate.parentFolder
                ?           // creating subFolder
                dispatch(createSubFolder({ ...folderState.folderHierarchyForCreate, folderName: fileFolderName }))
                :           // creating rootFolder
                dispatch(createFolder({ folderName: fileFolderName }))

            setFolderState({ ...folderState, showInputField: false, lastAction: `${fileFolderName} folderCreated` })
        }
        setFileFolderName('')
    }

    // 2)
    const handleUpdate = () => {
        if (folderState.inputField.type == 'file') {
            folderState.fileHierarchy.subParentFolder
                ?       // updating file of sub folder
                dispatch(updateSubFile(folderState.currentFileId, { ...folderState.fileHierarchy, fileName: fileFolderName }))
                :       // updating file of parent folder
                dispatch(updateFile(folderState.currentFileId, { ...folderState.fileHierarchy, fileName: fileFolderName }))
            folderState.lastAction == 'fileUpdated' ? setFolderState({ ...folderState, showInputField: false, lastAction: '' }) : setFolderState({ ...folderState, showInputField: false, lastAction: 'fileUpdated' })
            setFolderState({ ...folderState, showInputField: false, lastAction: `${fileFolderName} fileUpdated` })
        }
        else {
            folderState.folderHierarchyForUpdate.parentFolder
                ?               // updating sub Folder
                dispatch(updateSubFolder(folderState.currentFolderId, { ...folderState.folderHierarchyForUpdate, folderName: fileFolderName }))
                :               // updating root folder
                dispatch(updateFolder(folderState.currentFolderId, { folderName: fileFolderName }))
            if (!(folderState.folderHierarchyForUpdate.parentFolder)) {     // if parentFolder get renamed
                if (folderState.folderHierarchyForCreate.parentFolder) folderState.folderHierarchyForCreate.parentFolder = fileFolderName
                if (folderState.fileHierarchy.parentFolder) folderState.fileHierarchy.parentFolder = fileFolderName
                if (folderState.fileHierarchy.parentFolder) folderState.fileHierarchy.parentFolder = fileFolderName
            }
            else {                                                          // if subFolder get renamed
                if (folderState.fileHierarchy.subParentFolder) folderState.fileHierarchy.subParentFolder = fileFolderName
                if (folderState.fileHierarchy.subParentFolder) folderState.fileHierarchy.subParentFolder = fileFolderName
            }
            setFolderState({ ...folderState, showInputField: false, lastAction: `${fileFolderName} folderUpdated` })
        }
        setFileFolderName('')
    }

    // 2)
    const handleDelete = () => {
        if (folderState.inputField.type == 'file') {
            folderState.fileHierarchy.subParentFolder
                ?                   // deleting file of subFolder
                dispatch(deleteSubFile(folderState.currentFileId, folderState.fileHierarchy))
                :                   // deleting file of folder
                dispatch(deleteFile(folderState.currentFileId, folderState.fileHierarchy))

            setFolderState({ ...folderState, showInputField: false, lastAction: 'fileDeleted' })
        }
        else {
            folderState.folderHierarchyForUpdate.parentFolder
                &&                  // deleting sub folder
                dispatch(deleteSubFolder(folderState.currentFolderId, folderState.folderHierarchyForUpdate))
            // :                    // deleting root folder 
            // dispatch(deleteFolder(folderState.currentFolderId))
            setFolderState({ ...folderState, folderHierarchyForCreate: {}, folderHierarchyForUpdate: {} })
            setFolderState({ ...folderState, showInputField: false, lastAction: 'folderDeleted' })
        }
        CloseDialogue()
    }

    // 2)
    const createFolderIconClick = () => {
        if (folderState.folderHierarchyForCreate.error) {
            setFolderState({ ...folderState, showAlert: true })
            setTimeout(() => {
                setFolderState({ ...folderState, showAlert: false })
                // console.log('alert get false')
            }, 2000);
        }
        else {
            setFolderState({ ...folderState, inputField: { type: 'folder', function: 'create', placeholder: 'Folder Name' }, showInputField: true })
        }
    }

    // 2)
    const createFileIconClick = () => {
        setFolderState({ ...folderState, inputField: { type: 'file', function: 'create', placeholder: 'File Name' }, showInputField: true })
    }

    // 2)
    const renameIconClick = () => {
        folderState.activeFile?.fileName
            ?               // renaming file
            setFolderState({ ...folderState, inputField: { type: 'file', function: 'update', placeholder: 'New File Name' }, showInputField: true })
            :               // renaming folder
            setFolderState({ ...folderState, inputField: { type: 'folder', function: 'update', placeholder: 'New Folder Name' }, showInputField: true })
    }

    // 2)
    const deleteIconClick = () => {

        // for deleting file
        if (folderState.isFile) {
            if (folderState.isParentFolder) {                       // if file is  of parentFolder
                setFolderState({ ...folderState, folderHierarchyForUpdate: {} })
            }
            else {                                                  // if file is of subFolder
                setFolderState({ ...folderState, folderHierarchyForUpdate: { parentFolder: parent.folderName } })
            }
            setFolderState({ ...folderState, inputField: { type: 'file', function: 'delete' }, openDialogue: true, currentFileId: folderState.activeFile._id })
        }

        // for deleting folder
        else {
            if (folderState.isParentFolder) {                       // if folder is parentfolder
                // setFolderHierarchyForUpdate({})
            }
            else {                                                  // if folder is subFolder
                setFolderState({ ...folderState, folderHierarchyForUpdate: { parentFolder: parent.folderName } })
            }
            setFolderState({ ...folderState, inputField: { type: 'folder', function: 'delete' }, openDialogue: true, currentFolderId: folderState.activeFolder._id })
            setOpenFolderMenu(false)
        }
    }

    // 2)
    const collapseFolders = () => {
        setFolderState({ ...folderState, closeAllFolders: true })
    }

    // 2)
    const CloseDialogue = () => { setFolderState({ ...folderState, openDialogue: false }) }

    /////////////////////////////////////////////////////////////// imported modules ////////////////////////////////////////////////////////////////////////
    const ref = useDetectClickOutside({ onTriggered: closeInputField });



    return (
        <>
            <div ref={ref} style={{ position: 'sticky', top: '1px', background: "#202124", padding: '1px', marginTop: '5px', zIndex: '50' }} className='p-[1px] mt-[5px] flex flex-col justify-between sticky top-[1px] bg-gray-900 z-50 ' >
                <div elevation={1} style={{ padding: '5px', marginTop: '5px' }} className='p-[1px] mt-[5px] w-full flex justify-between  bg-gray-900 ' >
                    <Tooltip title="Create Folder" placement="top" >
                        {/* disabled={!(folderState.isParentFolder) || folderState.isParentFolder == 'unselected'} */}
                        <IconButton style={{ padding: '0px' }} className="p-0 cursor-pointer" onClick={createFolderIconClick} ><FolderCopy style={{ height: '18px' }} className={`${hideFolderButton && 'hidden'} text-gray-300  h-[18px] `} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Create File" placement="top" >
                        {/* disabled={!(folderState.activeFolder.folderName) && !(folderState.activeFile.fileName)} */}
                        <IconButton style={{ padding: '0px' }} className="p-0 cursor-pointer" onClick={createFileIconClick} ><FileCopy style={{ height: '18px' }} className="text-gray-300 h-[18px] " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Rename" placement="top" >
                        {/* disabled={(!(folderState.activeFolder.folderName) && !(folderState.activeFile.fileName)) || (!(folderState.isFile) && folderState.isParentFolder)} */}
                        <IconButton style={{ padding: '0px' }} className="p-0 cursor-pointer" onClick={renameIconClick} ><DriveFileRenameOutline style={{ height: '18px' }} className="text-gray-300 h-[18px] " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" >
                        {/* disabled={(folderState.isParentFolder) && !(folderState.isFile)} */}
                        <IconButton style={{ padding: '0px' }} className="p-0 cursor-pointer" onClick={deleteIconClick} ><Delete style={{ height: '18px' }} className="text-gray-300 h-[18px] " /></IconButton>
                    </Tooltip>
                    <Tooltip title="Compress" placement="top" >
                        <IconButton style={{ padding: '0px' }} className="p-0 cursor-pointer" onClick={collapseFolders} ><UnfoldLess style={{ height: '18px' }} className="text-gray-300 h-[18px] " /></IconButton>
                    </Tooltip>
                </div>
                {
                    folderState.showInputField &&
                    <div className="relative my-[4px] " >
                        <InputBase
                            style={{ padding: "3px 8px", fontSize: '12px', padding: '1px 6px' }}
                            className=" folderInputField border-[1px] placeholder-gray-300 text-[12px] rounded-[5px] px-[8px] py-[3px]  w-full bg-transparent border-gray-300 text-gray-300 focus:outline-none "
                            name="fileFolderName"
                            placeholder={folderState.inputField.placeholder}
                            value={fileFolderName}
                            onChange={(e) => setFileFolderName(e.target.value)}
                            inputProps={{ minLength: 1, maxLength: 16 }}
                            margin='dense'
                            autoFocus={true}
                        />
                        <div
                            style={{ display: `${fileFolderName.length == 0 ? 'none' : ''}`, fontSize: '15px', height: "100%", width: "22%", }}
                            className={`${fileFolderName.length == 0 ? 'none' : ''} gap-[4px] absolute right-0 top-0 h-full w-[22%] flex  items-center `}
                        >
                            <Cancel
                                style={{ fontSize: '15px' }}
                                onClick={() => setFileFolderName('')}
                                className={`h-full cursor-pointer text-black text-[15px] bg-gray-300 rounded-full hover:bg-gray-900 `}
                            />
                            <ArrowForward
                                onClick={folderState.inputField.function == 'create' ? handleCreate : handleUpdate}
                                style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px", height: '100%' }}
                                className={`h-full w-[50%] rounded-br-[5px] rounded-tr-[5px] cursor-pointer text-black bg-gray-300 hover:text-gray-900 `}
                            />
                        </div>

                    </div>
                }
            </div>
            {
                <Dialog
                    open={folderState.openDialogue}
                    onClose={CloseDialogue}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Confirm! </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            The {`${folderState.isFile ? 'File' : 'Folder'}`} <span style={{ fontWeight: "bold" }} className="font-bold " > {`${folderState.isFile ? folderState.activeFile?.fileName : folderState.activeFolder?.folderName}`}</span> will be deleted permanently and you'll have no way to recover it.
                            Do you still wanna delete it?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={CloseDialogue}>Cancel</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default SidebarHeader
