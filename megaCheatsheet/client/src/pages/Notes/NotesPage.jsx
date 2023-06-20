import { useEffect, useState } from "react"
import { Add, Search, Cancel, Circle, Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'

import DetailNote from "./DetailNote"
import Note from "./Note"
import Confirm from './Confirm'
import NoteForm from "./NoteForm"
import Notes from "./Notes"
import { getNote } from "../../actions/note"
import { image1, image2, image3, image4, image5, image6, image7 } from '../../assets';

import { limitText, Capitalize } from '../../utilityFunctions/function';
import { useStateContext } from "../../contexts/ContextProvider";


const NotesPage = ({ showSingleNote }) => {

    /////////////////////////////////////////////////////////////// Variables ////////////////////////////////////////////////////////////////////////
    const [value, setValue] = useState('')
    const { rightbar, noteState, setNoteState, showCreateNoteForm, resetedNoteData, setShowCreateNoteForm, setShowUpdateNoteForm, currentMonth, currentDate, currentYear } = useStateContext()
    /////////////////////////////////////////////////////////////// States ////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// UseEffects ////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const clear = () => {
        setNoteState({ ...noteState, noteData: resetedNoteData })
    }

    const handleSearch = () => {
        setShowSearchBorder(true)
    }

    const handleCreateNoteClick = () => {
        setNoteState({
            ...noteState,
        })
        clear()
        setShowUpdateNoteForm(false)
        setShowCreateNoteForm(pre => !pre)
    }

    const typeButtonClick = (type) => {
        setNoteState({
            ...noteState,
            type
        })
    }

    return (



        <Grid container className="flex justify-between w-full  "  >

            {/* confirm */}
            {noteState.openConfirm &&
                <Confirm />
            }

            <Grid item lg={noteState.showDetailNote ? (rightbar ? 8 : 6.5) : 12} md={noteState.showDetailNote ? 8 : 12} className=" pt-4 pb-8" >

                {/* search bar */}
                <div style={{ width: '23rem' }} className={` relative w-[23rem] inline-flex  items-center justify-start gap-[4px] h-[2rem] bg-inherit mb-[1rem] `} >
                    <Search onClick={() => handleSearch} className="cursor-pointer relative top-[-1%] bg-inherit   text-[#9aa3af]  h-full text-[26px] w-[2rem] " />
                    <div className="h-full relative " >
                        <input
                            style={{ outline: 'none' }}
                            className={`h-full w-full bg-inherit text-gray-400  outline-none pr-[20px] `}
                            onChange={(e) => setValue(e.target.value)} placeholder="Search..." name="search" value={value}
                            autoComplete="off"
                        />
                        <Cancel style={{ display: `${value.length == 0 ? 'none' : 'block'}  `, fontSize: '16px', height: '100%' }} onClick={() => setValue("")} className={`${value.length == 0 ? 'none' : 'block'} cursor-pointer absolute right-[1%] top-0 h-full text-[16px]  `} />
                    </div>
                </div>


                {/* type buttons */}
                <div className="flex justify-between items-center w-full " >

                    <div className="flex justify-between items-center gap-[1rem] " >
                        <button onClick={handleCreateNoteClick} style={{ width: '34px', height: '34px' }} className='flex items-center justify-center bg-black rounded-full w-[34px] h-[34px]  ' >
                            <Add style={{ rotate: showCreateNoteForm && '45deg' }} className={`text-gray-300 ${showCreateNoteForm && 'rotate-45'} `} />
                        </button>
                    </div>

                    <div className='flex justify-between items-center gap-[16px] mr-[12px] ' >
                        <button onClick={() => typeButtonClick('all')} className={`w-[72px] h-[32px] rounded-[6px] ${noteState.type == 'all' && 'bg-gray-900 text-gray-300 '} `} >All</button>
                        <button onClick={() => typeButtonClick('project')} className={`w-[72px] h-[32px] rounded-[6px] ${noteState.type == 'project' && 'bg-gray-900 text-gray-300 '} `} >Project</button>
                        <button onClick={() => typeButtonClick('business')} className={`w-[72px] h-[32px] rounded-[6px] ${noteState.type == 'business' && 'bg-gray-900 text-gray-300 '} `} >Business</button>
                        <button onClick={() => typeButtonClick('personal')} className={`w-[72px] h-[32px] rounded-[6px] ${noteState.type == 'personal' && 'bg-gray-900 text-gray-300 '} `} >Personal</button>
                    </div>

                </div>

                {/* all notes */}
                <Notes />

            </Grid>

            {
                showSingleNote &&
                <DetailNote />
            }


        </Grid>


    )
}

export default NotesPage;








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