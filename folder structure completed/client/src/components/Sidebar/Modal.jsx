import { useState, useEffect } from 'react'
import { Cancel } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { Modal, Button } from "@mui/material"
import { useStateContext } from "../../contexts/ContextProvider"
import { createFolder, createSubFolder, updateFolder, updateSubFolder } from "../../actions/folder"
import { createFile, updateFile } from '../../actions/file'


const ModalComp = () => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState } = useStateContext()
    const [fileFolderName, setFileFolderName] = useState('')

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    // 1)
    const handleCreate = () => {
        if (folderState.modal.type == 'file') {
            dispatch(createFile({ ...folderState.fileHierarchy, fileName: fileFolderName }))
        }
        // else {
        //     folderState.folderHierarchyForCreate.parentFolder
        //         ?           // creating subFolder
        //         dispatch(createSubFolder({ ...folderState.folderHierarchyForCreate, folderName: fileFolderName }))
        //         :           // creating rootFolder
        //         dispatch(createFolder({ folderName: fileFolderName }))
        // }
        setFileFolderName('')
        setFolderState({ ...folderState, openModal: false })
    }

    // 2)
    const handleUpdate = () => {
        if (folderState.modal.type == 'file') {
            dispatch(updateFile(folderState.currentFileId, { ...folderState.fileHierarchy, fileName: fileFolderName }))
        }
        else {
            folderState.folderHierarchyForUpdate.parentFolder
                ?               // updating sub Folder
                dispatch(updateSubFolder(folderState.currentFolderId, { ...folderState.folderHierarchyForUpdate, folderName: fileFolderName }))
                :               // updating root folder
                dispatch(updateFolder(folderState.currentFolderId, { folderName: fileFolderName }))
            if (!(folderState.folderHierarchyForUpdate.parentFolder)) {   // if parentFolder get renamed
                if (folderState.folderHierarchyForCreate.parentFolder) folderState.folderHierarchyForCreate.parentFolder = fileFolderName
                if (folderState.fileHierarchy.parentFolder) folderState.fileHierarchy.parentFolder = fileFolderName
                if (folderState.fileHierarchy.parentFolder) folderState.fileHierarchy.parentFolder = fileFolderName
            }
            else {                                          // if subFolder get renamed
                if (folderState.fileHierarchy.subParentFolder) folderState.fileHierarchy.subParentFolder = fileFolderName
                if (folderState.fileHierarchy.subParentFolder) folderState.fileHierarchy.subParentFolder = fileFolderName
            }
        }
        setFileFolderName('')
        setFolderState({ ...folderState, openModal: false })
    }


    return (
        <Modal open={folderState.openModal} onClose={() => setFolderState({ ...folderState, openModal: false })} className="" >

            <div className=" absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%] bg-gray-color p-2 w-[50%] flex flex-col gap-2  " >
                <div className="relative   " >
                    <input
                        className="border-[1px] p-[14px] rounded-[5px] placeholder-gray-shadow w-full bg-transparent border-gray-shadow text-gray-shadow focus:outline-none "
                        name="fileFolderName"
                        placeholder="fileFolderName"
                        value={fileFolderName}
                        onChange={(e) => setFileFolderName(e.target.value)}
                    />
                    <Cancel
                        // style={{ display: `${folderName.length == 0 ? 'none' : 'block'}` }}
                        onClick={() => setFileFolderName('')}
                        className={`${fileFolderName.length == 0 ? 'none' : 'block'}  transform translate-x-[50%] translate-y-[-50%] absolute right-[2%] top-[50%]  h-full cursor-pointer text-black text-[1.4rem] w-[3rem] bg-gray-color rounded-full `}
                    />
                </div>
                <div className="flex gap-4 w-full justify-end items-center " >
                    <Button onClick={folderState.modal.function == 'create' ? handleCreate : handleUpdate} className="w-[6rem] h-[2rem] rounded-[3rem] bg-gray-shadow  " variant="contained" size='large' type="submit"  >
                        {folderState.modal.function == 'create' ? 'Create' : 'Update'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalComp