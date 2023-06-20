import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Cancel, Edit } from "@mui/icons-material"
import { Grid } from "@mui/material"

import { getNote } from "../../actions/note"
import { limitText, Capitalize } from '../../utilityFunctions/function';
import { useStateContext } from "../../contexts/ContextProvider";



const Note = () => {

    /////////////////////////////////////////////////////////////// States ////////////////////////////////////////////////////////////////////////
    const { noteState, setNoteState, showDetailNote } = useStateContext()
    const { currentNote } = noteState




    /////////////////////////////////////////////////////////////// Variables ////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { id } = useParams()
    const { result: notes, note, isLoading, isError } = useSelector(state => state.notes)





    /////////////////////////////////////////////////////////////// UseEffects ////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getNote(id))
    }, [dispatch, id])

    useEffect(() => {
        setNoteState({ ...noteState, currentNote: note })
    }, [note])




    /////////////////////////////////////////////////////////////// Functions ////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// Actual Component ////////////////////////////////////////////////////////////////////////

    return (
        <>

            <Grid item lg={showDetailNote ? (rightbar ? 4 : 5.5) : 0} md={showDetailNote ? 4 : 0} style={{ height: `calc(100vh - 57.6px)`, top: '3.6rem', background: 'gray', background: note?.bg?.hex ? `#${note?.bg.hex}` : `#202124` }}
                className="overflow-y-scroll  sticky relative top-[3.6rem] w-[250px] p-4 rounded-[4px] bg-gray-900  " >

                {/* close button of detail note */}
                <div className="sticky h-[5%] flex items-center justify-between mb-4 " >
                    <p>2 months ago</p>
                    <button onClick={() => { setNoteState({ showDetailNote: false }) }} style={{ right: '-12px' }} className=" relative top-[-8px] right-[-12px] " >
                        <Cancel className="" />
                    </button>
                </div>

                <div className="h-[95%]  " >

                    <div  >

                        {
                            note?.uploadedImages?.length !== 0 &&
                            <div className="" >
                                <img src={note?.uploadedImages[0]?.url} alt="image" style={{ height: '220px', borderRadius: '3px' }} className="w-full h-[220px] rounded-[3px] " />
                            </div>
                        }

                        <div className='flex justify-between h-auto px-[6px] py-[5px] ' >
                            <div className="flex flex-col items-start gap-[4px] " >
                                <p className={`thinScrollbar text-[16px] gap-[28px] ${note?.createdAt ? 'flex' : 'hidden'} text-[13px] flex justify-center items-center`} >
                                    <span className="font-medium " >Created At:</span>
                                    <span className="" >{note?.createdAt}</span>
                                </p>
                                <p className={`thinScrollbar text-[16px] gap-[28px] ${!note?.updatedAt ? 'flex' : 'hidden'} text-[13px] flex justify-center items-center`} >
                                    <span className="font-medium " >Last Modified:</span>
                                    <span className="" >{note?.updatedAt}</span>
                                </p>
                            </div>
                            <div className="flex flex-col h-full " >
                                <button style={{ background: 'black', width: '30px', height: '30px' }} className=" bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center " >
                                    <Edit style={{ fontSize: '16px' }} className="text-gray-300 text-[16px] " />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-[6px] my-[2px] " >
                            {
                                note?.uploadedImages.length !== 0 &&
                                note?.tags.map((tag, index) => (
                                    <p key={index} className="" >#{tag}</p>
                                ))
                            }
                        </div>



                        <div className="flex gap-[6px] " >
                            {
                                note?.uploadedImages.length == 0 &&
                                note?.tags.map((tag, index) => (
                                    <p key={index} className="" >#{tag}</p>
                                ))
                            }
                        </div>

                        <p className="mt-[4px] " >{Capitalize(note?.note)}</p>


                    </div>
                    <div className="" >
                        <h2 className="text-[28px] font-bold " >Related Notes</h2>
                        <div className="flex gap-4 justify-between h-auto min-w-full w-auto overflow-x-scroll ">
                            {
                                notes.map((note, index) => (
                                    <Note
                                        key={index}
                                        id={note?._id}
                                        noteObj={note}
                                        note={note.note}
                                        uploadedImages={note.uploadedImages}
                                        tags={note.tags}
                                        type={note.type}
                                        bg={note?.bg}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

            </Grid>


        </>
    )
}

export default Note;
