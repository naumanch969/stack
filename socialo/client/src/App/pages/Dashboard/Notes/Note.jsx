import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { StarOutline, Edit, MoreHoriz, Delete, Star } from '@mui/icons-material';

import NoteForm from "./NoteForm"
import { bookmarkNote } from "../../../../redux/actions/note"
import { useStateContext } from '../../../../contexts/ContextProvider';
import { limitText, Capitalize, LightenDarkenColor } from '../../../../utils/functions/function';


const Note = ({ noteObj, id, uploadedImages, note, tags, type, createdAt, updatedAt, bg, bookmarked }) => {
    const { selectedColor, noteState, setNoteState, showUpdateNoteForm, setShowUpdateNoteForm, setShowCreateNoteForm } = useStateContext()

    //////////////////////////// States /////////////////////////////////////
    const colors = ['light-gray', 'light-blue', 'light-green', 'light-red', 'light-yellow']          // random number 0 and (colors length - 1)
    const [random, setRandom] = useState(Math.floor(Math.random() * (colors.length - 1)))
    const [showMenu, setShowMenu] = useState([])







    //////////////////////////// Variables /////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()








    //////////////////////////// UseEffects /////////////////////////////////////
    useEffect(() => {
        setRandom(Math.floor(Math.random() * (colors.length - 1)))
    }, [selectedColor])





    //////////////////////////// Functions /////////////////////////////////////

    const handleShowDetailNote = (detailNote) => {
        console.log('detailNote', detailNote)
        setNoteState({ ...noteState, detailNote, showDetailNote: true })
        navigate(`/notes/${detailNote._id}`)
    }

    const handleUpdateButtonClick = (id) => {
        setNoteState({
            ...noteState,
            currentNoteId: id,
            noteData: { note, tags, type, uploadedImages, createdAt, updatedAt, bg }
        })
        setShowCreateNoteForm(false)
        setShowUpdateNoteForm((pre) => !pre)
    }

    const handleStarClick = (id) => {
        const index = noteState.notesArr.findIndex((note) => note._id == id)
        noteState.notesArr[index].bookmarked = true

        dispatch(bookmarkNote(id))
    }

    const handleDeleteClick = (id) => {
        setNoteState({
            ...noteState,
            openConfirm: true,
            currentNoteId: id
        })
    }

    const toggleShowMenu = (id) => {
        noteState.showDeleteMenu.includes(id)
            ?
            setNoteState({ ...noteState, showDeleteMenu: [] })
            :
            setNoteState({ ...noteState, showDeleteMenu: [id] })
    }



    //////////////////////////// Actual Component /////////////////////////////////////

    return (
        <>

            {
                showUpdateNoteForm && noteState.currentNoteId == id &&
                <div className={`${noteState.currentNoteId == id ? 'block' : 'hidden'} `} >
                    <NoteForm updateTheNote updateNoteId={id} />
                </div>
            }
            {
                <div
                    style={{ minWidth: '250px', maxWidth: '250px', height: "20rem", background: bg?.hex ? `#${bg.hex}` : `#202124` }}
                    className={` min-w-[250px] max-w-[250px] min-h-[20rem] max-h-[20rem] ${bg?.hex ? `bg-${bg?.color}` : 'bg-purple-900'} p-4 mb-4 rounded-[1rem] `}
                >
                    <div style={{ gap: '4px', position: 'relative', top: '-5px', height: '5%' }} className='flex justify-between gap-[-5px] reltaive top-[4px] w-full h-[5%] ' >
                        <span className='text-[13px] flex justify-center items-center ' >{updatedAt?.length == 0 ? `${createdAt}` : `${updatedAt}`}</span>
                        <div className="relative" >
                            <button onClick={() => toggleShowMenu(id)} className=" flex justify-center items-center " >
                                <MoreHoriz className='text-[13px]' />
                            </button>
                            {
                                noteState.showDeleteMenu[0] == id &&
                                <div style={{ background: `#${LightenDarkenColor(bg?.hex, 10)}`, display: "flex" }} className="absolute top-[120%] right-[2px]  rounded-[5px] flex flex-col p-[6px] bg-[#e58080] " >
                                    <button onClick={() => handleDeleteClick(id)} style={{ background: 'inherit' }} className={`flex justify-between items-center p-[1px] bg-inherit hover:bg-${selectedColor.color} `} >
                                        <Delete className="text-[15px] " /><span className="text-[15px] " >Delete</span>
                                    </button>
                                </div>
                            }
                        </div>

                    </div>

                    <div style={{ height: '85%' }} className="flex flex-col justify-evenly w-[full] h-[85%] cursor-pointer  " >
                        {
                            uploadedImages.length == 0
                                ?
                                <div className="overflow-hidden h-full " >
                                    <p onClick={() => handleShowDetailNote(noteObj)} className='overflow-y-scroll mt-[5px] ' >{Capitalize(note)}</p>
                                </div>
                                :
                                <div className='flex flex-col h-full w-full justify-between mb-[3px] ' >
                                    <p onClick={() => handleShowDetailNote(noteObj)} className=" h-[120px] overflow-hidden  " >{Capitalize(note?.length > 190 ? `${limitText(note, 190)}...` : note)}</p>
                                    <img style={{ width: '100%', height: '120px' }} src={uploadedImages[0].url} alt="image" className='w-[100%] h-[120px] rounded-[4px] ' />
                                </div>
                        }
                    </div>

                    <div style={{ gap: '4px', position: 'relative', top: '4px', height: '10%' }} className='flex justify-end gap-[4px] reltaive top-[4px] w-full h-[10%] ' >
                        <button onClick={() => handleStarClick(id)} style={{ background: 'black', width: '30px', height: '30px' }} className=" bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center " >
                            {
                                bookmarked
                                    ?
                                    <Star style={{ fontSize: '16px' }} className="text-purple-300 text-[16px] " />
                                    :
                                    <StarOutline style={{ fontSize: '16px' }} className="text-purple-300 text-[16px] " />
                            }
                        </button>
                        <button onClick={() => handleUpdateButtonClick(id)} style={{ background: 'black', width: '30px', height: '30px' }} className=" bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center " >
                            <Edit style={{ fontSize: '16px' }} className="text-purple-300 text-[16px] " />
                        </button>
                    </div>


                </div>
            }

        </>
    )
}

export default Note;
