import Activity from "./Activity"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useStateContext } from "../../contexts/ContextProvider"

const Activities = () => {
    const { activityState, setActivityState } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////////

    return (

        <div className={`flex justify-between flex-wrap  `} >
            {
                activityState.activityArr.slice(1).map((activity, index) => (
                    <Activity
                        key={index}
                        activity={activity.activity}
                        date={activity.date}
                        bg={activity.bg}
                        id={activity._id}
                    />
                ))
            }
            {
                activityState.activitiesLength < 2 &&                       // eiter 0 or 1
                <div className="flex justify-center items-center  " >
                    <h5 className={`my-[80px] text-center text-[26px] font-medium text-gray-300 `} > Your Activity of each day will be shown here</h5>
                </div>
            }
        </div>
    )
}


export default Activities 