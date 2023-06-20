import { useStateContext } from '../../../contexts/ContextProvider'
import AccountCard from './AccountCard'
import { PageHeading } from '../../../utils/Components'

const Requests = ({ friendRequests }) => {
    const { userState, setUserState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-[1rem] p-[1rem] " >
            {
                Boolean(friendRequests.length)
                    ?
                    <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                        <PageHeading heading='Your requests' />
                        <div className='w-full flex flex-col gap-[12px]  ' >
                            {
                                friendRequests.map((friend, index) => (
                                    <AccountCard account={friend} key={index} type='request' />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className="w-full h-full flex justify-center items-center " >
                        <p className="text-center font-semibold text-text-gray md:px-[5rem] text-[20px] " > When someone send you friend requests, they will appear here </p>
                    </div>
            }
        </div>
    )
}

export default Requests;