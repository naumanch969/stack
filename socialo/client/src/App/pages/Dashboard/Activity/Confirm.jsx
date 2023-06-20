import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, } from '@mui/material'
import Draggable from 'react-draggable';
import { useDispatch } from "react-redux"

import { deleteActivity } from '../../../../redux/actions/activity';
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
    const { activityState, setActivityState } = useStateContext()

    //////////////////////////// USE EFFECTS //////////////////////////////////


    //////////////////////////// FUNCTIONS /////////////////////////////////////

    // 1)
    const CloseDialogue = () => { setActivityState({ ...activityState, openConfirm: false }) }

    // 2)
    const handleDelete = () => {
        setActivityState({
            ...activityState,
            activityArr: activityState.activityArr.filter((activity) => activity._id !== activityState.currentActivityId)
        })
        console.log('id', activityState.currentActivityId)
        dispatch(deleteActivity(activityState.currentActivityId))
        CloseDialogue()
    }

    return (
        <Dialog
            open={activityState.openConfirm}
            onClose={CloseDialogue}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Confirm! </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    The Activity will be deleted permanently and will not be recovered. Do you still wanna delete it?
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