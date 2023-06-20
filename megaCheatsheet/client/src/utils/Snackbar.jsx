import { IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";

import { useStateContext } from "../contexts/ContextProvider"

const Snackbar = ({ text }) => {

    const { showSnackbar, setShowSnackbar } = useStateContext()


    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <div style={{ zIndex: '100', maxWidth: '22rem' }} className="fixed w-[22rem] max-w-[22rem ] min-h-[5rem] h-auto rounded-[4px] z-[100] bg-gray-400 bottom-[2rem] left-[50%] transform translate-x-[-50%] translate-y-[0%] " >
            <div className="relative  w-[22rem] max-w-[22rem ] min-h-[5rem] h-auto flex justify-center items-center px-[28px] " >
                <p className="text-left text-gray-300 " >{text}</p>
                <IconButton style={{ position: 'absolute' }} className="absolute top-0 right-0 " onClick={handleCloseSnackbar} > <Cancel style={{ fontSize: '16px' }} className="bg-gray-300 text-gray-400 text-[16px] rounded-full " /> </IconButton>
            </div>
        </div>

    )
}

export default Snackbar;