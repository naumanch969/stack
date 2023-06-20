import { Button, Avatar, IconButton, Card, Tooltip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ThumbUpOffAlt, Share, AddComment, Cancel, MoreVert, Update, Delete, CopyAll, ArrowRight, CopyAllOutlined, CopyAllTwoTone } from "@mui/icons-material"
import Highlight, { defaultProps } from "prism-react-renderer";
import { useState, useEffect, useNavigate } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Like } from "../../utils";
import { useStateContext } from "../../contexts/ContextProvider"
import { updateCode, deleteCode, getCodes, commentCode, likeCode } from "../../actions/code"

const CodeBlock = ({ index, type, title, code, tags, codeBlock, description, id, comments }) => {

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [comment, setComment] = useState('')
    const [copiedText, setCopiedText] = useState('')
    const [commentsArr, setCommentsArr] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [openCodeMenu, setOpenCodeMenu] = useState(false)
    const [openCode, setOpenCode] = useState(index < 10 ? true : false)
    const { codeState, setCodeState } = useStateContext()
    const [likes, setLikes] = useState(codeBlock?.likes)  // code is comming from Codes.js as prop

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const user = JSON.parse(localStorage.getItem('profile'))?.result
    const dispatch = useDispatch()
    const hasLikedCodeBlock = likes?.find((id) => id === user?._id)


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, comments: commentsArr } })
    }, [commentsArr])

    useEffect(() => {
        setOpenCode(!(codeState.expandAllCodes))
    }, [codeState.expandAllCodes])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const clearComment = () => {
        setComment("")
    }

    // 1)
    const handleComentClick = () => {
        dispatch(commentCode(id, { comment }))
        setCommentsArr([...commentsArr, comment])
        setShowComments(true)
        clearComment()
    }

    // 1)
    const handleOpenCodeMenu = () => {
        setOpenCode(true)
        setOpenCodeMenu((prev) => !prev)
    }

    // 1)
    const handleUpdateButtonClick = () => {
        setOpenCodeMenu(false)
        setCodeState({ ...codeState, codeBlockData: { title, description, code, tags, type }, openCodeModalForUpdate: true, currentId: id })
    }

    // 1)
    const handleDeleteCode = () => {
        dispatch(deleteCode(id))
        dispatch(getCodes())
        setOpenCodeMenu(false)
    }

    // 1)
    const handleOpenCode = () => {
        setOpenCode(!openCode)
        setOpenCodeMenu(false)
    }

    // 1)
    const handleCopy = (text) => {
        setCopiedText(text)
    }


    // 1)
    const handleLikeClick = () => {         // jo kam backend pe kia h whi frontend pe again kia h is se speed me azafa hota h
        dispatch(likeCode(id))
        if (hasLikedCodeBlock) {
            setLikes(likes.filter((id) => id !== user?._id))
        } else {
            setLikes([...likes, user?._id])
        }
    }


    /////////////////////////////////////////////////////////////// Actual Component ////////////////////////////////////////////////////////////////////////
    return (

        <div name={id} className={`my-8 ${index == 0 && 'mt-2'} relative border-[2px] rounded-[5px] border-gray-400 `} >

            <div style={{ top: '-28px', left: '-2px' }} className="absolute top-[-28px] left-[-2px] flex gap-2 items-center justify-between rounded-[5px] rounded-b-none rounded-t-[5px] w-[5rem] h-[2rem] py-[3px] px-[7px] bg-gray-400 text-gray-300 " >
                <span className="" >{type}</span>
            </div>

            <div style={{ background: '#202124' }} className="relative flex justify-between items-center rounded-[2px] bg-gray-900 px-[12px]  pb-0 " >
                {/* title */}
                <h4 onClick={handleOpenCode} className={`capitalize ${'text-[20px]'} w-[90%] text-gray-400 font-semibold py-[14px] bg-orange cursor-pointer `} >{title}</h4>
                <IconButton onClick={() => { }} style={{ position: 'absolute' }} className={`${openCode && 'rotate-90'} absolute top-[50%] left-0 tranform translate-x-[-90%]  translate-y-[-50%] `} ><ArrowRight style={{ fontSize: '40px' }} className=" text-[40px] " /></IconButton>
                <IconButton onClick={handleOpenCodeMenu} className="" > <MoreVert className="text-gray-400" /> </IconButton>

                {
                    openCodeMenu &&
                    <Card style={{ background: '#847ccb', color: '#fff' }} className="absolute z-50 bg-gray-900 text-gray-300 w-[8rem] right-[2rem] top-[3rem] p-2  shadow-2xl items-start justify-center h-auto flex flex-col gap-[2px]  border-[2px] border-gray-400  " >
                        <button onClick={handleUpdateButtonClick} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 hover:bg-gray-400 " ><Update /> <span className="" >Update</span> </button>
                        <button onClick={handleDeleteCode} className="w-full flex hover:bg-gray-light p-[6px] rounded-[6px] gap-2 hover:bg-gray-400 " ><Delete /> <span className="" >Delete</span> </button>
                    </Card>
                }
            </div>


            {
                openCode &&
                <div className="flex flex-col p-[10px] " >

                    {/* description */}
                    <p className=" text-text-gray-200 mt-[4px] mb-[8px] " >{description}</p>

                    {/* tags */}
                    <div className="flex gap-2 my-[5px] " >
                        {
                            tags.map((tag, index) => (
                                <p className="text-text-gray-300 hover:text-gray-400 hover:underline cursor-pointer  text-[15px] " key={index} >#{tag}</p>
                            ))
                        }
                    </div>

                    {/* code */}
                    <div className="relative  "  >
                        <Highlight {...defaultProps} code={code} language="jsx">
                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre className={`${className} code_highlight px-[12px] py-[15px] rounded-[5px] max-h-[24rem] max-w-full overflow-scroll `} style={style}>
                                    {copiedText == code
                                        ?
                                        <Tooltip title="Copied" placement="top" >
                                            <IconButton onClick={() => handleCopy(code)} style={{ position: 'absolute', zIndex: '50' }} className="z-5 absolute top-[10px] right-[10px] flex gap-[4px] py-[2px] px-[5px] bg-gray-400 rounded-[20px] " >
                                                <CopyAllTwoTone className="text-gray-300" />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Copy" placement="top" >
                                            <IconButton onClick={() => handleCopy(code)} style={{ position: 'absolute', zIndex: '50' }} className="z-5 absolute top-[10px] right-[10px] flex gap-[4px] py-[2px] px-[5px] bg-gray-400 rounded-[20px] " >
                                                <CopyAllOutlined className="text-gray-300" />
                                            </IconButton>
                                        </Tooltip>
                                    }

                                    {tokens.map((line, i) => (
                                        <div {...getLineProps({ line, key: i })}>
                                            {line.map((token, key) => (
                                                <span {...getTokenProps({ token, key })} />
                                            ))}
                                        </div>
                                    ))}

                                </pre>
                            )}
                        </Highlight>
                    </div>

                    {/* buttons */}
                    <div className="flex justify-between items-center gap-[16px] mb-2 my-[5px] ">
                        <span className="flex gap-[16px] " >
                            <Tooltip title="Share" placement="top" >
                                <button><Share className="text-gray-400" /></button>
                            </Tooltip>
                            <span className="w-full flex items-center "  >
                                <Tooltip title="Like" placement="top" >
                                    <button disabled={!user} onClick={handleLikeClick} >
                                        <Like likes={likes} />
                                    </button>
                                </Tooltip>
                            </span>
                        </span>
                        <Tooltip title="Comment" placement="top" >
                            <button onClick={() => setShowComments((prev) => !prev)} ><AddComment className="text-gray-400" /></button>
                        </Tooltip>
                    </div>

                    {
                        showComments &&
                        <>
                            {/* comment input  */}
                            <div className="flex  justify-between items-start gap-4  mb-4 ">
                                <Avatar style={{ background: '#423e65' }} className="bg-gray-400 capitalize " >{user.firstName.charAt(0) || 'E'}</Avatar>
                                <div style={{ gap: '6px' }} className=" flex flex-col gap-[6px] text-[13px] w-full " >
                                    <div className="flex items-center " >
                                        <textarea
                                            className=" w-full bg-transparent focus:outline-none border-b-[2px] border-gray-400 "
                                            style={{ borderBottom: '2px solid' }}
                                            multiple name="comment"
                                            placeholder="Leave a comment..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-between w-full " >
                                        <div></div>
                                        <div className="flex gap-4 " >
                                            <button onClick={clearComment} className="text-gray-400 border-[1px] border-gray-400 text-[10px] rounded-[1rem] p-[5px] px-[3px] " >Cancel</button>
                                            <button disabled={comment.length == 0} onClick={handleComentClick} className="bg-gray-400 text-gray-300 px-[3px] p-[5px] rounded-[1rem] text-[11px] " >Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* list of commments */}
                            <div className="flex gap-4 max-h-[50vh] overflow-y-scroll flex-col mt-4 " >
                                {
                                    comments?.map((com, i) => (
                                        <div className="flex items-start justify-start gap-4 " key={i} >
                                            <div className="  min-h-10 h-10 " >
                                                <Avatar style={{ background: '#423e65' }} className="bg-gray-400" >G</Avatar>
                                            </div>
                                            <div className="h-full min-h-[2.5rem] flex justify-center items-center " >
                                                <p className="text-gray-400 capitalize ">{com}</p>    {/* comment */}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }

                </div>
            }


        </div >

    )
}

export default CodeBlock;