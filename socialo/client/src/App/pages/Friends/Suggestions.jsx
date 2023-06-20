import { PageHeading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import AccountCard from './AccountCard'

const Suggestions = ({ suggestedUsers }) => {
    const { userState, setUserState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-[1rem] p-[1rem] " >
            {
                Boolean(suggestedUsers.length)
                    ?
                    <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                        <PageHeading heading='Suggested to you' />
                        <div className='w-full flex flex-col gap-[12px]  ' >
                            {
                                suggestedUsers.map((friend, index) => (
                                    <AccountCard account={friend} key={index} type='send' />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className=" " >
                        <p className="text-center font-semibold text-text-gray md:px-[5rem] text-[20px] " >No suggestion to show</p>
                    </div>
            }
        </div>
    )
}

export default Suggestions;