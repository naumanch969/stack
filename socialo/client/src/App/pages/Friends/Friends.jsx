import { PageHeading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import AccountCard from './AccountCard'

const Friends = ({ friends }) => {
    const { userState, setUserState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    // const friends = userState.user.friends

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-[1rem] p-[1rem] " >
            {
                Boolean(friends.length)
                    ?
                    <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                        <PageHeading heading='Your Friends' />
                        <div className='w-full flex flex-col gap-[12px]  ' >
                            {
                                friends.map((friend, index) => (
                                    <>
                                        <AccountCard account={friend} key={index} type='friend' />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className=" " >
                        <p className="text-center font-semibold text-text-gray md:px-[5rem] text-[20px] " >No friend to show</p>
                    </div>
            }
        </div>
    )
}

export default Friends;