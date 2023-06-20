import { generateRandom } from "../../utilityFunctions/function"
import { Circle, DoNotDisturb, Edit, ColorLens } from "@mui/icons-material"
import { useStateContext } from "../../contexts/ContextProvider"
import { limitText } from "../../utilityFunctions/function"
import { useState, useEffect } from "react"
import { IconButton, Tooltip } from "@mui/material"
import { useDispatch } from "react-redux"
import { updateBg } from "../../actions/activity"

const Activity = ({ activity, date, bg, id }) => {
    const { activityState, setActivityState, Months, Days } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const colors = ['652826', '0c3b5f', '245a24', '655d1a', '3b3f43', '492e18', '674917', '47265d', '00514c', '16565f', '641e43']

    /////////////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////////////////
    const [showButtons, setShowButtons] = useState(false)
    const [showColors, setShowColors] = useState(false);
    const [background, setBackground] = useState(bg)
    const [showFull, setShowFull] = useState(false)


    /////////////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////////


    const handleDeleteButtonClick = () => {
        setActivityState({
            ...activityState,
            openConfirm: true,
            currentActivityId: id
        })
    }

    const handleSetColor = (color, hex) => {
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, bg: { color, hex } }
        })
        dispatch(updateBg(id, { bg: { color, hex } }))
        setBackground({ color, hex })
    }

    const openActivityModal = () => {
        setActivityState({
            ...activityState,
            openActivityModal: true,
            openActAccordForUpdate: true,
            activityData: { activity, date, bg },
            currentActivityId: id
        })
        console.log(`inside the openActivityModa Function`)
    }









    return (
        <div
            onClick={() => openActivityModal()}
            style={{ background: `#${background.hex}`, height: 'fit-content' }}
            className={`
            ${activityState.isGridView && ' md:w-[49%] overflow-y-scroll  max-h-[35rem] h-fit '} 
            ${!activityState.isGridView && 'w-full h-auto flex flex-col border-[1px] rounded-[4px] border-gray-300   '}
            rounded-[4px] border-[1px] border-gray-300 mb-[2rem] `}
        >

            {/* time and day */}
            <div style={{ zIndex: '10' }} className="z-5 sticky top-0 flex justify-between gap-[12px] bg-inherit text-gray-100 text-[20px] h-fit px-[10px] py-[10px] " >
                <span className="flex justify-between gap-[10px] " >
                    <p>{date.date} {limitText(Months[date.month], 3)}, {date.year} </p>
                    <p>{limitText(Days[date.day], 3)}</p>
                </span>
            </div>














            {/* all text and images */}
            <div className="flex flex-col justify-between gap-[10px] px-[10px] pb-[10px] " >
                {
                    activityState.filters.media &&
                    <>
                        {
                            activity.map((timeLapse, index) => (
                                timeLapse.uploadedImages.length !== 0 &&
                                <div key={index} className="flex justify-center" >
                                    <img src={timeLapse.uploadedImages[0]?.url} alt="image" className="h-[15rem] w-full rounded-[4px] " />
                                </div>
                            ))
                        }
                    </>
                }



















                <>
                    {
                        activityState.filters.timeLapses
                            ? //  of time lapses 
                            <div className="  relative flex flex-col py-[6px]  " >
                                <hr style={{ width: '1px', left: activityState.isGridView ? '54px' : '60px', background: '#ffffff4d' }} className={`w-[1px] h-full absolute ${activityState.isGridView ? 'left-[54px]' : 'left-[60px]'}  bg-[#ffffff4d] `} />
                                {
                                    activity.map((timeLapse, index) => (
                                        <div style={{ borderBottom: '1px solid #ffffff4d', borderRadius: '0', gap: activityState.isGridView ? '8px' : '15px', padding: '4px 8px' }} key={index} className={`py-[1px] border-b-[1px] border-[#ffffff4d] rounded-0 flex items-start px-[8px] ${activityState.isGridView ? 'px-0 gap-[8px] ' : 'px-[8px] gap-[15px] '} text-gray-100 rounded-[4px] `} >
                                            <span style={{ minWidth: activityState.isGridView ? '19%' : '10%' }} className={` ${activityState.isGridView ? ' min-w-[19%]' : 'w-[10%]'}`} >{timeLapse.time}</span>





                                            {
                                                activityState.filters.images &&
                                                <div className="gap-[4px] flex justify-center " >
                                                    {
                                                        timeLapse.uploadedImages?.map((image, index) => (
                                                            <div key={index} className="relative" >
                                                                <Tooltip title='Cancel' placement='top' >
                                                                    <Cancel onClick={() => { }} style={{ fontSize: `18px` }} className="text-black absolute top-[2px] right-[2px] text-[18px] cursor-pointer " />
                                                                </Tooltip>
                                                                <img key={index} src={image.url} alt="image" className="max-w-full rounded-[6px] h-[10rem] " />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }




                                            {
                                                activityState.filters.heading &&
                                                <h4
                                                    onClick={() => { }}
                                                    style={{ textTransform: `capitalize`, fontSize: `32px` }}
                                                    className="text-[32px] capitalize "
                                                >
                                                    {timeLapse.heading}
                                                </h4>
                                            }





                                            {
                                                activityState.filters.links &&
                                                <div div className="w-full my-[8px] flex items-start flex-col  " >
                                                    {
                                                        timeLapse.links?.map((li, index) => (
                                                            <div key={index} className="flex  gap-[4px] " >
                                                                <p style={{ width: '15px' }} className="w-[15px] flex justify-center "  >{index + 1}</p>
                                                                <span className="flex flex-col" >
                                                                    <a onClick={() => { }} style={{ color: '#847ccc' }} className="text-[#847ccc] underline " >{li.link}</a>
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }





                                            {
                                                activityState.filters.text &&
                                                <p className={` ${activityState.isGridView ? 'w-[80%]' : 'w-[90%]'} `} >{timeLapse.text}</p>
                                            }





                                        </div>
                                    ))
                                }
                            </div>




                            : // withoud time lapses  
                            <div id="non_timeLapses_activity" className=" flex flex-col gap-[4px]  " >
                                {
                                    activity.map((timeLapse, index) => (
                                        timeLapse.text &&
                                        <span key={index} style={{ display: 'inline-block', minWidth: '46%' }} className="relative min-h-[20px] min-w-[46%] sm:mr-[20px] mr-0 " >
                                            <Circle style={{ fontSize: '10px', color: `#${colors[generateRandom(0, 10)]}`, top: '9px' }} className="absolute top-[9px] text-white text-[10px] " />
                                            {activityState.filters.text && <p style={{ paddingLeft: '15px' }} className="pl-[15px] text-gray-300 " >{timeLapse.text}</p>}
                                        </span>
                                    ))
                                }
                            </div>
                    }
                </>


            </div>

















            {/* buttons */}
            <div style={{ height: '2.5rem' }} className="flex justify-end items-center   h-[2.5rem] px-[10px] mb-[10px] " >
                <div className="flex gap-4 " >
                    <div className="relative" >
                        <Tooltip title="Color" placement="bottom" >
                            <IconButton className="hover:bg-[#404040] " onClick={() => setShowColors(pre => !pre)} ><ColorLens style={{ fontSize: '22px', color: '#a4a2a5' }} className="text-[22px] text-[#a4a2a5]  " /></IconButton>
                        </Tooltip>
                        {
                            showColors &&
                            <div style={{ boxShadow: '1px 2px 6px 3px rgb(0 0 0 / 50%)', top: '4px', right: '40px' }} className="absolute top-[4px] right-[40px] flex justify-between  rounded-[8px] p-[2px] " >
                                <Tooltip title="Default" placement="bottom" >
                                    <DoNotDisturb onClick={() => handleSetColor('gray-900', '202124')} style={{ fontSize: '25px' }} className={` ${background.color == 'gray-900' && 'border-1px border-white'} cursor-pointer text-[#a4a2a5]  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Red" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('red', '652826')} style={{ fontSize: '25px' }} className={` ${background.color == 'red' && 'border-1px border-white'} cursor-pointer text-red  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Dark Blue" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('darkBlue', '0c3b5f')} style={{ fontSize: '25px' }} className={` ${background.color == 'darkBlue' && 'border-1px border-white'} cursor-pointer text-darkBlue  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Green" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('green', '245a24')} style={{ fontSize: '25px' }} className={` ${background.color == 'green' && 'border-1px border-white'} cursor-pointer text-green  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Yellow" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('yellow', '655d1a')} style={{ fontSize: '25px' }} className={` ${background.color == 'yellow' && 'border-1px border-white'} cursor-pointer text-yellow  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Gray" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('gray', '3b3f43')} style={{ fontSize: '25px' }} className={` ${background.color == 'gray' && 'border-1px border-white'} cursor-pointer text-gray  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Orange" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('orange', '492e18')} style={{ fontSize: '25px' }} className={` ${background.color == 'orange' && 'border-1px border-white'} cursor-pointer text-orange  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Brown" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('brown', '674917')} style={{ fontSize: '25px' }} className={` ${background.color == 'brown' && 'border-1px border-white'} cursor-pointer text-brown  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Purple" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('purple', '47265d')} style={{ fontSize: '25px' }} className={` ${background.color == 'purple' && 'border-1px border-white'} cursor-pointer text-purple  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Teal" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('teal', '00514c')} style={{ fontSize: '25px' }} className={` ${background.color == 'teal' && 'border-1px border-white'} cursor-pointer text-teal  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Blue" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('blue', '16565f')} style={{ fontSize: '25px' }} className={` ${background.color == 'blue' && 'border-1px border-white'} cursor-pointer text-blue  text-[40px] `} />
                                </Tooltip>
                                <Tooltip title="Pink" placement="bottom" >
                                    <Circle onClick={() => handleSetColor('pink', '641e43')} style={{ fontSize: '25px' }} className={` ${background.color == 'pink' && 'border-1px border-white'} cursor-pointer text-pink  text-[40px] `} />
                                </Tooltip>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}


export default Activity
