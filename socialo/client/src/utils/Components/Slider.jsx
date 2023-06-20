import { useStateContext } from "../../contexts/ContextProvider"
import { Loading } from './'
import FileBase64 from 'react-file-base64'
import { ArrowLeft, ArrowRight, Add, Close } from '@mui/icons-material'
import { useState, useEffect, useRef } from 'react'

const Slider = ({ images, state, setState, }) => {

    const { postState, setPostState } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const deleteImage = (img) => {
        postState.postData.images = images.filter(image => image != img)

        setPostState({ ...postState })
    }



    return (
        <div className="thin_horizontal_scrollbar relative h-full w-full flex justify-center overflow-x-scroll overflow-y-hidden " >
            {
                images.map((img, index) => (
                    <img key={index} src={img} alt="img" className="h-full  " />
                ))
            }
        </div>
    )
}
export default Slider;