import { TableRows, GridViewRounded } from "@mui/icons-material"
import { useStateContext } from "../../contexts/ContextProvider"


const Navigation = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////////////////
    const { activityState, setActivityState, showActivityForm, setShowActivityForm } = useStateContext()

    /////////////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////////
    const todayClick = () => {
        setActivityState({
            ...activityState,
            activityData: activityState.activityArr[0]
        })
        setShowActivityForm(true)
    }

    return (
        <div className="flex justify-between items-center pb-[10px] " >

            <div style={{ gap: '20px' }} className="flex items-center gap-[20px] " >
                <button className={`font-medium ${showActivityForm && 'text-gray-100 border-b-gray-300 border-b-[1px] '} hover:text-gray-100 text-gray-300 `} onClick={() => todayClick()} >Today</button>
                <button className={`font-medium ${!showActivityForm && 'text-gray-100 border-b-gray-300 border-b-[1px] '} hover:text-gray-100 text-gray-300 `} onClick={() => setShowActivityForm(false)} >Activities</button>
                <button className={`font-medium ${showActivityForm && 'text-gray-100 border-b-gray-300 border-b-[1px] '} hover:text-gray-100 text-gray-300 `} onClick={() => setShowActivityForm(true)} >Today</button>
                <button className={`font-medium ${!showActivityForm && 'text-gray-100 border-b-gray-300 border-b-[1px] '} hover:text-gray-100 text-gray-300 `} onClick={() => setShowActivityForm(false)} >Activities</button>
            </div>



        </div>
    )
}


export default Navigation
