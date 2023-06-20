import { useParams } from "react-router-dom"
import { useStateContext } from "../../../contexts/ContextProvider"
import AccountCard from "./AccountCard"


const Home = ({ sentRequests, friendRequests, suggestedUsers, otherUsers }) => {

    const { userState, setUserState } = useStateContext()
    //////////////////////////// VARIABLES ////////////////////////////////////

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-[1rem] p-[1rem] " >
            {
                Boolean(friendRequests.length)
                &&
                <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                    <h2 className='font-bold text-purple-500 text-[24px] capitalize ' >Friend Requests</h2>
                    <div className='w-full flex flex-col gap-[12px]  ' >
                        {
                            friendRequests.map((account, index) => (
                                <AccountCard account={account} key={index} type='request' />
                            ))
                        }
                    </div>
                </div>
            }
            {
                Boolean(sentRequests.length)
                &&
                <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                    <h2 className='font-bold text-purple-500 text-[24px] capitalize ' >Sent Requests</h2>
                    <div className='w-full flex flex-col gap-[12px]  ' >
                        {
                            sentRequests.map((account, index) => (
                                <AccountCard account={account} key={index} type='send' />
                            ))
                        }
                    </div>
                </div>
            }
            {
                Boolean(suggestedUsers.length)
                &&
                <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                    <h2 className='font-bold text-purple-500 text-[24px] capitalize ' >Suggested for you</h2>
                    <div className='w-full flex flex-col gap-[12px]  ' >
                        {
                            suggestedUsers.map((account, index) => (
                                <AccountCard account={account} key={index} type='send' />
                            ))
                        }
                    </div>
                </div>
            }
            {
                Boolean(otherUsers.length)
                &&
                <div className='w-full flex flex-col gap-[1rem] px-[1rem] '  >
                    <h2 className='font-bold text-purple-500 text-[24px] capitalize ' >Others</h2>
                    <div className='w-full flex flex-col gap-[12px]  ' >
                        {
                            otherUsers.map((account, index) => (
                                <AccountCard account={account} key={index} type='send' />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export default Home