import { useState, useEffect } from "react"
import { ArrowForwardIos, MoreHoriz, Update, Delete } from "@mui/icons-material"
import { IconButton, Card } from "@mui/material"

import { useStateContext } from "../../../contexts/ContextProvider"
import SidebarItem from "./SidebarItem"
import Confirm from "../Confirm"
import Modal from '../Modal'


const ParentOfFolders = ({ item, result, rootFolder }) => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    var isRootFolder = result.find((parentFolder) => parentFolder.folderName == item.folderName)


    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState } = useStateContext()
    const [openFolderMenu, setOpenFolderMenu] = useState(false)
    const [openFileMenu, setOpenFileMenu] = useState(false)
    const [showFolderMenuIcon, setShowFolderMenuIcon] = useState(false)
    const [showFileMenuIcon, setShowFileMenuIcon] = useState(false)
    const [hoveredFile, setHoveredFile] = useState({})
    const [open, setOpen] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        folderState.closeAllFolders == true && setOpen(false)
        setFolderState({ ...folderState, closeAllFolders: false })
    }, [folderState.closeAllFolders])


    /////////////////////////////////////////////////////////////
    // FUNCTIONS ////////////////////////////////////////////////////////////////////////

    /////////////////////////////// OF FOLDERS //////////////////////////////
    // 1)
    var handleFolderClick = (item, parent) => {
        if (parent) {                               // if item is sub folder
            const parentFolder = parent.folderName
            console.log('ParentOfFolders - 1')
            const subParentFolder = item.folderName
            setFolderState({
                ...folderState,
                folderHierarchyForCreate: { error: "folder can't be created in third depth " },
                folderHierarchyForUpdate: { parentFolder },
                fileHierarchy: { parentFolder, subParentFolder },
                currentFolderId: item._id,
                modal: { ...folderState.modal, type: 'folder' },
                activeFolder: item,
                activeFile: {}

            })
        }
        else {                                      // if item is root/parent folder
            const parentFolder = item.folderName
            console.log('ParentOfFolders - 2')
            setFolderState({
                ...folderState,
                folderHierarchyForCreate: { parentFolder },
                folderHierarchyForUpdate: {},
                fileHierarchy: { parentFolder },
                currentFolderId: item._id,
                modal: { ...folderState.modal, type: 'folder' },
                activeFolder: item,
                activeFile: {}
            })
        }
        // setFolderState({ ...folderState, closeAllFolders: false })
        setOpen((prev) => !prev)
    }

    // 2)
    const handleCreateFolder = () => {
        setFolderState({ ...folderState, modal: { type: 'folder', function: 'create' }, openModal: true })
        setOpenFolderMenu(false)
    }

    // 2)
    const handleRenameFolder = () => {
        setFolderState({ ...folderState, currentFolderId: item._id, modal: { type: 'folder', function: 'update' }, openModal: true })
        setOpenFolderMenu(false)
    }

    // 3)
    const handleDeleteFolder = (parent) => {
        if (parent) {                   // if folder is subFolder
            setFolderState({ ...folderState, folderHierarchyForUpdate: { parentFolder: parent.folderName } })
        }
        else {                          // if folder is rootFolder
            // setFolderHierarchyForUpdate({})
        }
        setFolderState({ ...folderState, modal: { type: 'folder', function: 'delete' }, openDialogue: true, currentFolderId: item._id })
        setOpenFolderMenu(false)
    }

    // 4)
    var handleOpenFolderMenu = () => {    // for renaming or deleting folder without opening it.
        setOpenFolderMenu((pre) => !pre)
        setFolderState({ ...folderState, currentFolderId: item._id, modal: { ...folderState.modal, type: 'folder' } })
        rootFolder ? handleFolderClick(item, rootFolder) : handleFolderClick(item)
    }
    /////////////////////////////// OF FILES ////////////////////////////////

    // 1)
    const handleFileClick = (item, parent) => {         // item is also file
        var parentFolder = parent.folderName
        // a) -  if file is within root/parent folder
        parent?.files.map((file) => {
            if (file.fileName == item.fileName) {
                console.log('modal', folderState.modal)
                setFolderState({
                    ...folderState,
                    folderHierarchyForCreate: { parentFolder },
                    folderHierarchyForUpdate: {},
                    fileHierarchy: { parentFolder },
                    currentFileId: item._id,
                    modal: { ...folderState.modal, type: 'file' },
                    activeFile: file,
                    activeFolder: {}
                })
                // navigate(`${parentFolder}/${fileName}`)
            }
        })

        // b) -  if file is within subFolder
        parent?.folders?.map((subFolder) => {
            subFolder.files.map((file) => {
                if (file.fileName == item.fileName) {
                    const subParentFolder = subFolder.folderName
                    setFolderState({
                        ...folderState,
                        folderHierarchyForCreate: {},
                        folderHierarchyForUpdate: { parentFolder },
                        fileHierarchy: { parentFolder, subParentFolder },
                        currentFileId: item._id,
                        modal: { ...folderState.modal, type: 'file' },
                        activeFile: file,
                        activeFolder: {}
                    })
                    // navigate(`${parentFolder}/${subParentFolder}/${fileName}`)
                }
            })
        })
    }

    // 3)
    const handleCreateFile = () => {
        setFolderState({ ...folderState, modal: { type: 'file', function: 'create' }, openModal: true })
        setOpenFileMenu(false)
    }

    // 2)
    const handleRenameFile = (file) => {
        setFolderState({ ...folderState, currentFileId: file._id, modal: { type: 'file', function: 'update' }, openModal: true })
        setOpenFileMenu(false)
    }

    // 3)
    const handleDeleteFile = (file, parent) => {
        if (parent) {                  // if folder is subFolder
            setFolderState({ ...folderState, folderHierarchyForUpdate: { parentFolder: parent.folderName } })
        }
        else {                          // if folder is rootFolder
            setFolderState({ ...folderState, folderHierarchyForUpdate: {} })
        }
        setFolderState({ ...folderState, modal: { type: 'file', function: 'delete' }, openDialogue: true, currentFileId: file._id })
        setOpenFileMenu(false)
    }

    // 4)
    var handleOpenFileMenu = (file) => {    // for renaming or deleting folder without opening it.
        setOpenFileMenu((pre) => !pre)
        setFolderState({ ...folderState, currentFileId: item._id, modal: { ...folderState.modal, type: 'file' } })
        const parent = isRootFolder ? item : rootFolder
        handleFileClick(file, parent)
    }



    /////////////////////////////// OF RANDOM ////////////////////////////////

    const mouseEnteredInFolder = () => {
        setShowFolderMenuIcon(true)
    }

    const mouseLeavedFolder = () => {
        setShowFolderMenuIcon(false)
    }

    const mouseEnteredInFile = (file) => {
        setHoveredFile(file)
        setShowFileMenuIcon(true)
    }

    const mouseLeavedFile = () => {
        setHoveredFile({})
        setShowFileMenuIcon(false)
    }



    return (
        <div key={item?._id} className="pl-2 flex flex-col gap-[3px]" >

            {/********************************************************************** FOLDER *******************************************************************/}
            <div
                onMouseEnter={mouseEnteredInFolder}
                onMouseLeave={mouseLeavedFolder}
                style={{ background: `${folderState.activeFolder._id == item._id ? '#2f2f2f' : ''}` }}
                className="flex justify-between items-center rounded-lg hover:bg-[#2f2f2f] ">
                <div
                    onClick={rootFolder ? () => handleFolderClick(item, rootFolder) : () => handleFolderClick(item)}    //  rootFolder is only send throught sidebarItem of this file
                    className=" w-[85%] flex justify-start items-center cursor-pointer "
                >
                    <ArrowForwardIos style={{ width: '15px' }} className={` ${open && 'rotate-90'} w-[15px] hover:text-orange-color cursor-pointer duration-100 text-[1rem] text-gray-400  `} />
                    <p className="text-gray-400 m-[.1rem] my-[.3rem] w-full uppercase hover:text-orange-color"  >  {item?.folderName}  </p>
                </div>
                <div className="w-[15%] relative flex justify-center " >
                    {
                        showFolderMenuIcon &&
                        <MoreHoriz onClick={handleOpenFolderMenu} className="text-white cursor-pointer hover:text-orange-color" />
                    }
                    {
                        openFolderMenu &&
                        <Card className="absolute z-50 bg-gray-contrast w-[8rem] right-4 top-10 p-2  shadow-2xl items-start justify-center h-auto flex flex-col gap-[2px]  border-[2px] border-orange-color  " >
                            {isRootFolder &&
                                <>
                                    <button onClick={handleCreateFolder} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Update /> <span className="" >Create Folder</span> </button>
                                    <button onClick={handleCreateFile} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Update /> <span className="" >Create File</span> </button>
                                </>
                            }
                            <button onClick={handleRenameFolder} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Update /> <span className="" >Rename</span> </button>
                            <button onClick={rootFolder ? () => handleDeleteFolder() : () => handleDeleteFolder(item)} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Delete /> <span className="" >Delete</span> </button>
                        </Card>
                    }
                    <Modal />
                    <Confirm />
                </div>
            </div>


            {/********************************************************************** FILE *******************************************************************/}


            {item?.files && open && (
                item?.files.map((file, index) => (
                    <div key={index}
                        onMouseEnter={() => mouseEnteredInFile(file)}
                        onMouseLeave={mouseLeavedFile}
                        style={{ background: `${folderState.activeFile._id == file._id ? '#2f2f2f' : ''}` }}
                        className="flex justify-between items-center rounded-lg hover:bg-orange-color " >
                        <p
                            key={file.fileName}
                            onClick={() => handleFileClick(file, isRootFolder ? item : rootFolder)}
                            className="w-[85%] flex items-center cursor-pointer gap-0 h-8 pl-4 rounded-lg text-md text-gray-700  "
                        >
                            <IconButton className="py-2 px-1" >{file.icon}</IconButton>
                            <span className="capitalize" >{file.fileName}</span>
                        </p>
                        <div className="w-[15%] relative flex justify-center  " >
                            {
                                showFileMenuIcon && hoveredFile._id == file._id &&
                                <MoreHoriz onClick={() => handleOpenFileMenu(file)} className="text-white cursor-pointer " />
                            }
                            {
                                openFileMenu && folderState.currentFileId == file._id &&
                                <Card className="absolute z-50 bg-gray-contrast w-[8rem] right-4 top-10 p-2  shadow-2xl items-start justify-center h-auto flex flex-col gap-[2px]  border-[2px] border-orange-color  " >
                                    <button onClick={() => handleRenameFile(file)} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Update /> <span className="" >Rename</span> </button>
                                    <button onClick={isRootFolder ? () => handleDeleteFile(file) : () => handleDeleteFile(file, item)} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 " ><Delete /> <span className="" >Delete</span> </button>
                                </Card>
                            }
                            <Modal />
                            <Confirm />
                        </div>
                    </div>
                ))
            )}




            {/********************************************************************** SIDEBAR-ITEM *******************************************************************/}

            {
                open && (
                    item?.folders?.map((subFolder, index) => (
                        <>
                            <SidebarItem key={index} result={result} item={subFolder} rootFolder={item} />
                        </>
                    ))
                )
            }



        </div >
    )

}


export default ParentOfFolders