import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, } from '@mui/material'
import Draggable from 'react-draggable';
import { useDispatch } from "react-redux"

import { deleteNote } from "../../../../redux/actions/note"
import { useStateContext } from "../../../../contexts/ContextProvider"

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

    //////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()

    //////////////////////////// STATES ///////////////////////////////////////
    const { noteState, setNoteState } = useStateContext()

    //////////////////////////// USE EFFECTS //////////////////////////////////


    //////////////////////////// FUNCTIONS /////////////////////////////////////

    // 1)
    const CloseDialogue = () => { setNoteState({ ...noteState, openConfirm: false }) }

    // 2)
    const handleDelete = () => {
        setNoteState({
            ...noteState,
            notesArr: noteState.notesArr.filter((note) => note._id !== noteState.currentNoteId)
        })
        dispatch(deleteNote(noteState.currentNoteId))
        CloseDialogue()
    }

    return (
        <Dialog
            open={noteState.openConfirm}
            onClose={CloseDialogue}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Confirm! </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    The Note will be deleted permanently and will not be recovered. Do you still wanna delete it?
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