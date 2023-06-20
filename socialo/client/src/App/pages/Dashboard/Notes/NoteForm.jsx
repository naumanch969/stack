import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import FileBase from "react-file-base64"
import { Cancel, ExpandMore, Circle } from "@mui/icons-material"


import { Tooltip } from '@mui/material'
import { Done } from "@mui/icons-material"
import { useStateContext } from "../../../../contexts/ContextProvider"
import { limitText } from "../../../../utils/functions/function"

import { createNote, updateNote } from "../../../../redux/actions/note"



const NoteForm = ({ updateTheNote, updateNoteId }) => {
    const { currentDate, currentMonth, currentYear, noteState, setNoteState, setShowUpdateNoteForm, setShowCreateNoteForm, selectedColor, setSelectedColor, resetedNoteData } = useStateContext()


    //////////////////////////// Variables /////////////////////////////////////
    const dispatch = useDispatch()
    const colors = ['red', 'darkBlue', 'green', 'yellow', 'gray', 'orange', 'brown', 'purple', 'teal', 'blue', 'pink']                 // random number 0 and (colors length - 1)
    const maxCount = 5                                          // max number of uploaded files
    const { result: notes, isLoading, isError, error } = useSelector(state => state.notes)

    //////////////////////////// States /////////////////////////////////////
    const [tagValue, setTagValue] = useState('')
    const [fileLimit, setFileLimit] = useState(false)               // if no. of uploaded files is equal to maxCount, fileLimit will be true. Else if the uploadedFiles.length !== maxCount then it will be false
    const [random, setRandom] = useState(Math.floor(Math.random() * (colors.length - 1)))
    const [showColorMenu, setShowColorMenu] = useState(false)
    const initialIsProvidedState = { uploadedImages: true, tags: true, note: true, type: true }

    //////////////////////////// UseEffects /////////////////////////////////////



    //////////////////////////// FUNCTIONS /////////////////////////////////////
    // 1)
    const clear = () => {
        setNoteState({ ...noteState, noteData: resetedNoteData })
    }


    const handleCloseNoteForm = () => {
        setNoteState({
            ...noteState,
            noteData: resetedNoteData,
            isProvided: initialIsProvidedState,
            currentNoteId: ''
        })
        setShowCreateNoteForm(false)
        setShowUpdateNoteForm(false)
    }

    // 2)
    const handleCreate = (e) => {
        e.preventDefault()
        if (noteState.noteData.note.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, note: false } })
            alert("note is not provided")
        }
        else if (noteState.noteData.uploadedImages.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, note: false } })
            alert("uploadedImages is not provided")
        }
        else if (noteState.noteData.tags.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, tags: false } })
            alert("tags is not provided")
        }
        else if (noteState.noteData.type.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, type: false } })
            alert("type is not provided")
        }
        else if (noteState.noteData.createdAt.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, createdAt: false } })
            alert("created is not provided")
        }
        else if (noteState.noteData.updatedAt?.length !== 0) {              // updatedAt field should be "" at start
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, updatedAt: false } })
            alert("updatedAt is not provided")
        }
        else if (noteState.noteData.bg.hex.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, bg: false } })
            alert("bg is not provided")
        }
        else {
            dispatch(createNote({ ...noteState.noteData, updatedAt: '' }))
            setNoteState({ ...noteState, isProvided: initialIsProvidedState, notesArr: [...noteState.notesArr, noteState.noteData] })
            // setShowCreateNoteForm(false)
            // clear()
            setTagValue('')
        }
    }

    // 2)
    const handleUpdate = (e) => {
        e.preventDefault()
        if (noteState.noteData.note.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, note: false } })
        }
        else if (noteState.noteData.uploadedImages.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, note: false } })
        }
        else if (noteState.noteData.tags.length == 0) {
            setNoteState({ ...noteState, isProvided: { ...noteState.isProvided, tags: false } })
        }
        else {
            dispatch(updateNote(updateNoteId, { ...noteState.noteData, updatedAt: `${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}` }))
            setNoteState({
                ...noteState,
                currentNoteId: '',
                isProvided: initialIsProvidedState
            })
            setShowUpdateNoteForm(false)
            setShowCreateNoteForm(false)
        }
    }

    // 3)
    const handleAddTag = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        setNoteState({ ...noteState, noteData: { ...noteState.noteData, tags: [...noteState.noteData.tags, value] } })
        e.target.value = ""
        setTagValue('')
    }

    // 4)
    const handleFilterTag = (tagToDelete) => {
        setNoteState({ ...noteState, noteData: { ...noteState.noteData, tags: noteState.noteData.tags.filter((tag) => tag !== tagToDelete) } })
    }

    // 5)
    const handleChange = (e) => {
        e.target.value == 'tags'
            ?
            setNoteState({ ...noteState, noteData: { ...noteState.noteData, [e.target.name]: e.target.value.split(',') } })
            :
            setNoteState({ ...noteState, noteData: { ...noteState.noteData, [e.target.name]: e.target.value } })
    }

    // 6)
    const handleUploadFiles = (files) => {
        // files = uploaded files array
        // file = { name: 'dino1.jpg', type: 'image/jpeg', size: '2 kB', base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==', file: File }
        const uploaded = [...noteState.noteData.uploadedImages]
        let limitExceeded = false

        files.some((file) => {      // file is an object
            if (noteState.noteData.uploadedImages.findIndex((f) => f.file.name === file.name) === -1) {          // to make sure, the current file is not uploaded already
                const { name, size, type, base64 } = file
                const url = base64
                uploaded.push({
                    file: { name, size, type },
                    url
                });
                if (uploaded.length === maxCount) setFileLimit(true)
                if (uploaded.length > maxCount) {
                    alert(`you can only upload ${maxCount} files`)
                    setFileLimit(false)
                    limitExceeded = true
                    return true             // to break the 'some' loop 
                }
            }
        })
        if (!limitExceeded) {               // if limitExceeded == false
            setNoteState({ ...noteState, noteData: { ...noteState.noteData, uploadedImages: uploaded } })
        }
    }

    // 7)
    const handleFileEvent = (e) => {
        // e.target.files = FileList {0: File, length: 1}                           // if one file is uploaded
        // e.target.files = FileList {0: File, 1: File, 2: File, length: 3}         // if multiple files uploaded at a time
        // where file = File { name: 'download.jpeg', lastModified: 1670997582711, lastModifiedDate: Wed Dec 14 2022 10: 59: 42 GMT + 0500(Pakistan Standard Time), webkitRelativePath: '', size: 12266, …

        // e.target.files is an array like object. so for converting this object into an array  - following code
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        // e.target.files becomes as [File, File, File] and stored in variable 'chosenFiles'
        handleUploadFiles(chosenFiles)
    }

    // 8)
    const filterUploadedFiles = (fileToRemove) => {
        setNoteState({ ...noteState, noteData: { ...noteState.noteData, uploadedImages: noteState.noteData.uploadedImages.filter((f) => f.file.name !== fileToRemove) } })
    }




    const handleSetColor = (color, hex) => {
        setNoteState({
            ...noteState,
            noteData: { ...noteState.noteData, bg: { color, hex } }

        })
        setSelectedColor({ color, hex })
    }











    //////////////////////////// Sub Components /////////////////////////////////////

    const Tag = ({ title }) => (
        <div style={{ background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124`, width: 'fit-content', height: 'fit-content' }} className="flex w-fit h-fit gap-2 items-center justify-between rounded-[15px] py-[3px] px-[7px]  " >
            <span className="" >{title}</span>
            <Cancel style={{ background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124`, fontSize: '1rem' }} onClick={() => handleFilterTag(title)} className={`cursor-pointer text-black text-[1rem] bg-purple-900  rounded-full `} />
        </div>
    )

    const UploadedFile = ({ name }) => (
        <div style={{ background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124`, width: 'fit-content' }} className="flex w-fit gap-2 items-center justify-between rounded-[15px] py-[2px] px-[4px] text-[11px]   " >
            <span className="" >{limitText(name, 18)}{name.length > 18 && '...'}</span>
            <Cancel style={{ fontSize: '1rem', background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124` }} onClick={() => filterUploadedFiles(name)} className={`cursor-pointer text-black text-[1rem]   rounded-full `} />
        </div>
    )
















    //////////////////////////// Actual Component //////////////////////////////////
    return (


        <div style={{ background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124`, borderRadius: '1rem' }} className={`relative flex flex-col justify-between rounded-4 min-w-[32rem] max-h-[32rem] h-[19rem]  bg-${noteState.noteData.bg.color ? noteState.noteData.bg : 'purple-900'}  p-4 mb-4`} >
            {/* close button of note form */}
            <Cancel onClick={handleCloseNoteForm} style={{ background: noteState.noteData.bg?.hex ? `#${noteState.noteData.bg.hex}` : `#202124` }} className={`absolute top-[-5px] right-[-5px] cursor-pointer bg-${noteState.noteData.bg?.color} text-purple-300 rounded-full `} />

            {/* form */}
            <div style={{ height: '90%' }} className="flex justify-between items-center gap-4 h-[90%] overflow-y-hidden overflow-x-hidden " >

                {/* left side */}
                <div style={{ height: '100%', width: '14.5rem' }} className=" flex flex-col gap-2 relative h-full w-[14.5rem] " >
                    {/* type input */}
                    <div style={{ height: '12%', borderRadius: '5px' }} className="bg-purple-300  px-[5px] py-[3px] h-[12%] relative flex justify-center gap-4 rounded-[5px] " >
                        <Circle onClick={() => handleSetColor('red', '652826')} className={` cursor-pointer text-red  `} />
                        <Circle onClick={() => handleSetColor('darkBlue', '0c3b5f')} className={` cursor-pointer text-darkBlue  `} />
                        <Circle onClick={() => handleSetColor('green', '245a24')} className={` cursor-pointer text-green  `} />
                        <Circle onClick={() => handleSetColor('yellow', '655d1a')} className={` cursor-pointer text-yellow  `} />
                        <Circle onClick={() => handleSetColor('gray', '3b3f43')} className={` cursor-pointer text-gray  `} />
                        <Circle onClick={() => handleSetColor('orange', '492e18')} className={` cursor-pointer text-orange  `} />
                        <Circle onClick={() => handleSetColor('brown', '674917')} className={` cursor-pointer text-brown  `} />
                        <Circle onClick={() => handleSetColor('purple', '47265d')} className={` cursor-pointer text-purple  `} />
                        <Circle onClick={() => handleSetColor('teal', '00514c')} className={` cursor-pointer text-teal  `} />
                        <Circle onClick={() => handleSetColor('blue', '16565f')} className={` cursor-pointer text-blue  `} />
                        <Circle onClick={() => handleSetColor('pink', '641e43')} className={` cursor-pointer text-pink  `} />
                    </div>


                    <div style={{ height: "88%", borderRadius: '5px' }} className="relative w-full h-[88%] " >
                        <textarea
                            style={{ resize: 'none', background: '', border: 'none', height: '100%', borderRadius: '5px' }}
                            className="code_highlight resize-none w-full h-full bg-purple-300 border-none overflow-x-scroll border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                            autoComplete='off'
                            name="note"
                            placeholder="Note"
                            value={noteState.noteData.note}
                            onChange={handleChange}
                            rows={8}
                        />
                        <Cancel
                            onClick={() => setNoteState({ ...noteState, noteData: { ...noteState.noteData, note: '' } })}
                            style={{ display: `${noteState.noteData.note.length == 0 ? 'none' : 'block'}`, fontSize: '1rem' }}
                            className={` ${noteState.noteData.note.length == 0 ? 'none' : 'block'} cursor-pointer absolute top-[10px] right-[10px] text-4 `}
                        />
                    </div>


                </div>
                {/* right side */}
                <div style={{ width: '14.5rem', height: '100%' }} className="flex flex-col gap-2 w-[14.5rem] h-full " >

                    {/* tag input */}
                    <div style={{ height: '44%' }} className="relative p-[7px] bg-purple-300 flex flex-wrap gap-4 w-full max-h-[50%] h-[44%] min-h-8 rounded-[5px]  overflow-y-scroll" >
                        <input
                            className=" h-[2rem] placeholder-gray-400  bg-transparent  w-full text-gray-400 focus:outline-none "
                            placeholder="Tags - separated by enter"
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        {
                            noteState.noteData.tags.map((tag, index) => (
                                <Tag key={index} title={tag} />
                            ))
                        }
                    </div>

                    {/* image file input */}
                    <div style={{ height: '44%' }} className="relative p-[7px]  bg-purple-300 max-h-[50%] h-[44%] min-h-8 rounded-[5px] overflow-y-scroll overflow-x-hidden " >
                        <div className="filebase_parent flex justify-between items-center  " >
                            <FileBase
                                type="file"
                                multiple={true}
                                onDone={(filesArr) => {
                                    handleUploadFiles(filesArr)
                                }
                                }
                            />
                            <span className="" >{noteState.noteData.uploadedImages.length == 0 ? 'No File Chosen' : `${noteState.noteData.uploadedImages.length} Files Chosen`}</span>
                        </div>
                        {/* <input
                            id="fileUpload"
                            type='file'
                            multiple
                            disabled={fileLimit}
                            onChange={handleFileEvent}
                            className="hidden"
                        />
                        <label htmlFor="fileUpload" className="flex justify-start gap-[10px]  " >
                            <a className={` bg-[#bcbcbc] cursor-pointer text-[12px] px-[3px] py-[4px] rounded-[7px] ${!fileLimit ? '' : 'disabled'} `} >Upload Files</a>
                        </label> */}
                        <div className="" >
                            {
                                noteState.noteData.uploadedImages.map((f, index) => (
                                    <div key={index} className="flex justify-start items-center gap-[10px] my-[4px] " >
                                        <img src={f.url} alt="image" style={{ height: '25px', width: '25px', borderRadius: '50%' }} className="w-[25px] h-[25px] rounded-full " />
                                        <UploadedFile name={f.file.name} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* type input */}
                    <div style={{ height: '12%', borderRadius: '5px' }} className="h-[12%] rounded-[5px] " >
                        <select className="w-full h-full rounded-[5px] outline-none cursor-pointer " onChange={(e) => setNoteState({ ...noteState, noteData: { ...noteState.noteData, type: e.target.value } })} >
                            <option className="checked:bg-purple-900 checked:text-purple-300 " value="general" >General</option>
                            <option className="checked:bg-purple-900 checked:text-purple-300 " value="work" >Work</option>
                            <option className="checked:bg-purple-900 checked:text-purple-300 " value="personal" >Personal</option>
                            <option className="checked:bg-purple-900 checked:text-purple-300 " value="project" >project</option>
                        </select>
                    </div>

                </div>

            </div>

            {/* date and buttons */}
            <div style={{ height: '10%', position: 'relative', top: '7px' }} className='flex justify-between relative top-[7px] overflow-y-initial ' >
                <span className='thinScrollbar text-[13px] flex justify-center items-center ' >{`${limitText(currentMonth, 3)} ${currentDate}, ${currentYear}`}</span>
                <Tooltip title={updateTheNote ? 'Update' : 'Create'} placement="top" >
                    <button onClick={updateTheNote ? handleUpdate : handleCreate} style={{ background: 'black', width: '30px', height: '30px' }} className=" bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center " >
                        <Done style={{ fontSize: '16px' }} className="text-purple-300 text-[16px] " />
                    </button>
                </Tooltip>
            </div>

        </div>

    )
}

export default NoteForm;




