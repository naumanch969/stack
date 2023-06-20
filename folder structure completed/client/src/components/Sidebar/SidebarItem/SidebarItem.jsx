import ParentOfFolders from "./ParentOfFolders"
import ParentOfFiles from "./ParentOfFiles"

const SidebarItem = ({ item, result, rootFolder }) => { // rootFolderProp is comming from the call of sidebarItem inside of it, not comming from Sidebar.jsx

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
