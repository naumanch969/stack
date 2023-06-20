import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationItem, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"


import Code from "./CodeBlock";
import { getCodes } from "../../actions/code"
import { useStateContext } from "../../contexts/ContextProvider";

const Codes = () => {
    const { result, isLoading, isError, error } = useSelector((state) => state.code)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const { codeState, setCodeState } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const codesPerPage = codeState.codesPerPage
    const totalDocs = codeState.codesLength
    const currentPage = codeState.currentPage || 1
    const numberOfPages = Math.ceil(totalDocs / codesPerPage) || 1
    const startingPoint = (codeState.currentPage * codesPerPage) - codesPerPage
    const endPoint = (codeState.currentPage * codesPerPage)

    /////////////////////////////////////////////////////////////// useEffects //////////////////////////////////////////////////////////////////////////
    // 1)
    useEffect(() => {
        dispatch(getCodes())
    }, [])

    // 2)
    useEffect(() => {
        setCodeState({ ...codeState, codesArr: result })
    }, [result])

    // 3)
    useEffect(() => {
        setCodeState({ ...codeState, codesLength: codeState.codesArr?.length })
    }, [codeState.codesArr])

    // 4)
    useEffect(() => {
        codeState.showCodes == 'all'
            ?
            setCodeState({ ...codeState, codesArr: result })
            :
            setCodeState({ ...codeState, codesArr: result.filter((code) => code.type == codeState.showCodes) })
    }, [codeState.showCodes])

    /////////////////////////////////////////////////////////////// functions //////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// Actual Component //////////////////////////////////////////////////////////////////////////
    return (
        <div className="pt-4 pb-8 " >
            {/* {console.log('error', error)} */}
            {
                isLoading
                    ?
                    <div className="flex justify-center " >
                        <CircularProgress style={{ color: '#202124', width: '50px', height: '50px' }} className="w-[50px] h-[50px] color-gray-900 " />
                    </div>
                    :
                    <>

                        {
                            isError
                                ?
                                <p style={{ textAlign: 'center' }} className=" text-red-900 text-center w-full text-[20px] " >Unfortunately, Some error occured. {error.message} </p>
                                :
                                <>

                                    {/* pagination component */}
                                    <Pagination
                                        count={numberOfPages}
                                        page={currentPage}
                                        variant="outlined"
                                        className="mb-[38px] flex justify-center "
                                        renderItem={(item) => (
                                            <PaginationItem {...item} component={Link} onClick={() => setCodeState({ ...codeState, currentPage: item.page })} to={`${window.location.pathname}?page=${item.page}`} />
                                        )}
                                    />

                                    {/* all codes */}
                                    {/* code = code:"ddd"comments:[]description:"ddd"likes:[]tags:['d']title:"d"type:"public"__v:0_id:"63a8975f271d07f6c8cf4c0e"[[Prototype]]:Object */}
                                    <>
                                        {
                                            codeState.codesArr?.slice(startingPoint, endPoint).map((code, index) => (
                                                <Code
                                                    key={index}
                                                    index={index}
                                                    codeBlock={code}
                                                    type={code.type}
                                                    title={code.title}
                                                    description={code.description}
                                                    code={code.code}
                                                    tags={code.tags}
                                                    likes={code.likes}
                                                    comments={code.comments}
                                                    id={code._id}
                                                />
                                            ))
                                        }
                                    </>


                                </>

                        }

                    </>
            }

        </div >
    )
}

export default Codes


const codeArr = [

    {
        title: 'Changing the background of code block',
        description: 'It inlcude the changing of colour from tailwind css config file or over writing the formatting of material ui component. This formatting can be done by referring to the class name of that element.',
        code: ` {/* description input */}
                    <div className="relative   " >
                    </div>}`,
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'public',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    },
    {
        title: 'title',
        description: 'description',
        code: 'code',
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'private',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    },
    {
        title: 'Changing the background of code block',
        description: 'It inlcude the changing of colour from tailwind css config file or over writing the formatting of material ui component. This formatting can be done by referring to the class name of that element.',
        code: ` {/* description input */}
                    <div className="relative   " >
                    </div>}`,
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'public',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    },
    {
        title: 'title',
        description: 'description',
        code: 'code',
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'private',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    },

    {
        title: 'Changing the background of code block',
        description: 'It inlcude the changing of colour from tailwind css config file or over writing the formatting of material ui component. This formatting can be done by referring to the class name of that element.',
        code: ` {/* description input */}
                    <div className="relative   " >
                    </div>}`,
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'public',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    },
    {
        title: 'title',
        description: 'description',
        code: 'code',
        tags: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        type: 'private',
        comments: ['title', 'description', 'code', 'tags', 'comments', 'id'],
        id: 'id',
    }
]