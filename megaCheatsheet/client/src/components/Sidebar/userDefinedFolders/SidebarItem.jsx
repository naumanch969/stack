import { useEffect } from "react"

import ParentOfFolders from "./ParentOfFolders"
import ParentOfFiles from "./ParentOfFiles"
import { useStateContext } from "../../../contexts/ContextProvider"

const SidebarItem = ({ item, result, rootFolder }) => { // rootFolderProp is comming from the call of sidebarItem inside of it, not comming from Sidebar.jsx

    const { urlPath, openedFolders, setOpenedFolders } = useStateContext()

    useEffect(() => {

        var parentFolder = urlPath[0]
        var subParentFolder = urlPath[1]
        var fileName = urlPath[2]

        result.map((rootFol) => {

            if (rootFol.folderName == parentFolder) {         //if parentFolder  is matched

                if (rootFol.folders?.length == 0) {                     // parentOFFiles

                    rootFol.files.map((file) => {
                        if (file.fileName == fileName) {
                            setOpenedFolders({
                                parentFolder: [...openedFolders.parentFolder, parentFolder],
                                subParentFolder: [...openedFolders.subParentFolder],
                                fileName
                            })
                        }
                    })
                }

                else {                                                  // parentOfFolders
                    rootFol.folders.map((subFol) => {

                        if (subParentFolder == subFol.folderName) {     // if file is within subParentFolder
                            subFol.files.map((file) => {
                                if (file.fileName == fileName) {
                                    setOpenedFolders({
                                        parentFolder: [...openedFolders.parentFolder, parentFolder],
                                        subParentFolder: [...openedFolders.subParentFolder, subFol.folderName],
                                        fileName
                                    })
                                }
                            })
                        }

                        else if (subParentFolder == 'nothing') {        // if file is within parentFolder
                            subFol.files.map((file) => {
                                if (file.fileName) {
                                    setOpenedFolders({
                                        parentFolder: [...openedFolders.parentFolder, parentFolder],
                                        subParentFolder: [...openedFolders.subParentFolder],
                                        fileName
                                    })
                                }
                            })
                        }
                    })
                }

            }

        })

    }, [])

    // if there are sub folders inside of root folder
    if (item?.folders?.length !== 0) {
        return (
            <ParentOfFolders item={item} rootFolder={rootFolder} result={result} />
        )
    }

    // if there are only files inside of root folder
    else {
        return (
            <ParentOfFiles item={item} rootFolder={rootFolder} result={result} />
            // i'll change the name of this comp.
        )
    }


}


export default SidebarItem
