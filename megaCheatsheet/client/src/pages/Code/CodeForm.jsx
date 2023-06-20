import { useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { Cancel, ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Modal, Snackbar, IconButton } from '@mui/material'
import { useStateContext } from "../../contexts/ContextProvider"
import { createCode, getCodes, updateCode } from "../../actions/code"



const CodeForm = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const initialIsProvidedState = { title: true, code: true, tags: true, description: true, type: true }
    const resetedCodeBlockData = { title: "", code: "", tags: [], description: "", type: 'public' }

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [tagValue, setTagValue] = useState('')
    const [accordionOfCreate, setAccordionOfCreate] = useState(false)
    const [accordionOfUpdate, setAccordionOfUpdate] = useState(false)
    const { codeState, setCodeState } = useStateContext()
    const [isProvided, setIsProvided] = useState(initialIsProvidedState)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const clear = () => {
        setCodeState({ ...codeState, codeBlockData: resetedCodeBlockData })
        console.log("there is something", { ...codeState, codeBlockData: resetedCodeBlockData })
    }

    // 2)
    const handleCreate = (e) => {
        e.preventDefault()
        if (codeState.codeBlockData.title.length == 0) {
            setIsProvided({ ...isProvided, title: false })
        }
        else if (codeState.codeBlockData.description.length == 0) {
            setIsProvided({ ...isProvided, description: false })
        }
        else if (codeState.codeBlockData.code.length == 0) {
            setIsProvided({ ...isProvided, code: false })
        }
        else if (codeState.codeBlockData.tags.length == 0) {
            setIsProvided({ ...isProvided, tags: false })
        }
        else {
            setIsProvided(initialIsProvidedState)
            dispatch(createCode(codeState.codeBlockData)).then(
                dispatch(getCodes())
            )
            clear()
            setTagValue('')
            setCodeState({ ...codeState, codesArr: codeState.codesArr.unshift(codeBlockData) })
        }
    }

    // 3)
    const handleUpdate = (e) => {
        e.preventDefault()
        if (codeState.codeBlockData.title.length == 0) {
            setIsProvided({ ...isProvided, title: false })
            console.log('title not provided')
        }
        else if (codeState.codeBlockData.description.length == 0) {
            setIsProvided({ ...isProvided, description: false })
            console.log('description not provided')
        }
        else if (codeState.codeBlockData.code.length == 0) {
            setIsProvided({ ...isProvided, code: false })
            console.log('code not provided')
        }
        else if (codeState.codeBlockData.tags.length == 0) {
            setIsProvided({ ...isProvided, tags: false })
            console.log('tag not provided')
        }
        else {
            setIsProvided(initialIsProvidedState)
            codeState.currentId &&
                dispatch(updateCode(codeState.currentId, codeState.codeBlockData)).then(
                    dispatch(getCodes())
                )
            handleModalClose()
            setCodeState({ ...codeState, openCodeModalForUpdate: false, codesArr: [...codeState.codesArr, codeState.codeBlockData] })
            setTagValue('')
            clear()
        }
    }

    // 4)
    const handleFilterTag = (tagToDelete) => {
        setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, tags: codeState.codeBlockData.tags.filter((tag) => tag !== tagToDelete) } })
    }

    // 5)
    const handleAddTag = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, tags: [...codeState.codeBlockData.tags, value] } })
        e.target.value = ""
        setTagValue('')
    }

    // 6)
    const handleChange = (e) => {
        e.target.value == 'tags'
            ?
            setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, [e.target.name]: e.target.value.split(',') } })
            :
            setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, [e.target.name]: e.target.value } })
    }

    // 7)
    const handleModalClose = () => {
        setCodeState({ ...codeState, codeBlockData: resetedCodeBlockData, openCodeModalForUpdate: false })
    }

    // 8)
    const handleChangeRadio = (e) => {
        setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, type: e.target.value } })
    }




    /////////////////////////////////////////////////////////////// Sub Component /////////////////////////////////////////////////////////////////////
    const Tag = ({ title }) => (
        <div className="flex gap-2 items-center justify-between rounded-[15px] py-[3px] px-[7px] bg-gray-900 " >
            <span className="" >{title}</span>
            <Cancel style={{ fontSize: '1rem' }} onClick={() => handleFilterTag(title)} className={`cursor-pointer text-black text-[1rem] bg-gray-900  rounded-full `} />
        </div>
    )

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    /////////////////////////////////////////////////////////////// Actual Component /////////////////////////////////////////////////////////////////////
    return (
        <div className=" w-full flex flex-col gap-4 p-[6px] mb-2 bg-gradient-to-tr from-gray-400 to-gray-900 rounded-[.5rem] " >

            {/* create code post form */}
            <Accordion open={codeState.openAccordionOfCreate} onChange={() => setCodeState({ ...codeState, openAccordionOfCreate: !(codeState.openAccordionOfCreate) })} >

                <AccordionSummary expandIcon={<ExpandMore className=" text-gray-400" />} >
                    <Typography className="text-gray-400" variant="h6">{"Create"} a Code Block</Typography>
                </AccordionSummary>

                <AccordionDetails className="w-full flex flex-col gap-4" >
                    {/* title input */}
                    <div className="relative   " >
                        <input
                            className="border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                            autocomplete='off'
                            name="title"
                            placeholder="Title"
                            value={codeState.codeBlockData.title}
                            onChange={handleChange}
                            onFocusCapture={() => console.log('title focus capture')}
                        />
                        <Cancel
                            style={{ display: `${codeState.codeBlockData.title.length == 0 ? 'none' : 'block'}`, fontSize: '16px' }}
                            onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, title: '' } })}
                            className={`${codeState.codeBlockData.title.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[50%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                        />
                        {codeState.codeBlockData.title.length == 0 && !(isProvided.title) &&
                            <p className=" text-red-900  " >Title must be provided.</p>
                        }
                    </div>

                    {/* description input */}
                    <div className="relative   " >
                        <input
                            className="border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                            autocomplete='off'
                            name="description"
                            placeholder="Description"
                            value={codeState.codeBlockData.description}
                            onChange={handleChange}
                        />
                        <Cancel
                            style={{ display: `${codeState.codeBlockData.description.length == 0 ? 'none' : 'block'}`, fontSize: '16px' }}
                            onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, description: '' } })}
                            className={`${codeState.codeBlockData.description.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[50%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                        />
                        {codeState.codeBlockData.description.length == 0 && !(isProvided.description) &&
                            <p className=" text-red-900  " >Description must be provided.</p>
                        }
                    </div>

                    {/* code input */}
                    <div className="relative   " >
                        <textarea
                            className="code_highlight overflow-x-scroll border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                            autocomplete='off'
                            name="code"
                            placeholder="Code"
                            value={codeState.codeBlockData.code}
                            onChange={handleChange}
                            rows={8}
                            cols={50}
                        />
                        <Cancel
                            style={{ display: `${codeState.codeBlockData.code.length == 0 ? 'none' : 'block'}`, top: '10%', fontSize: '16px' }}
                            onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, code: '' } })}
                            className={`${codeState.codeBlockData.code.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[10%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                        />
                        {codeState.codeBlockData.code.length == 0 && !(isProvided.code) &&
                            <p className=" text-red-900  " >Code must be provided.</p>
                        }
                    </div>

                    {/* tags input */}
                    <div className="relative flex flex-wrap gap-4 w-full h-full border-[1px] p-[14px] border-gray-400 rounded-[5px] " >
                        {
                            codeState.codeBlockData.tags.map((tag, index) => (
                                <Tag key={index} title={tag} />
                            ))
                        }
                        <input
                            className="  placeholder-gray-400  bg-transparent  w-full h-full text-gray-400 focus:outline-none "
                            placeholder="Tags - separated by enter"
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        {codeState.codeBlockData.tags.length == 0 && !(isProvided.tags) &&
                            <p className=" text-red-900  " >Tags must be provided.</p>
                        }
                    </div>

                    {/* type radio input */}
                    <div className="flex gap-4 w-full h-full px-[14px] py-[2px]  " >
                        <span className="flex gap-[4px]" >
                            <input type="radio" name="codeform_radio" value='public' id="codeform_create_public" className="cursor-pointer" onChange={handleChangeRadio} defaultChecked />
                            <label htmlFor="codeform_create_public" className="cursor-pointer text-[18px] font-medium " >Public</label>
                        </span>

                        <span className="flex gap-[4px]" >
                            <input type="radio" name="codeform_radio" value='private' id="codeform_create_private" className="cursor-pointer" onChange={handleChangeRadio} />
                            <label htmlFor="codeform_create_private" className="cursor-pointer text-[18px] font-medium " >Private</label>
                        </span>
                    </div>

                    {/* submit and clear button */}
                    <div className="flex gap-4 w-full justify-end items-center " >
                        <button className="w-[5rem] h-[2rem] rounded-[3rem] border-[1px] text-gray-400 border-gray-400 " variant="outlined" size='small' onClick={clear}  >
                            Clear
                        </button>
                        <button className="w-[6rem] h-[2rem] rounded-[3rem]  bg-gradient-to-tr from-gray-400 to-gray-900 text-gray-300 " variant="contained" size='large' type="submit" onClick={handleCreate} >
                            Create
                        </button>
                    </div>
                </AccordionDetails>

            </Accordion>







            {/* update code post form */}
            <Modal open={codeState.openCodeModalForUpdate} onClose={handleModalClose} >

                <div style={style} >
                    <Accordion defaultExpanded={true} open={codeState.openAccordionOfUpdate} onChange={() => setCodeState({ ...codeState, openAccordionOfUpdate: !(codeState.openAccordionOfUpdate) })} >

                        <AccordionSummary expandIcon={<ExpandMore />} >
                            <Typography className="text-gray-400" variant="h6">{"Update"} a Code Block</Typography>
                        </AccordionSummary>

                        <AccordionDetails className=" thinScrollbar w-full flex flex-col gap-4 max-h-[24rem] overflow-y-scroll " >
                            {/* title input */}
                            <div className="relative   " >
                                <input
                                    className="border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                                    autocomplete='off'
                                    name="title"
                                    placeholder="Title"
                                    value={codeState.codeBlockData.title}
                                    onChange={handleChange}
                                />
                                <Cancel
                                    style={{ display: `${codeState.codeBlockData.title.length == 0 ? 'none' : 'block'}`, fontSize: '16px' }}
                                    onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, title: '' } })}
                                    className={`${codeState.codeBlockData.title.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[50%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                                />
                            </div>

                            {/* description input */}
                            <div className="relative   " >
                                <input
                                    className="border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                                    autocomplete='off'
                                    name="description"
                                    placeholder="Description"
                                    value={codeState.codeBlockData.description}
                                    onChange={handleChange}
                                />
                                <Cancel
                                    style={{ display: `${codeState.codeBlockData.description.length == 0 ? 'none' : 'block'}`, fontSize: '16px' }}
                                    onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, description: '' } })}
                                    className={`${codeState.codeBlockData.description.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[50%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                                />
                            </div>

                            {/* code input */}
                            <div className="relative   " >
                                <textarea
                                    className="code_highlight overflow-x-scroll border-[1px] p-[14px] rounded-[5px] placeholder-gray-400 w-full bg-transparent border-gray-400 text-gray-400 focus:outline-none "
                                    autocomplete='off'
                                    name="code"
                                    placeholder="Code"
                                    value={codeState.codeBlockData.code}
                                    onChange={handleChange}
                                    rows={8}
                                />
                                <Cancel
                                    style={{ display: `${codeState.codeBlockData.code.length == 0 ? 'none' : 'block'}`, fontSize: '16px' }}
                                    onClick={() => setCodeState({ ...codeState, codeBlockData: { ...codeState.codeBlockData, code: '' } })}
                                    className={`${codeState.codeBlockData.code.length == 0 ? 'none' : 'block'} transform translate-x-[0%] translate-y-[-50%] absolute right-[2%] top-[10%]  h-full cursor-pointer text-gray-400 text-[16px] w-[3rem] bg-gray-900 rounded-full `}
                                />
                            </div>

                            {/* tags input */}
                            <div className="relative flex flex-wrap gap-4 w-full h-full border-[1px] p-[14px] border-gray-400 rounded-[5px] " >
                                {
                                    codeState.codeBlockData?.tags?.map((tag, index) => (
                                        <Tag key={index} title={tag} />
                                    ))
                                }
                                <input
                                    className="  placeholder-gray-400  bg-transparent w-full h-full text-gray-400 focus:outline-none "
                                    placeholder="Tags - separated by enter"
                                    value={tagValue}
                                    onChange={(e) => setTagValue(e.target.value)}
                                    onKeyDown={handleAddTag}
                                />
                            </div>


                            {/* type radio input */}
                            <div className="flex gap-4 w-full h-full px-[14px] py-[2px]  " >
                                <span className="flex gap-[4px]" >
                                    <input type="radio" name="codeform_radio" value='public' id="codeform_update_public" className="cursor-pointer" onChange={handleChangeRadio} defaultChecked />
                                    <label htmlFor="codeform_update_public" className="cursor-pointer text-[18px] font-medium " >Public</label>
                                </span>

                                <span className="flex gap-[4px]" >
                                    <input type="radio" name="codeform_radio" value='private' id="codeform_update_private" className="cursor-pointer" onChange={handleChangeRadio} />
                                    <label htmlFor="codeform_update_private" className="cursor-pointer text-[18px] font-medium " >Private</label>
                                </span>
                            </div>


                            {/* submit and clear button */}
                            <div className="flex gap-4 w-full justify-end items-center " >
                                <button className="w-[5rem] h-[2rem] rounded-[3rem] border-[1px] text-gray-400 border-gray-400 " variant="outlined" size='small' onClick={clear}  >
                                    Clear
                                </button>
                                <button className="w-[6rem] h-[2rem] rounded-[3rem]  bg-gradient-to-tr from-gray-400 to-gray-900 text-gray-300 " variant="contained" size='large' type="submit" onClick={handleUpdate} >
                                    Update
                                </button>
                            </div>
                        </AccordionDetails>

                    </Accordion>
                </div>

            </Modal>

        </div>
    )
}

export default CodeForm;
