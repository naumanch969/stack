import { useState, useEffect } from "react"
import { Done, Cancel } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux"

import Note from "./Note"
import NoteForm from "./NoteForm"
import { createNote, getNotes } from "../../actions/note"
import { image1, image2, image3, image4, image5, image6, image7 } from '../../assets';
import { useStateContext } from '../../contexts/ContextProvider';
import { limitText, Capitalize } from '../../utilityFunctions/function';




const Notes = () => {
    const { noteState, setNoteState, showCreateNoteForm } = useStateContext()


    /////////////////////////////////////////////////////////////// Variables ////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result: notes, isLoading, isError, error } = useSelector(state => state.notes)

    /////////////////////////////////////////////////////////////// States ////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// use Effects ////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getNotes())
    }, [])

    useEffect(() => {
        setNoteState({ ...noteState, notesArr: notes })
    }, [notes])




    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////





    return (
        <div className="w-full flex justify-evenly flex-wrap  mt-[1.2rem] " >
            {
                showCreateNoteForm &&
                <NoteForm />
            }
            {
                noteState.notesArr.map((note, index) => (
                    <>
                        <Note
                            key={index}
                            noteObj={note}
                            id={note?._id}
                            note={note.note}
                            uploadedImages={note.uploadedImages}
                            tags={note.tags}
                            type={note.type}
                            createdAt={note.createdAt}
                            updatedAt={note?.updatedAt}
                            bg={note?.bg}
                            bookmarked={note.bookmarked}
                        />
                    </>
                ))
            }
        </div>
    )
}

export default Notes;






    // const notesArr = [
    //     {
    //         note: 'Lorem  SequiLorem  Sequi atque nulla nam voluptas doloribus eos cupiditate Lorem  Sequi atque nulla nam voluptas doloribus eos cupiditate e Lorem  Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: []
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image2]
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: []
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image4]
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image5]
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image6]
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image7]
    //     },
    //     {
    //         note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi atque nulla nam voluptas doloribus eos cupiditate sint veritatis? Ducimus cumque eum aperiam fugiat!',
    //         tags: ['this', 'is', 'tag'],
    //         type: 'all',
    //         createdAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`,
    //         uploadedImages: [image3]
    //     },
    // ]