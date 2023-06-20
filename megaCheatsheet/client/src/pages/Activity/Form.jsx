import { AddAlertOutlined, ColorLens, Image, MoreVertOutlined, Circle, DoNotDisturb, Cancel, AddLink, Title } from '@mui/icons-material'
import { IconButton, Tooltip } from "@mui/material"
import TextareaAutosize from 'react-textarea-autosize'
import { useState, useEffect, useRef } from "react"
import FileBase64 from 'react-file-base64'
import { useDispatch } from "react-redux"

import { addLink, updateLink, deleteLink, updateHeading, updateText, addImage, deleteImage } from "../../actions/activity"
import { useStateContext } from "../../contexts/ContextProvider"
import { limitText } from "../../utilityFunctions/function"


const Form = () => {
    const {
        activityState, setActivityState,
        resetedActivityData,
        currentDate, currentMonth, currentYear, currentHour, currentMinute, currentDay, Months, Days,
        headingRef, linkRef, textRef, timeLapseContentRef,
        TLLinkValue, setTLLinkValue,
        TLHeadingValue, setTLHeadingValue,
        setTLTextValue,
    } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const containerRef = useRef(null)
    const maxCount = 5;
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////////////////

    const [showColors, setShowColors] = useState(false);




    /////////////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        console.log(`activityModal`, activityState.openActivityModal)
    }, [activityState.openActivityModal])



    /////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////////


    const handleUpdate = () => {
        const { activity, date, bg } = activityState.activityData
        activity.map((timeLapse) => {
            delete timeLapse.focused
        })
        dispatch(updateActivity(activityState.currentActivityId, { activity, date, bg }))
        setActivityState({
            ...activityState,
            openActAccordForUpdate: false,
            openActivityModal: false
        })
        clear()
    }
    const handleSetColor = (color, hex) => {
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, bg: { color, hex } }
        })
    }


    const clear = () => {
        setActivityState({
            ...activityState,
            resetedActivityData
        })
    }


    const focusGain = (timeLapse) => {
        setActivityState({
            ...activityState,
            focusedTimeLapse: timeLapse.time,
            focusedTimeLapseId: timeLapse._id,
        })
    }


    // uploaded image related
    const handleImageButtonClick = () => {
        containerRef.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        // files = uploaded files array    -    [{file1}, {file2}, ..., {fileN}]
        // file = { name: 'dino1.jpg', type: 'image/jpeg', size: '2 kB', base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==', file: File }
        let limitExceeded = false
        activityState.activityData.activity.map((timeLapse) => {

            if (timeLapse.time == activityState.focusedTimeLapse) {
                const uploaded = [...timeLapse.uploadedImages]
                files.some((file) => {      // file is an object
                    if (timeLapse.uploadedImages.findIndex((f) => f.file.name === file.name) === -1) {          // to make sure, the current file is not uploaded already
                        const { name, size, type, base64 } = file
                        const url = base64
                        let activityId = activityState.activityData._id
                        let timeLapseId = timeLapse._id

                        // for backend
                        dispatch(addImage(activityId, { timeLapseId, file: { name, size, type }, url }));
                        // for frontend
                        uploaded.push({ file: { name, size, type }, url });

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
                    const findedTimeLapse = activityState.activityData.activity.find((activity) => activity.time == timeLapse.time)
                    findedTimeLapse.uploadedImages = uploaded
                    setActivityState({
                        ...activityState,
                        activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
                    })
                }

            }

        })
    }
    const deleteImageFunc = (image, time) => {
        // image = {file, url, _id}
        activityState.activityData.activity.map((timeLapse) => {
            if (timeLapse.time == time) {
                const findedTimeLapse = activityState.activityData.activity.find((t) => t.time == timeLapse.time)
                findedTimeLapse.uploadedImages = findedTimeLapse.uploadedImages.filter((img) => image.url !== img.url)
                let activityId = activityState.activityData._id
                dispatch(deleteImage(activityId, { timeLapseId: findedTimeLapse._id, imageId: image._id }))                  // (activityId, {timeLapseId, linkId})
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })
    }




    // heading of each time lapse
    const headingIconClick = (time) => {
        setTLHeadingValue('')
        activityState.activityData.activity.map((timeLapse) => {
            if (timeLapse.time == time) {
                timeLapse.showHeadingInput = !timeLapse.showHeadingInput
                timeLapse.clickedHeading = ''
            }
            else {
                timeLapse.showHeadingInput = false
                timeLapse.clickedHeading = ''
            }
        })
        setActivityState({
            ...activityState, activity: [...activityState.activityData.activity]
        })
    }
    const headingClick = (clickedHeading) => {
        activityState.activityData.activity.map((timeLapse) => {
            if (activityState.focusedTimeLapseId == timeLapse._id) {
                const findedTimeLapse = activityState.activityData.activity.find((time) => time._id == timeLapse._id)
                findedTimeLapse.clickedHeading = clickedHeading
            }
            else {
                timeLapse.clickedHeading = ''
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })
        setTLHeadingValue(clickedHeading)
    }
    const changeHeading = (editedHeading) => {
        if (editedHeading.length == 0) {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    timeLapse.showHeadingInput = false
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
            setTLHeadingValue('')
        }
        else {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapseId == timeLapse._id) {
                    const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                    findedTimeLapse.heading = editedHeading.length == 0 ? `` : editedHeading
                    findedTimeLapse.clickedHeading = ''
                    dispatch(updateHeading(activityState.activityData._id, { timeLapseId: timeLapse._id, heading: editedHeading }))                   // (activityId, {timeLapseId, headng})
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
        }

    }


    // link of each time lapse
    const linkIconClick = (time) => {
        setTLLinkValue('')
        activityState.activityData.activity.map((timeLapse) => {
            if (timeLapse.time == time) {
                timeLapse.showLinkInput = !timeLapse.showLinkInput
                timeLapse.clickedLink = false
            }
            else {
                timeLapse.showLinkInput = false
                timeLapse.clickedLink = false
            }
        })
        setActivityState({
            ...activityState, activity: [...activityState.activityData.activity]
        })
    }
    const linkTextClick = (clickedLink) => {
        // clickedLink = {link,_id}
        activityState.activityData.activity.map((timeLapse) => {
            if (activityState.focusedTimeLapse == timeLapse.time) {
                const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)
                findedTimeLapse.clickedLink = clickedLink
                findedTimeLapse.showLinkInput = false
            }
            else {
                timeLapse.clickedLink = false
                timeLapse.showLinkInput = false
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })
        setTLLinkValue(clickedLink.link)
    }
    const addLinkFunc = (link) => {
        if (TLLinkValue.includes(' ')) {
            alert(`link should not contain spaces`)
        }
        else if (link.length !== 0) {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    const findedTimeLapse = activityState.activityData.activity.find((t) => t.time == timeLapse.time)
                    findedTimeLapse.links = [...findedTimeLapse.links, { link }]
                    findedTimeLapse.showLinkInput = false
                    let obj = { timeLapseId: findedTimeLapse._id, link: link }
                    let activityId = activityState.activityData._id
                    dispatch(addLink(activityId, obj))                  // (activityId, {timeLapseId, headng})
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
            setTLLinkValue('')
        }
        else if (link.length == 0) {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    timeLapse.showLinkInput = false
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
            setTLLinkValue('')
        }
    }
    const changeLink = (editedLink) => {
        if (editedLink.length == 0) {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    // deleting previously exist link
                    if (timeLapse.clickedLink._id) {
                        const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                        findedTimeLapse.links = findedTimeLapse.links.filter((li) => li.link !== timeLapse.clickedLink.link)
                        let activityId = activityState.activityData._id
                        dispatch(deleteLink(activityId, { timeLapseId: findedTimeLapse._id, linkId: timeLapse.clickedLink._id }))                  // (activityId, {timeLapseId, linkId})
                        findedTimeLapse.clickedLink = { link: ``, _id: `` }
                    }
                    // link was not exist previously.
                    else {
                        timeLapse.showLinkInput = false
                    }
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
        }
        else {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                    let index = findedTimeLapse.links.findIndex((li) => li.link == timeLapse.clickedLink.link)
                    findedTimeLapse.links[index].link = editedLink

                    let obj = { timeLapseId: findedTimeLapse._id, link: editedLink, linkId: timeLapse.clickedLink._id }
                    let activityId = activityState.activityData._id
                    dispatch(updateLink(activityId, obj))                  // (activityId, {timeLapseId, headng})

                    findedTimeLapse.clickedLink = false
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
        }
    }


    // text of each time lapse
    const handleChange = () => (e) => {
        // mera code
        activityState.activityData.activity.map((timeLapse) => {
            if (timeLapse.time == e.target.name) {
                const findedActivity = activityState.activityData.activity.find((activity) => activity.time == timeLapse.time)
                findedActivity.text = e.target.value
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })
        setTLTextValue(e.target.value)
    }
    const handleBlurText = (text) => {
        changeText(text)
    }
    const changeText = (editedText) => {
        activityState.activityData.activity.map((timeLapse) => {
            if (activityState.focusedTimeLapse == timeLapse.time) {
                const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                findedTimeLapse.text = editedText
                findedTimeLapse.clickedText = ''
                dispatch(updateText(activityState.activityData._id, { timeLapseId: timeLapse._id, text: editedText }))                   // (activityId, {timeLapseId, headng})
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })
    }







    return (
        <>
            {/* Today's Activities Heading */}
            <div className="mb-[16px] "  >
                <h4 className="text-gray-300 text-[26px] text-bold " variant="h6">Today's Activity</h4>
                {/* <button onClick={() => dispatch(updateActivity(activityState.activityData._id, resetedActivityData))} className=" " >Reset</button> */}
            </div>



            {/* Complete Block */}
            <div style={{ background: `#${activityState.activityData.bg.hex || 'inherit'}` }} className="w-full flex flex-col gap-[10px] border-[1px] border-gray-300 rounded-[4px] p-[5px] pt-[12px] " >
                {/* date and time */}
                <div className="text-gray-300 bg-black rounded-[4px] flex justify-between px-[5px] py-[10px] " >
                    <p className='text-[30px] ' >{currentDate} {limitText(Months[currentMonth + 1], 3)}, {currentYear} {'  '} {limitText(Days[currentDay], 3)} {'  '} {currentHour}:{currentMinute} </p>
                </div>

                {/* time lapses */}
                <div className="  flex flex-col gap-[8px]  " >
                    {
                        activityState.activityData?.activity.map((timeLapse, index) => (


                            <div key={index} style={{ gap: `5px`, padding: `5px`, background: `black` }} className="relative bg-black flex items-start gap-[5px] p-[5px] text-gray-100 rounded-[4px] " >

                                <p style={{ width: '56px' }} className="bg-gray w-[56px] rounded-[4px] flex justify-center items-center " >{timeLapse.time}</p>



                                <div
                                    ref={timeLapseContentRef}
                                    // onClick={() => focusGain(timeLapse.time)}
                                    onMouseEnter={() => focusGain(timeLapse)}
                                    className={`bg-gray rounded-[4px] p-[6px] relative border-b-[1px] border-gray-300 w-full flex flex-col justify-center items-center `}
                                >

                                    {/* images of particular time lapse */}
                                    <div className="gap-[4px] flex justify-center " >
                                        {/* image.url && */}
                                        {
                                            timeLapse.uploadedImages?.map((image, index) => (
                                                <div key={index} className="relative" >
                                                    <Tooltip title='Cancel' placement='top' >
                                                        <Cancel onClick={() => deleteImageFunc(image, timeLapse.time)} style={{ fontSize: `18px` }} className="text-black absolute top-[2px] right-[2px] text-[18px] cursor-pointer " />
                                                    </Tooltip>
                                                    <img key={index} src={image.url} alt="image" className="max-w-full rounded-[6px] h-[10rem] " />
                                                </div>
                                            ))
                                        }
                                    </div>







                                    {/* heading of particular time lapse */}
                                    <div className="w-full flex items-start flex-col  " >
                                        {
                                            timeLapse.clickedHeading
                                                ?   // editing Heading
                                                <input
                                                    placeholder="Heading..."
                                                    value={TLHeadingValue}
                                                    onChange={(e) => setTLHeadingValue(e.target.value)}
                                                    onKeyDown={(e) => e.key == 'Enter' && changeHeading(TLHeadingValue)}
                                                    style={{ textTransform: `capitalize`, fontSize: `32px` }}
                                                    className={`bg-blue capitalize mb-[4px] text-[32px] bg-inherit outline-none w-[15rem] border-b-[1px] border-gray-300  `}
                                                    ref={headingRef}
                                                />
                                                :
                                                <h4
                                                    onClick={() => headingClick(timeLapse.heading)}
                                                    style={{ textTransform: `capitalize`, fontSize: `32px` }}
                                                    className="text-[32px] capitalize "
                                                >{timeLapse.heading}</h4>
                                        }
                                        {   // creating Heading
                                            timeLapse.showHeadingInput && !timeLapse.heading &&
                                            <div className="flex gap-[4px] mb-[6px] " >
                                                <input
                                                    placeholder="Title Here"
                                                    value={TLHeadingValue}
                                                    onChange={(e) => setTLHeadingValue(e.target.value)}
                                                    onFocus={() => focusGain(timeLapse)}
                                                    onKeyDown={(e) => e.key == 'Enter' && changeHeading(TLHeadingValue)}
                                                    ref={headingRef}
                                                    style={{ textTransform: `capitalize`, fontSize: `32px` }}
                                                    className={`bg-inherit capitalize text-[32px] outline-none w-[15rem] border-b-[1px] border-gray-300   `}
                                                />
                                            </div>
                                        }
                                    </div>






                                    {/* links of particular time lapse */}
                                    <div className="w-full my-[8px] flex items-start flex-col  " >
                                        {
                                            timeLapse.links?.map((li, index) => (
                                                <div key={index} className="flex  gap-[4px] " >
                                                    <p style={{ width: '15px' }} className="w-[15px] flex justify-center "  >{index + 1}</p>
                                                    <span className="flex flex-col" >
                                                        {
                                                            timeLapse.clickedLink.link == li.link
                                                                ?
                                                                <input
                                                                    placeholder="Type something or paste URL"
                                                                    value={TLLinkValue}
                                                                    onChange={(e) => setTLLinkValue(e.target.value)}
                                                                    onKeyDown={(e) => e.key == 'Enter' && changeLink(TLLinkValue)}
                                                                    className={`mb-[4px] bg-inherit outline-none w-[15rem] border-b-[1px] border-gray-300 ${TLLinkValue.includes(' ') && 'border-red'} `}
                                                                    ref={linkRef}
                                                                />
                                                                :
                                                                <a onClick={() => linkTextClick(li)} style={{ color: '#847ccc' }} className="text-[#847ccc] underline " >{li.link}</a>
                                                        }
                                                    </span>
                                                </div>
                                            ))
                                        }
                                        {
                                            timeLapse.showLinkInput &&
                                            <div className="flex gap-[4px] " >
                                                <p style={{ width: '15px' }} className="w-[15px] flex justify-center "  >{timeLapse.links.length + 1}</p>
                                                <div className="" >
                                                    <input
                                                        placeholder="Type or paste URL"
                                                        value={TLLinkValue}
                                                        onChange={(e) => setTLLinkValue(e.target.value)}
                                                        onFocus={() => focusGain(timeLapse)}
                                                        onKeyDown={(e) => e.key == 'Enter' && addLinkFunc(TLLinkValue)}
                                                        className={`bg-inherit outline-none w-[15rem] border-b-[1px] border-gray-300 ${TLLinkValue.includes(' ') && 'border-red'} `}
                                                        ref={linkRef}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </div>







                                    {/* text of particular time lapse */}
                                    <div className=" w-full mt-[5px] " >

                                        {
                                            <TextareaAutosize
                                                id="autoresizing"
                                                className="resize-none   placeholder-[#a4a2a5] w-full bg-transparent text-[#a4a2a5] text-[18px] pr-[20px] font-small focus:outline-none "
                                                style={{ height: timeLapse.height }}
                                                autoComplete='off'
                                                name={timeLapse.time}
                                                value={timeLapse.text}
                                                // focus={activityState.focusedTimeLapse == timeLapse.time}
                                                onBlur={() => handleBlurText(timeLapse.text)}
                                                onFocus={() => focusGain(timeLapse)}
                                                onChange={handleChange(index)}
                                                minRows={1}
                                                maxRows={10}
                                                ref={textRef}
                                                placeholder='Type Here...'
                                            />
                                        }

                                    </div>








                                    {/* option buttons */}
                                    <div style={{ width: '100%', }} className="w-full min-h-[26px] my-[2px] flex items-center justify-end gap-[10px]  " >
                                        {
                                            activityState.focusedTimeLapse == timeLapse.time &&
                                            <div className="flex justify-between items-center p-[1px] gap-[12px] rounded-[2px] " >
                                                <div ref={containerRef} id="filebase_image" className=" " >
                                                    <Tooltip placement="top" title="Add Image">
                                                        <Image onClick={() => handleImageButtonClick(timeLapse.time)} className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                    </Tooltip>
                                                    {/* filebase64 component have display none */}
                                                    <FileBase64
                                                        type="file"
                                                        multiple={true}
                                                        onDone={(filesArr) => {
                                                            addImageFunc(filesArr)
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <Tooltip placement="top" title="random" >
                                                    <MoreVertOutlined className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                </Tooltip>
                                                <Tooltip placement="top" title="random" >
                                                    <AddAlertOutlined className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Link" >
                                                    <AddLink onClick={() => linkIconClick(timeLapse.time)} className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Heading" >
                                                    <Title onClick={() => headingIconClick(timeLapse.time)} className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Random" >
                                                    <ColorLens className="text-[16px] text-gray-100 hover:bg-gray-800 rounded-[2px] cursor-pointer p-[1px] " />
                                                </Tooltip>
                                            </div>
                                        }
                                    </div>




                                </div>



                            </div>


                        ))
                    }
                </div>

                {/* buttons */}
                <div className="flex justify-between items-center " >
                    {/* features icon buttons */}
                    <div className="flex gap-4  " >
                        {/* reminder button */}
                        <div className="" >
                            <Tooltip title="Remind Me" placement="bottom" >
                                <IconButton className="" onClick={() => { }} ><AddAlertOutlined style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                            </Tooltip>
                        </div>
                        {/* color picker icon button */}
                        <div className="relative" >
                            <Tooltip title="Color" placement="bottom" >
                                <IconButton className="" onClick={() => setShowColors(pre => !pre)} ><ColorLens style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                            </Tooltip>
                            {
                                showColors &&
                                <div style={{ boxShadow: '1px 2px 6px 3px rgb(0 0 0 / 50%)' }} className="absolute flex justify-between  bg-gray-300 rounded-[8px] p-[8px] " >
                                    <Tooltip title="Default" placement="bottom" >
                                        <DoNotDisturb onClick={() => handleSetColor('gray-900', '202124')} style={{ fontSize: '40px' }} className={` cursor-pointer text-[#a4a2a5]  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Red" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('red', '652826')} style={{ fontSize: '40px' }} className={` cursor-pointer text-red  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Dark Blue" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('darkBlue', '0c3b5f')} style={{ fontSize: '40px' }} className={` cursor-pointer text-darkBlue  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Green" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('green', '245a24')} style={{ fontSize: '40px' }} className={` cursor-pointer text-green  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Yellow" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('yellow', '655d1a')} style={{ fontSize: '40px' }} className={` cursor-pointer text-yellow  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Gray" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('gray', '3b3f43')} style={{ fontSize: '40px' }} className={` cursor-pointer text-gray  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Orange" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('orange', '492e18')} style={{ fontSize: '40px' }} className={` cursor-pointer text-orange  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Brown" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('brown', '674917')} style={{ fontSize: '40px' }} className={` cursor-pointer text-brown  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Purple" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('purple', '47265d')} style={{ fontSize: '40px' }} className={` cursor-pointer text-purple  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Teal" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('teal', '00514c')} style={{ fontSize: '40px' }} className={` cursor-pointer text-teal  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Blue" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('blue', '16565f')} style={{ fontSize: '40px' }} className={` cursor-pointer text-blue  text-[40px] `} />
                                    </Tooltip>
                                    <Tooltip title="Pink" placement="bottom" >
                                        <Circle onClick={() => handleSetColor('pink', '641e43')} style={{ fontSize: '40px' }} className={` cursor-pointer text-pink  text-[40px] `} />
                                    </Tooltip>
                                </div>
                            }

                        </div>
                        {/* more horiz icon button */}
                        <div className="" >
                            <Tooltip title="More" placement="bottom" >
                                <IconButton className="" onClick={() => { }} ><MoreVertOutlined style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    {/* close and done buttons */}
                    <div className=" flex items-end gap-4 " >
                        <button onClick={handleUpdate} style={{ color: '#a4a2a5' }} className=" text-[14px] text-[#a4a2a5] " >Done</button>
                    </div>
                </div>
            </div>



        </>


    )
}


export default Form 