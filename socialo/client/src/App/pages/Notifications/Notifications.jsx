import { useStateContext } from '../../../contexts/ContextProvider'
import { useEffect } from 'react'
import { PageHeading, Avatar } from '../../../utils/Components'
import { Link } from 'react-router-dom'

const Notifications = () => {
    const { userState, setUserState, showSidebar, setShowSidebar } = useStateContext()
    ////////////////////////// VARIABLES //////////////////////////////////

    ////////////////////////// STATES /////////////////////////////////////

    ////////////////////////// USE EFFECTS ////////////////////////////////
    useEffect(() => {
        setShowSidebar(true)
    }, [])
    ////////////////////////// FUNCTIONS ///////////////////////////////////
    const findUser = (id) => {
        return userState.usersArr?.find(user => user._id == id)
    }


    return (
        <div className={`w-full p-[1rem] ${showSidebar ? 'lg:w-[80%] md:w-[75%]' : 'lg:w-[95%] md:w-[94%] '} px-[3rem] `} >

            <PageHeading heading="Notifications" />

            <div className=" " >
                {
                    userState.user.notifications.map((notification, index) => (

                        <div key={index} className="bg-white px-[1rem] py-[8px] flex justify-between items-center hover:bg-gray-100 rounded-[8px] cursor-default  " >
                            <Link to={`/app/friends/${notification}`} className="flex justify-start items-center gap-[1rem] " >
                                <Avatar className={{ container: "w-[4rem] h-[4rem] ", child: ' text-gray-500 ' }} />
                                <div className="flex flex-col justify-start " >
                                    <p className="text-[18px] font-semibold text-purple-900 capitalize hover:underline cursor-pointer " >{findUser(notification.receiverId)?.name}</p>
                                    <p className="text-[14px] text-text-gray " >{notification.content}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default Notifications;