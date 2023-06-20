import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Tooltip, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { AddAlertOutlined, ColorLens, Image, MoreVertOutlined, Circle, DoNotDisturb, ExpandMore, Cancel } from '@mui/icons-material'
import { useStateContext } from "../../../../contexts/ContextProvider"
import FileBase64 from 'react-file-base64'
import { createTask } from "../../../../redux/actions/task"



const ModalComp = () => {
    const { taskState, setTaskState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    const containerRef = useRef(null)
    const wrapperRef = useRef(null);
    const { result, isLoading, isError, error } = useSelector(state => state.task)
    let random = Math.floor(Math.random() * 10) + 1    // random from 1 to 10
    const maxCount = 5;
    const dispatch = useDispatch()


    //////////////////////////// STATES ////////////////////////////////////
    const [textareaHeight, setTextareaHeight] = useState(3);
    const [showColors, setShowColors] = useState(false);
    const [showForm, setShowForm] = useState(false);



    //////////////////////////// USE EFFECTS ////////////////////////////////////
    // useEffect to detect click outside
    useEffect(() => {
        // add the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);
        // remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    //////////////////////////// FUNCTIONS ////////////////////////////////////
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            // the click was outside the component, so do something here
        }
    }

    const generateRandom = (from, to) => {
        let random = Math.floor(Math.random() * to) + from    // random from 1 to 10
        return random
    }

    const handleCreate = () => {
        const { title, task, uploadedImages, bg } = taskState.taskData
        dispatch(createTask({
            title, task, uploadedImages, bg
        }))
        setShowForm(false)
    }

    const handleSetColor = (color, hex) => {
        setTaskState({
            ...taskState,
            taskData: { ...taskState.taskData, bg: { color, hex } }
        })
    }

    const handleChange = (e) => {

        const element = document.getElementById('autoresizing')
        element.style.height = '5px'
        element.style.height = (element.scrollHeight) + 'px'
        if (element.scrollHeight > 600) {
            element.style.overflow = 'scroll'
        }
        else {
            element.style.overflow = 'hidden'
        }

        setTaskState({ ...taskState, taskData: { ...taskState.taskData, [e.target.name]: e.target.value } })
    }

    const handleImageButtonClick = () => {
        containerRef.current.querySelector('input[type="file"]').click();
    }

    const handleTaskImage = (files) => {
        // files = uploaded files array
        // file = { name: 'dino1.jpg', type: 'image/jpeg', size: '2 kB', base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==', file: File }
        const uploaded = [...taskState.taskData.uploadedImages]
        let limitExceeded = false

        files.some((file) => {      // file is an object
            if (taskState.taskData.uploadedImages.findIndex((f) => f.file.name === file.name) === -1) {          // to make sure, the current file is not uploaded already
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
            setTaskState({ ...taskState, taskData: { ...taskState.taskData, uploadedImages: uploaded } })
        }
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    const showAccordionForm = () => {
        setTaskState({ ...taskState, openTaskAccordion: !(taskState.openTaskAccordion) })
        const textarea = document.getElementById('autoresizing')
        textarea.focus()
    }

    const filterImage = (image) => {
        setTaskState({
            ...taskState,
            taskData: {
                ...taskState.taskData,
                uploadedImages: taskState.taskData.uploadedImages.filter((img) => image.file.name !== img.file.name)
            }
        })
    }


    return (

        <div style={{ margin: '3rem 0' }} className="flex justify-center items-center my-[3rem] " >
            <Accordion
                style={{ boxShadow: '0px 0px 8px 2px rgb(0 0 0 / 50%)', width: '35rem', background: 'inherit' }}
                className="bg-inherit w-[35rem] border-[1px] border-purple-300 rounded-[10px] "
                open={taskState.openTaskAccordion}
                onChange={showAccordionForm}
            >

                <AccordionSummary expandIcon={<ExpandMore className="text-purple-300 " />} className="border-b-[1px] border-b-purple-300  " style={{ height: '3rem', background: 'inherit', borderRadius: '2px' }} >
                    <Typography className="text-purple-300" variant="h6">Take a note...</Typography>
                </AccordionSummary>

                <AccordionDetails style={{ background: `#${taskState.taskData.bg.hex || 'inherit'}` }} className="w-full flex flex-col gap-4" >

                    {/* title */}
                    <div className="mt-[12px] " >
                        <input
                            className="w-full text-[#a4a2a5] rounded-[5px] placeholder-[#a4a2a5] bg-transparent text-[19px] font-medium focus:outline-none "
                            style={{ color: '#a4a2a5' }}
                            autoComplete='off'
                            name="title"
                            placeholder="Title"
                            value={taskState.taskData.title}
                            onChange={handleChange}
                        />
                    </div>
                    {/* task */}
                    <div className="" >
                        <div className="flex justify-center " >
                            {
                                taskState.taskData.uploadedImages.map((image, index) => (
                                    <div className="relative" >
                                        <Cancel onClick={() => filterImage(image)} className="absolute top-[2px] right-[2px] text-[18px] cursor-pointer " />
                                        <img key={index} src={image.url} alt="image" className="max-w-full rounded-[6px] h-[18rem] " />
                                    </div>
                                ))
                            }
                        </div>
                        <textarea
                            id="autoresizing"
                            className="resize-none   rounded-[5px] placeholder-[#a4a2a5] w-full bg-transparent text-[#a4a2a5] text-[18px] font-small focus:outline-none "
                            style={{ maxHeight: '625px', color: '#a4a2a5' }}
                            rows={textareaHeight}
                            autoComplete='off'
                            name="task"
                            placeholder="Task"
                            value={taskState.taskData.task}
                            // autoFocus={taskState.openTaskAccordion}
                            onChange={handleChange}
                        />
                    </div>
                    {/* buttons */}
                    <div className="flex justify-between items-center  " >
                        {/* features icon buttons */}
                        <div className="flex gap-4  " >
                            {/* reminder button */}
                            <div className="" >
                                <Tooltip title="Remind Me" placement="bottom" >
                                    <IconButton className="hover:bg-[#404040] " onClick={() => { }} ><AddAlertOutlined style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                                </Tooltip>
                            </div>
                            {/* color picker icon button */}
                            <div className="relative" >
                                <Tooltip title="Color" placement="bottom" >
                                    <IconButton className="hover:bg-[#404040] " onClick={() => setShowColors(pre => !pre)} ><ColorLens style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                                </Tooltip>
                                {
                                    showColors &&
                                    <div style={{ boxShadow: '1px 2px 6px 3px rgb(0 0 0 / 50%)' }} className="absolute flex justify-between  bg-purple-300 rounded-[8px] p-[8px] " >
                                        <Tooltip title="Default" placement="top" >
                                            <DoNotDisturb onClick={() => handleSetColor('purple-900', '202124')} style={{ fontSize: '40px' }} className={` cursor-pointer text-[#a4a2a5]  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Red" placement="top" >
                                            <Circle onClick={() => handleSetColor('red', '652826')} style={{ fontSize: '40px' }} className={` cursor-pointer text-red  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Dark Blue" placement="top" >
                                            <Circle onClick={() => handleSetColor('darkBlue', '0c3b5f')} style={{ fontSize: '40px' }} className={` cursor-pointer text-darkBlue  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Green" placement="top" >
                                            <Circle onClick={() => handleSetColor('green', '245a24')} style={{ fontSize: '40px' }} className={` cursor-pointer text-green  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Yellow" placement="top" >
                                            <Circle onClick={() => handleSetColor('yellow', '655d1a')} style={{ fontSize: '40px' }} className={` cursor-pointer text-yellow  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Gray" placement="top" >
                                            <Circle onClick={() => handleSetColor('gray', '3b3f43')} style={{ fontSize: '40px' }} className={` cursor-pointer text-gray  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Orange" placement="top" >
                                            <Circle onClick={() => handleSetColor('orange', '492e18')} style={{ fontSize: '40px' }} className={` cursor-pointer text-orange  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Brown" placement="top" >
                                            <Circle onClick={() => handleSetColor('brown', '674917')} style={{ fontSize: '40px' }} className={` cursor-pointer text-brown  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Purple" placement="top" >
                                            <Circle onClick={() => handleSetColor('purple', '47265d')} style={{ fontSize: '40px' }} className={` cursor-pointer text-purple  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Teal" placement="top" >
                                            <Circle onClick={() => handleSetColor('teal', '00514c')} style={{ fontSize: '40px' }} className={` cursor-pointer text-teal  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Blue" placement="top" >
                                            <Circle onClick={() => handleSetColor('blue', '16565f')} style={{ fontSize: '40px' }} className={` cursor-pointer text-blue  text-[40px] `} />
                                        </Tooltip>
                                        <Tooltip title="Pink" placement="top" >
                                            <Circle onClick={() => handleSetColor('pink', '641e43')} style={{ fontSize: '40px' }} className={` cursor-pointer text-pink  text-[40px] `} />
                                        </Tooltip>
                                    </div>
                                }

                            </div>
                            {/* add image icon button */}
                            <div ref={containerRef} id="filebase_image" className=" " >

                                <Tooltip title="Add Image" placement="bottom" >
                                    <IconButton className="hover:bg-[#404040] " onClick={handleImageButtonClick} ><Image style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                                </Tooltip>
                                {/* filebase64 component have display none */}
                                <FileBase64
                                    type="file"
                                    style={{ backgroundColor: 'red' }}
                                    multiple={true}
                                    onDone={(filesArr) => {
                                        handleTaskImage(filesArr)
                                    }
                                    }
                                />
                            </div>
                            {/* more horiz icon button */}
                            <div className="" >
                                <Tooltip title="More" placement="bottom" >
                                    <IconButton className="hover:bg-[#404040] " onClick={() => { }} ><MoreVertOutlined style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        {/* close and done buttons */}
                        <div className=" flex items-end gap-4 " >
                            <button onClick={handleCloseForm} style={{ color: '#a4a2a5' }} className=" text-[14px] text-[#a4a2a5] " >Close</button>
                            <button onClick={handleCreate} style={{ color: '#a4a2a5' }} className=" text-[14px] text-[#a4a2a5] " >Done</button>
                        </div>
                    </div>

                </AccordionDetails>

            </Accordion>

        </div>

    )
}


export default ModalComp 