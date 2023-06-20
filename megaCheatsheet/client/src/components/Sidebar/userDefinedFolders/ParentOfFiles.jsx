import { useState, useEffect } from "react"
import { ArrowForwardIos, MoreHoriz, Update, Circle, Code } from "@mui/icons-material"
import { IconButton, Card } from "@mui/material"

import { useStateContext } from "../../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom"

const ParentOfFolders = ({ item, result }) => {
    //item - { _id: '639ee930872a9c165dcf6431', user: '636e14db3d244c0d533dccd6', folderName: 'Debates', folders: Array(0), files: Array(2), … }
    //result - all folders

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState, setSelectedPreDefinedSidebarItem, urlPath, setUrlPath, openedFolders, setOpenedFolders } = useStateContext()
    const [open, setOpen] = useState(false)

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const isParent = Boolean(item?.folders?.length)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        folderState.closeAllFolders == true && setOpen(false)
        setFolderState({ ...folderState, closeAllFolders: false })
    }, [folderState.closeAllFolders])


    // useEffect to open the folder on the base of url (when page is refreshed , following useEffect will execute)
    useEffect(() => {
        let parentFolder = urlPath[0]
        let fileName = urlPath[2]
        result.map((rootFol) => {

            if (rootFol.folders.length == 0 && rootFol.folderName == parentFolder) {
                handleFolderClick(rootFol)
                rootFol.files.map((fileOfParent) => {
                    if (fileOfParent.fileName == fileName) {
                        handleFileClick(fileOfParent, rootFol)
                    }
                })
            }

        })
    }, [])


    // useEffect(() => {

    //     var parentFolder = urlPath[0]
    //     var subParentFolder = urlPath[1]
    //     var fileName = urlPath[2]

    //     result.map((rootFol) => {

    //         if (rootFol.folderName == parentFolder) {         //if parentFolder  is matched

    //             if (rootFol.folders?.length == 0) {                     // parentOFFiles

    //                 rootFol.files.map((file) => {
    //                     if (file.fileName == fileName) {
    //                         setOpenedFolders({
    //                             parentFolder: [...openedFolders.parentFolder, parentFolder],
    //                             subParentFolder: [...openedFolders.subParentFolder],
    //                             fileName
    //                         })
    //                     }
    //                 })
    //             }

    //             else {                                                  // parentOfFolders
    //                 rootFol.folders.map((subFol) => {

    //                     if (subParentFolder == subFol.folderName) {     // if file is within subParentFolder
    //                         subFol.files.map((file) => {
    //                             if (file.fileName == fileName) {
    //                                 setOpenedFolders({
    //                                     parentFolder: [...openedFolders.parentFolder, parentFolder],
    //                                     subParentFolder: [...openedFolders.subParentFolder, subFol.folderName],
    //                                     fileName
    //                                 })
    //                             }
    //                         })
    //                     }

    //                     else if (subParentFolder == 'nothing') {        // if file is within parentFolder
    //                         subFol.files.map((file) => {
    //                             if (file.fileName) {
    //                                 setOpenedFolders({
    //                                     parentFolder: [...openedFolders.parentFolder, parentFolder],
    //                                     subParentFolder: [...openedFolders.subParentFolder],
    //                                     fileName
    //                                 })
    //                             }
    //                         })
    //                     }
    //                 })
    //             }

    //         }


    //     })

    // }, [])


    useEffect(() => {
        setUrlPath(window.location.pathname.split('/').slice(1,))
    }, [window.location.pathname])

    // useEffect(() => {
    //     console.log('openedFolders', openedFolders)
    // }, [])


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    /////////////////////////////// OF FOLDERS //////////////////////////////
    var handleFolderClick = (item) => {
        // item is rootFolder to be clicked
        const parentFolder = item.folderName
        setFolderState({
            ...folderState,
            folderHierarchyForCreate: { parentFolder },
            folderHierarchyForUpdate: {},
            fileHierarchy: { parentFolder },
            currentFolderId: item._id,
            activeFolder: item,
            activeFile: {},
            isParentFolder: true,
            isFile: false
        })

        openedFolders.parentFolder.includes(parentFolder)
            ?
            setOpenedFolders({
                parentFolder: openedFolders.parentFolder.filter((folNam) => folNam !== parentFolder),
                subParentFolder: [...openedFolders.subParentFolder],
                fileName: ''
            })
            :
            setOpenedFolders({
                parentFolder: [...openedFolders.parentFolder, parentFolder],
                subParentFolder: [...openedFolders.subParentFolder],
                fileName: ''
            })

        setOpen((prev) => !prev)
        setSelectedPreDefinedSidebarItem('')
    }

    /////////////////////////////// OF FILES ////////////////////////////////

    // 1)
    const handleFileClick = (item, parent) => {         // item is also file
        var parentFolder = parent.folderName

        parent?.files.map((file) => {

            if (file.fileName == item.fileName) {
                setFolderState({
                    ...folderState,
                    folderHierarchyForCreate: { parentFolder },
                    folderHierarchyForUpdate: {},
                    fileHierarchy: { parentFolder },
                    currentFileId: item._id,
                    activeFile: item,
                    activeFolder: {},
                    isParentFolder: true,
                    isFile: true
                })
                setOpenedFolders({
                    parentFolder: [...openedFolders.parentFolder],
                    subParentFolder: [...openedFolders.subParentFolder],
                    fileName: item.fileName
                })
                navigate(`${parentFolder}/nothing/${item.fileName}`)
            }

        })


        setSelectedPreDefinedSidebarItem('')
    }




    /////////////////////////////////////////////////////////////// Sub Components /////////////////////////////////////////////////////////////////////
    // 1)
    const Hr = () => (                                                      // white vertical line appeared to the extreme left of selected item/file/folder - it appears to left of only one item
        <hr style={{ left: folderState.isParentFolder ? '-16px' : '-24px' }} className="h-full w-[3px] top-0 rounded-[2px] absolute left-[-12px] bg-gray-300 " />
    )


    /////////////////////////////////////////////////////////////// Actual Components /////////////////////////////////////////////////////////////////////
    return (
        <div className={` ${openedFolders.parentFolder.includes(item.folderName) && 'bg-gray-800'} flex flex-col gap-[3px] my-[8px] `} >

            <div key={item._id} className=" flex flex-col gap-[3px]  " >


                {/********************************************************************** FOLDER *******************************************************************/}
                <div
                    className={`
                    ${((openedFolders.parentFolder.includes(item.folderName) && openedFolders.fileName == '')) ? 'bg-gray-400 text-gray-900 ' : (openedFolders.parentFolder.includes(item.folderName) && openedFolders.fileName !== '' && 'bg-gray-600 text-gray-900 ')} 
                    px-[4px] flex justify-between items-center rounded-lg text-gray-300  hover:bg-gray-400 hover:text-gray-900  `}>
                    <div
                        onClick={() => handleFolderClick(item)}                    // rootFolder is only send throught sidebarItem of this file
                        className="w-full flex justify-between items-center cursor-pointer relative "
                    >
                        <p className="relative my-[.3rem] w-full uppercase">
                            <Code className="mr-[5px]  " />
                            <span>{item?.folderName}</span>
                            {folderState.activeFolder._id == item._id && <Hr />}
                        </p>
                        <ArrowForwardIos style={{ fontSize: '14px' }} className={`${openedFolders.parentFolder.includes(item.folderName) && 'rotate-90'} text-[14px] `} />
                    </div>
                </div>

                {/********************************************************************** FILE *******************************************************************/}

                {openedFolders.parentFolder.includes(item.folderName) && (
                    item?.files.map((file, index) => (
                        <div key={index}
                            className={`
                            ${openedFolders.fileName == file.fileName && openedFolders.parentFolder.includes(item.folderName) && 'bg-gray-400'} 
                            flex justify-between items-center rounded-lg  text-gray-300  hover:bg-gray-400 hover:text-gray-900  `}
                        >
                            <p
                                onClick={() => handleFileClick(file, item)}
                                className="w-full relative flex items-center cursor-pointer gap-0 h-8 pl-[12px] rounded-lg text-md "
                            >
                                <Circle style={{ fontSize: '16px' }} className=" mr-[8px] text-[16px]  " />
                                <span className="capitalize" >{file.fileName}</span>
                                {
                                    (openedFolders.fileName == file.fileName && openedFolders.parentFolder.includes(item.folderName)) &&
                                    <hr className="h-full w-[3px] rounded-[2px] absolute left-[-12px] bg-gray-300 " />
                                }
                            </p>
                        </div>
                    ))
                )}
            </div>

        </div>

    )

}


export default ParentOfFolders




