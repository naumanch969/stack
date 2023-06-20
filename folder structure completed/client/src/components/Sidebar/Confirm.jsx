import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, } from '@mui/material'
import Draggable from 'react-draggable';
import { useDispatch } from "react-redux"

import { deleteFolder, deleteSubFolder } from "../../actions/folder"
import { deleteFile } from "../../actions/file"
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

const Confirm = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folderState, setFolderState } = useStateContext()

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    // 1)
    const CloseDialogue = () => { setFolderState({ ...folderState, openDialogue: false }) }

    // 2)
    const handleDelete = () => {
        if (folderState.modal.type == 'file') {
            dispatch(deleteFile(folderState.currentFileId, folderState.fileHierarchy))
        }
        else {
            console.log('folderHierarchyForUpdate in modal.js ', folderState.folderHierarchyForUpdate)
            folderState.folderHierarchyForUpdate.parentFolder
                ?           // deleting sub folder
                dispatch(deleteSubFolder(folderState.currentFolderId, folderState.folderHierarchyForUpdate))
                :           // deleting root folder 
                dispatch(deleteFolder(folderState.currentFolderId))
            setFolderState({ ...folderState, folderHierarchyForCreate: {}, folderHierarchyForUpdate: {} })
        }
        CloseDialogue()
    }

    return (
        <Dialog
            open={folderState.openDialogue}
            onClose={CloseDialogue}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Confirm! </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    The Folder will be deleted permanently and will not be recovered.Do you still wanna delete it?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={CloseDialogue}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}


export default Confirm