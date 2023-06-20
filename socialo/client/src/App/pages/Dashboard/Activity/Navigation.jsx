import { TableRows, GridViewRounded } from "@mui/icons-material"
import { useStateContext } from "../../../../contexts/ContextProvider"


const Navigation = () => {

    //////////////////////////// VARIABLES ////////////////////////////////////


    //////////////////////////// STATES ////////////////////////////////////
    const { activityState, setActivityState, showActivityForm, setShowActivityForm } = useStateContext()

    //////////////////////////// USE EFFECTS ////////////////////////////////////


    //////////////////////////// FUNCTIONS ////////////////////////////////////
    const todayClick = () => {
        setActivityState({
            ...activityState,
            activityData: activityState.activityArr[0]
        })
        setShowActivityForm(true)
    }

    return (
        <div className="flex justify-between items-center pb-[10px] " >

            <div className="flex items-center gap-[20px] border-b-[1px] border-purple-800 w-full " >
                <button className={`font-medium text-[18px] ${showActivityForm && 'text-purple-100 border-b-purple-300 border-b-[1px] '} hover:text-purple-100 text-purple-300 `} onClick={() => todayClick()} >Today</button>
                <button className={`font-medium text-[18px] ${!showActivityForm && 'text-purple-100 border-b-purple-300 border-b-[1px] '} hover:text-purple-100 text-purple-300 `} onClick={() => setShowActivityForm(false)} >Activities</button>
            </div>

        </div>
    )
}


export default Navigation
