import CodeForm from "./CodeForm";
import Codes from "./Codes";
import { useParams } from "react-router-dom"
import { Button, IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline, Cancel, Compress, Expand, GridViewRounded, TableRows, ArrowCircleUp } from "@mui/icons-material";

import { START_LOADING, END_LOADING } from "../../constants";
import { Heading } from "../../utils";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const CodePage = () => {
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { folder, file } = useParams()
    const [tags, setTags] = useState([])
    const { codeState, setCodeState, setFolderState, folderState } = useStateContext()

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const handleChangeRadio = (e) => {
        dispatch({ type: START_LOADING })

        setTimeout(() => {
            setCodeState({ ...codeState, showCodes: e.target.value })
            dispatch({ type: END_LOADING })
        }, 600);
    }


    // 1)
    const handleExpand = () => {
        setCodeState({ ...codeState, expandAllCodes: true })
    }

    // 2)
    const handleDeExpand = () => {
        setCodeState({ ...codeState, expandAllCodes: false })
    }



    /////////////////////////////////////////////////////////////// Actual Component ////////////////////////////////////////////////////////////////////////
    return (
        <div className="flex flex-col " >

            {/* heading */}
            <div className="mb-4 h-[86px] flex justify-between items-center " >
                <Heading file={file} folder={folder} parentFolder='code' />
                <form className="flex gap-[16px] items-center cursor-pointer text-text-gray-200 hover:text-text-gray-100  " >
                    <span className="flex gap-[4px]" >
                        <input type="radio" name="radio" value='all' id="all" className="cursor-pointer" onChange={handleChangeRadio} defaultChecked />
                        <label htmlFor="all" className="cursor-pointer">All</label>
                    </span>

                    <span className="flex gap-[4px]" >
                        <input type="radio" name="radio" value='public' id="public" className="cursor-pointer" onChange={handleChangeRadio} />
                        <label htmlFor="public" className="cursor-pointer" >Public</label>
                    </span>

                    <span className="flex gap-[4px]" >
                        <input type="radio" name="radio" value='private' id="private" className="cursor-pointer" onChange={handleChangeRadio} />
                        <label htmlFor="private" className="cursor-pointer" >Private</label>
                    </span>
                </form >
            </div >

            {/* form - for creating post/code */}
            < CodeForm />

            {/* icons - options like expand deExpand gridView tableView */}
            <div className="flex justify-end items-center  " >
                <Tooltip title="Expand All" placement="top" >
                    <IconButton onClick={handleDeExpand} >
                        <Expand className="text-gray-400  " />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Close All" placement="top" >
                    <IconButton onClick={handleExpand} >
                        <Compress className="text-gray-400  " />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Tabular View" placement="top" >
                    <IconButton onClick={() => { }} >
                        <TableRows className="text-gray-400  " />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Grid View" placement="top" >
                    <IconButton onClick={() => { }} >
                        <GridViewRounded className="text-gray-400  " />
                    </IconButton>
                </Tooltip>
            </div >


            <div className="mt-[-10px] " >
                <p className="text-[24px] font-medium text-text-gray-200 pb-[5px] " >No. of posts: <span>{codeState.codesLength}</span>  </p>
            </div>

            {/* all code posts */}
            < Codes />

        </div >
    )

}

export default CodePage;