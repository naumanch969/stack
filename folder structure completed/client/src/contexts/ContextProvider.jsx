import { createContext, useContext, useState } from "react"

const StateContext = createContext();



export const ContextProvider = ({ children }) => {



    const initialFolderState = {
        folderHierarchyForCreate: {},
        folderHierarchyForUpdate: {},
        fileHierarchy: {},
        modal: { type: 'folder', function: 'create' },
        currentFolderId: '',
        currentFileId: '',
        activeFolder: {},
        activeFile: {},
        openModal: false,
        openDialogue: false,
        closeAllFolders: false,
        showAlert: false,
    }
    const [folderState, setFolderState] = useState(initialFolderState)
    const [openSidebar, setOpenSidebar] = useState(true)


    return (
        <StateContext.Provider
            value={{
                folderState, setFolderState,
                openSidebar, setOpenSidebar,

            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)