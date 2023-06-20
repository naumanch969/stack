import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowForwardIos, MoreHoriz, Update, Delete, Code, Adjust, Circle } from "@mui/icons-material"
import { IconButton, Card } from "@mui/material"

import { useStateContext } from "../../../contexts/ContextProvider"
import SidebarItem from "./SidebarItem"


const ParentOfFolders = ({ item, result, }) => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const customFolders = ['code', 'apps']
    const navigate = useNavigate()
    const isParent = Boolean(item?.folders?.length)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState, selectedPreDefinedSidebarItem, setSelectedPreDefinedSidebarItem, urlPath, setUrlPath, openedFolders, setOpenedFolders } = useStateContext()
    const [open, setOpen] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        folderState.closeAllFolders == true && setOpen(false)
        setFolderState({ ...folderState, closeAllFolders: false })
    }, [folderState.closeAllFolders])

    useEffect(() => {
        if ((folderState.lastAction) && item == folderState.activeFolder) {
            setOpen(true)
        }
    }, [folderState.lastAction])




    useEffect(() => {
        let path = window.location.pathname.split('/').slice(1,)
        setUrlPath(path)
    }, [window.location.pathname])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    /////////////////////////////// OF FOLDERS //////////////////////////////
    // 1)
    var handleFolderClick = (item) => {
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

    // 2)
    var handleSubFolderClick = (rootFolderParam, subFolderParam) => {
        const parentFolder = rootFolderParam.folderName
        const subParentFolder = subFolderParam.folderName

        setFolderState({
            ...folderState,
            folderHierarchyForCreate: { error: "folder can't be created in third depth " },
            folderHierarchyForUpdate: { parentFolder },
            fileHierarchy: { parentFolder, subParentFolder },
            currentFolderId: item._id,
            activeFolder: item,
            activeFile: {},
            isParentFolder: false,
            isFile: false
        })

        openedFolders.subParentFolder.includes(subParentFolder)
            ?
            setOpenedFolders({
                parentFolder: [...openedFolders.parentFolder],
                subParentFolder: openedFolders.subParentFolder.filter((subFolNam) => subFolNam !== subParentFolder),
                fileName: ''
            })
            :
            setOpenedFolders({
                parentFolder: [...openedFolders.parentFolder],
                subParentFolder: [...openedFolders.subParentFolder, subParentFolder],
                fileName: ''
            })

        setOpen((prev) => !prev)
        setSelectedPreDefinedSidebarItem('')
    }



    /////////////////////////////// OF FILES ////////////////////////////////
    // 1)
    const handleFileClick = (rootFolderParam, fileParam) => {
        // rootFolderParam  = rootFolder which contain file
        // fielParam        = the file which is clicked
        var parentFolder = rootFolderParam?.folderName

        rootFolderParam?.files.map((file) => {
            if (file.fileName == fileParam.fileName) {
                setFolderState({
                    ...folderState,
                    folderHierarchyForCreate: { parentFolder },
                    folderHierarchyForUpdate: {},
                    fileHierarchy: { parentFolder },
                    currentFileId: fileParam._id,
                    activeFile: file,
                    activeFolder: {},
                    isParentFolder: true,
                    isFile: true
                })
                navigate(`${parentFolder}/nothing/${file.fileName}?page=1`)
                setOpenedFolders({
                    parentFolder: [...openedFolders.parentFolder],
                    subParentFolder: [...openedFolders.subParentFolder],
                    fileName: fileParam.fileName
                })
            }
        })
        setSelectedPreDefinedSidebarItem('')
    }

    // 2)
    const handleSubFileClick = (rootFolderParam, subFolderParam, fileParam) => {
        // rootFolderParam = rootFolder - an object
        // subFolderParam = subFolder   - an object
        // file = file which is clicked - an object         

        var parentFolder = rootFolderParam?.folderName
        const subParentFolder = subFolderParam.folderName

        rootFolderParam?.folders?.map((subFol) => {
            if (subFol.folderName == subParentFolder) {
                subFol.files.map((file) => {
                    if (file.fileName == fileParam.fileName) {
                        setFolderState({
                            ...folderState,
                            folderHierarchyForCreate: {},
                            folderHierarchyForUpdate: { parentFolder },
                            fileHierarchy: { parentFolder, subParentFolder },
                            currentFileId: file._id,
                            activeFile: file,
                            activeFolder: {},
                            isParentFolder: false,
                            isFile: true
                        })
                        navigate(`${parentFolder}/${subParentFolder}/${file.fileName}?page=1`)
                        setOpenedFolders({
                            parentFolder: [...openedFolders.parentFolder],
                            subParentFolder: [...openedFolders.subParentFolder],
                            fileName: file.fileName
                        })
                    }
                })
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
        <div className={` ${openedFolders.parentFolder.includes(item.folderName) && 'bg-gray-800'} flex flex-col gap-[3px] my-[8px] rouned-[5px]`}>

            {/********************************************************************** ParentFolder *******************************************************************/}

            <div
                onClick={() => handleFolderClick(item)}                    // rootFolder is only send throught sidebarItem of this file
                style={{ paddingLeft: "4px", paddingRight: "4px", borderRadius: '5px' }}
                className={` w-full relative px-[4px] text-gray-300 hover:text-gray-900 hover:bg-gray-400 cursor-pointer flex justify-between items-center rounded-[5px] rounded[5px] 
                        ${openedFolders.parentFolder.includes(item.folderName) && openedFolders.subParentFolder.length == 0 && openedFolders.fileName == ''
                        ?                                   // change the colour of activeFolder 
                        'bg-gray-400 text-gray-900 '
                        :                                   // if files of parentFolder or of subFolder are clicked/selected
                        openedFolders.parentFolder.includes(item.folderName) && (openedFolders.subParentFolder.length !== 0 || openedFolders.fileName !== '')
                            ?
                            'bg-gray-600 text-gray-900 '   // if file of parentFolder is selected/clicked
                            :
                            ''
                    }
                      `}
            >

                {/* item name and icon */}
                <span className="flex items-center gap-[8px] my-[.3rem] w-full uppercase text-inherit ">
                    <Code />
                    <p>{item?.folderName}</p>
                    {openedFolders.parentFolder.includes(item.folderName) && openedFolders.subParentFolder.length == 0 && openedFolders.fileName == '' && <Hr />}
                </span>

                <ArrowForwardIos style={{ fontSize: '14px' }} className={`${(openedFolders.parentFolder.includes(item.folderName)) && 'rotate-90'} text-[14px] `} />

            </div>














            {/********************************************************************** SUB FOLDERS *******************************************************************/}
            {/* <SidebarItem key={index} result={result} item={subFolder} rootFolder={item} subFolderPaddingLeft='pl-[8px] ' /> */}

            {
                openedFolders.parentFolder.includes(item.folderName) && (
                    item?.folders?.map((subFolder, index) => (

                        <div className={`${openedFolders.subParentFolder.includes(subFolder.folderName) && 'bg-gray-700 text-gray-900 '} `} >
                            <div
                                key={index}
                                onClick={() => handleSubFolderClick(item, subFolder)}
                                style={{ paddingLeft: "12px", paddingRight: "4px", borderRadius: '5px' }}
                                className={`pl-[12px] w-full relative text-gray-300 hover:bg-gray-400 hover:text-gray-900 cursor-pointer flex justify-between items-center rounded-lg rounded[5px] 
                                    ${openedFolders.parentFolder.includes(item.folderName) && openedFolders.subParentFolder.includes(subFolder.folderName) && 'bg-gray-500 text-gray-900 '} 
                                `}  // if file of 'subFolder' is selected/clicked
                            >

                                {/* item name and icon */}
                                <span className="flex items-center gap-[8px] my-[.3rem] w-full uppercase">
                                    <Adjust style={{ fontSize: '20px' }} className="text-[20px] " />
                                    <p>{subFolder?.folderName}</p>
                                    {openedFolders.parentFolder.includes(item.folderName) && openedFolders.subParentFolder.includes(subFolder.folderName) && openedFolders.fileName == 'nothing' && <Hr />}
                                </span>

                                <ArrowForwardIos style={{ fontSize: '14px' }} className={`${(openedFolders.subParentFolder.includes(subFolder.folderName)) && 'rotate-90'} text-[14px] `} />
                            </div>



                            {openedFolders.subParentFolder.includes(subFolder.folderName) &&
                                (
                                    subFolder?.files.map((file, index) => (
                                        <div
                                            key={index}
                                            style={{ borderRadius: '5px' }}
                                            className={`flex justify-between items-center rounded-[5px] text-gray-300 hover:bg-gray-400 hover:text-gray-900 
                                                ${openedFolders.parentFolder.includes(item.folderName) &&
                                                subFolder.folderName == urlPath[1] &&
                                                openedFolders.fileName == file.fileName &&
                                                'bg-gray-400 text-gray-900 '}
                                            `}
                                        >
                                            <p
                                                onClick={() => handleSubFileClick(item, subFolder, file)}
                                                style={{ paddingLeft: customFolders.findIndex((folderName) => folderName == item.folderName) == -1 ? '20px' : '12px' }}
                                                className="w-full flex relative items-center cursor-pointer gap-0 h-8 pl-[12px] rounded-lg   "
                                            >
                                                <Circle style={{ fontSize: '20px' }} className=" mr-[8px] text-[20px]  " />
                                                <span className="capitalize" >{file.fileName}</span>
                                                {
                                                    openedFolders.parentFolder.includes(item.folderName) &&
                                                    subFolder.folderName == urlPath[1] &&
                                                    openedFolders.fileName == file.fileName &&
                                                    <hr className="h-full w-[3px] rounded-[2px] absolute left-[-12px] bg-gray-300 " />
                                                }
                                            </p>
                                        </div>

                                    ))
                                )}

                        </div>

                    ))
                )
            }













            {/********************************************************************** FILE *******************************************************************/}
            {openedFolders.parentFolder.includes(item.folderName) &&         // if parent folder is clicked then show this block
                (
                    item?.files.map((file, index) => (

                        <div key={index}
                            style={{ borderRadius: '5px' }}
                            className={`${openedFolders.fileName == file.fileName && 'bg-gray-400 text-gray-900 '} text-gray-300 hover:bg-gray-400 hover:text-gray-900 flex justify-between items-center rounded-[5px]`}
                        >
                            <p
                                onClick={() => handleFileClick(item, file)}     // item is rootFolder, file is clicked file
                                style={{ paddingLeft: customFolders.findIndex((folderName) => folderName == item.folderName) == -1 ? '20px' : '12px' }}
                                className="w-full flex relative items-center cursor-pointer gap-0 h-8 pl-[12px] rounded-lg "
                            >
                                <Circle style={{ fontSize: '20px' }} className=" mr-[8px] text-[20px]  " />
                                <span className="capitalize" >{file.fileName}</span>
                                {openedFolders.fileName == file.fileName && <hr className="h-full w-[3px] rounded-[2px] absolute left-[-12px] bg-gray-300 " />}
                            </p>
                        </div>

                    ))
                )}





        </div>

    )

}


export default ParentOfFolders

