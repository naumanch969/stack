import { useParams } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import { Heading } from "../../utils"



const DebatePage = () => {

    const { file, folder } = useParams()


    return (
        <div className="">

            <Heading file={file} folder={folder} parentFolder="Debate" />

            <h4 className="" >This is something to show on screen</h4>

        </div>
    )
}


export default DebatePage