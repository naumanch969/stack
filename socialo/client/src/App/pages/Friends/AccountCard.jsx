import { Avatar } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useState, useEffect } from 'react'
import { sendFriendRequest, removeFriendRequest, acceptFriendRequest } from '../../../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const AccountCard = ({ account, type }) => {
    const { userState, setUserState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    const { selectedItem } = useParams()
    const dispatch = useDispatch()

    //////////////////////////// STATES ///////////////////////////////////////
    const [showButton, setShowButton] = useState(false)

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////
    const sendRequest = () => {
        const content = `${account?.name || account?.userName} send you a friend request`
        const type = 'friend_request'
        userState.user.sendRequests = userState.user.sendRequests.concat(account?._id)
        setUserState({ ...userState })
        dispatch(sendFriendRequest(account?._id, type, content, userState, setUserState))
    }
    const removeRequest = () => {
        userState.user.sendRequests = userState.user.sendRequests.filter(req => req != account?._id)
        dispatch(removeFriendRequest(account?._id, userState, setUserState))
    }
    const acceptRequest = () => {
        userState.user.friends = userState.user.friends.concat(account._id)
        account.friends = account.friends.concat(userState.user._id)
        dispatch(acceptFriendRequest(account?._id, userState, setUserState))
    }

    return (

        <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className="w-full bg-white px-[1rem] py-[8px] flex justify-between items-center hover:bg-gray-100 rounded-[8px] cursor-default  " >
            <Link to={`/app/friends/${selectedItem}/${account?._id}`} className="flex justify-start items-center gap-[1rem] " >
                <Avatar className={{ container: "w-[4rem] h-[4rem] ", child: ' text-gray-500 ' }} />
                <div className="flex flex-col justify-start " >
                    <p className="text-[18px] font-semibold text-purple-900 capitalize hover:underline cursor-pointer " >{account?.name}</p>
                    <p className="text-[14px] text-text-gray hover:underline cursor-pointer " >{account?.userName || 'userName'}</p>
                </div>
            </Link>
            <div className="" >
                {
                    type == 'send' && showButton &&
                    <>
                        {
                            Boolean(userState.user.sendRequests.find(req => req == account?._id))
                                ?
                                <button onClick={() => removeRequest()} className='py-[6px] px-[12px] rounded-[4px] bg-purple-500 text-white capitalize' >cancel</button>
                                :
                                <button onClick={() => sendRequest()} className='py-[6px] px-[12px] rounded-[4px] bg-purple-500 text-white capitalize' >Send Request</button>
                        }
                    </>
                }
                {
                    type == 'request' &&
                    <button onClick={() => acceptRequest()} className='py-[6px] px-[12px] rounded-[4px] bg-purple-500 text-white capitalize' >Accept</button>
                }
            </div>
        </div>

    )
}

export default AccountCard;