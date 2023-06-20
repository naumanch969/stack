import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import Sidebar from './Sidebar'
import FindFriends from './FindFriends'
import Suggestions from './Suggestions'
import Friends from './Friends'
import Home from './Home'
import Requests from './Requests'
import Account from './Account'

const FriendsPage = () => {
    const { showSidebar, showFriendSidebar, userState, setUserState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    let { selectedItem, accountId } = useParams()
    selectedItem = selectedItem || 'home'

    const friends = userState.usersArr.filter(user => (
        Boolean(userState.user.friends.find(friend => friend == user._id))
    ))
    const sentRequests = userState.usersArr.filter(account => (
        userState.user.sendRequests.find(request => request == account._id)
    ))
    const friendRequests = userState.usersArr.filter((account) => (
        userState.user.notifications.find(notification => (notification.receiverId == account._id
            &&
            notification.type == 'friend_request'))
    ))
    const suggestedUsers = userState.usersArr.filter((account) => (
        account._id != userState.user._id
        &&
        !Boolean(userState.user.friends.find(friendId => friendId == account._id))          // to remove the accounts which are already friend of current user
        &&
        !Boolean(userState.user.sendRequests.find(receiverId => receiverId == account._id))          // to remove the accounts which are already friend of current user
        &&
        !Boolean(userState.user.notifications.find(notification => notification.receiverId == account._id))          // to remove the accounts which are already friend of current user
    ))
    const otherUsers = userState.usersArr.filter((account) => (
        account._id != userState.user._id
        &&
        !Boolean(userState.user.friends.find(friendId => friendId == account._id))
        &&
        !Boolean(userState.user.sendRequests.find(receiverId => receiverId == account._id))          // to remove the accounts which are already friend of current user
    ))

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <>

            <div style={{ height: 'calc(100vh - 4rem) ' }} className={`
            ${showSidebar ? `${showFriendSidebar ? 'lg:w-[20%] md:w-[25%]' : 'lg:w-[25%] md:w-[30%]'}` : `${showFriendSidebar ? 'lg:w-[25%] md:w-[30%]' : 'lg:w-[5%] md:w-[6%]'}`} 
             sticky top-[4rem] h-full bg-white transition-all`}>
                <Sidebar selectedItem={selectedItem} />
            </div>

            <div className={`${showSidebar ? `${showFriendSidebar ? 'lg:w-[60%] md:w-[50%]' : 'lg:w-[70%] md:w-[64%]'}` : `${showFriendSidebar ? 'lg:w-[70%] md:w-[64%]' : 'lg:w-[90%] md:w-[88%]'}`} h-full flex justify-center overflow-y-scroll pb-[2rem] `} >
                {
                    accountId
                        ?
                        <Account />
                        :
                        <>
                            {
                                selectedItem == 'home' && <Home sentRequests={sentRequests} friendRequests={friendRequests} suggestedUsers={suggestedUsers} otherUsers={otherUsers} />
                            }
                            {
                                selectedItem == 'friends' && <Friends friends={friends} />
                            }
                            {
                                selectedItem == 'suggestions' && <Suggestions suggestedUsers={suggestedUsers} />
                            }
                            {
                                selectedItem == 'requests' && <Requests friendRequests={friendRequests} />
                            }
                            {
                                selectedItem == 'search' && <FindFriends otherUsers={otherUsers} />
                            }
                        </>
                }
            </div>
        </>
    )
}

export default FriendsPage;