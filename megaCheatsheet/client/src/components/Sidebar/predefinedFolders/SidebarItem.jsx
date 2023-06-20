import { useState, useEffect } from "react"
import { ArrowForwardIos } from "@mui/icons-material"

import { useStateContext } from "../../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom"


const SidebarItem = ({ item, initialFolders }) => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const navigate = useNavigate()
    var resetFolderState = {
        folderHierarchyForCreate: {},
        folderHierarchyForUpdate: {},
        fileHierarchy: {},
        activeFolder: {},
        activeFile: {},
        currentFolderId: '',
        currentFileId: '',
        isParentFolder: 'unselected',
    }


    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    let { selectedPreDefinedSidebarItem, setSelectedPreDefinedSidebarItem, folderState, setFolderState, openedFolders, setOpenedFolders } = useStateContext()
    const [open, setOpen] = useState(false)
    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const handleFileClick = (file, subFile) => {
        if (subFile) {              // if cicked file is subFile
            initialFolders.map((item) => {      // this loop is for - when subFile of one folder is clicked and then we click to subFile of another folder, in that case folder body background would not be changed, this loop enable us to change the color of that parentFolder body
                item?.children?.length
                    &&
                    item.children.map((subItem) => {
                        subItem.name == file.name && setSelectedPreDefinedSidebarItem({ folderName: item.name, fileName: file.name, isFolder: false })  // folderName is placed for changing the background of whole folder - if folderName field exist in selectedPredefinedSidebarItem only then folder body will be highlighted (to change the bg of selected item (either folder or file) ) ,    fileName is placed for changing the background of p tag of folder,    isFolder is placed to know that   is the subFile of folder is clicked or not, if subFile is get clicked, in that case isFile will be false
                    })
            })
        }
        else {                      // if clicked file is not subFile
            setSelectedPreDefinedSidebarItem({ fileName: file.name, isFolder: false })                      // folderName is placed for changing the background of whole folder - if folderName field exist in selectedPredefinedSidebarItem only then folder body will be highlighted,    fileName is placed for changing the background of p tag of folder,    isFolder is placed to know that is the subFile of folder is clicked or not, if subFile is get clicked, in that case isFile will be false
        }
        setFolderState({ ...folderState, ...resetFolderState })
        setOpenedFolders({ parentFolder: [], subParentFolder: [], fileName: '' })

        navigate(`${file.name}`)
    }

    // 2)
    const handleFolderClick = (folder) => {
        setSelectedPreDefinedSidebarItem({ folderName: folder.name, fileName: folder.name, isFolder: true }) // folderName is placed for changing the background of whole folder - if folderName field exist in selectedPredefinedSidebarItem only then folder body will be highlighted,    fileName is placed for changing the background of p tag of folder,    isFolder is placed to know that is the subFile of folder is clicked or not, if subFile is get clicked, in that case isFile will be false
        setOpen(!open)                // to toggle the folder - open and close

        setFolderState({ ...folderState, ...resetFolderState })
    }


    /////////////////////////////////////////////////////////////// Sub Components /////////////////////////////////////////////////////////////////////
    // 1)
    const Hr = () => (                                                      // white vertical line appeared to the extreme left of selected item/file/folder - it appears to left of only one item
        <hr style={{ left: folderState.isParentFolder ? '-16px' : '-24px' }} className="h-full w-[3px] top-0 rounded-[2px] absolute left-[-12px] bg-gray-300 " />
    )

    // 2)
    const File = ({ paddingLeft, sidebarItem, subFile }) => (               // it is the actual working sidebar item which navigates to other pages
        <div className="flex flex-col mt-3 " >
            <div
                onClick={() => handleFileClick(sidebarItem, subFile ? true : false)}
                className={` ${selectedPreDefinedSidebarItem.fileName == sidebarItem.name && 'bg-gray-400 '} flex justify-between items-center rounded-lg hover:bg-gray-400  `}
            >
                <span style={{ paddingLeft }} className={` ${selectedPreDefinedSidebarItem.fileName == sidebarItem.name && ' text-gray-900 '}  pl-[${paddingLeft}] hover:text-gray-900 w-[100%]  gap-[8px] relative flex items-center cursor-pointer h-8 rounded-lg text-md text-gray-300  `} >
                    {sidebarItem.icon}
                    <p className="capitalize" >{sidebarItem.name}</p>
                    {selectedPreDefinedSidebarItem.fileName == sidebarItem.name && <Hr />}
                </span>
            </div>
        </div>
    )



    /////////////////////////////////////////////////////////////// Actual Components /////////////////////////////////////////////////////////////////////
    // if item is folder
    if (item?.children?.length) {
        return (
            <div className={`${(selectedPreDefinedSidebarItem.folderName == item.name) && 'bg-gray-800'} rounded-[5px] flex flex-col mt-3  `}>

                {/* folder */}
                <div className={`
                        ${selectedPreDefinedSidebarItem.folderName == item.name && (!open || selectedPreDefinedSidebarItem.isFolder)
                        ?       // if folder is selected but not open || if folder is selected as well as opened but no subFile has been selected
                        'bg-gray-400 text-gray-900 '
                        :       // if subFile of folder is selected     
                        (selectedPreDefinedSidebarItem.folderName == item.name && 'bg-gray-600 ')}                    
                        px-[4px] flex justify-between items-center rounded-lg  text-gray-300 hover:bg-gray-400   hover:text-gray-900
                    `} >
                    {/* folder name and icon  */}
                    <div onClick={() => handleFolderClick(item)} className="w-full flex justify-between items-center   cursor-pointer relative " >
                        <span className="gap-[8px] flex relative my-[.3rem] w-full uppercase ">
                            <>{item.icon}</>
                            <p>{item?.name}</p>
                        </span>
                        <ArrowForwardIos style={{ fontSize: '14px' }} className={`${open && 'rotate-90'} text-[14px] `} />
                    </div>
                </div>

                {/* maping over the children files */}
                <div>
                    {
                        open && (
                            item.children.map((subFile, index) => (
                                <File paddingLeft='12px' key={index} sidebarItem={subFile} subFile />   // file is the actuall component which navigate the user to other component on click
                            ))
                        )
                    }
                </div>

            </div>
        )
    }

    // if item is file not folder
    else {
        return (
            <File paddingLeft='4px' sidebarItem={item} />
        )
    }






}



export default SidebarItem