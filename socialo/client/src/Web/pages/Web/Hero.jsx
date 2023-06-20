import { ArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

const Hero = () => {
    const { userState, setUserState } = useStateContext()
    //////////////////////////// VARIABLES ////////////////////////////////////
    const navigate = useNavigate()
    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////
    const getStarted = () => {
        userState.user
            ?
            navigate('/app')
            :
            navigate('/auth')
    }

    return (
        <div style={{ minHeight: 'calc(100vh-4rem)' }} className="min-h-[90vh] flex flex-col justify-center items-center gap-[2rem]  " >

            <div className="flex flex-col gap-[2rem] lg:w-[54rem] " >
                <h1 className="lg:text-[56px] md:text-[48px] text-purple-900 text-center font-extrabold  " >Maximize your productivity <br /> by organizing your day</h1>
                <p className="text-[24px] text-purple-800 text-center " >Memories are the treasures of our lives, let us keep them safe and share them with the world.</p>
            </div>

            <button onClick={() => getStarted()} className="text-[20px] text-purple-900 bg-purple-300 w-fit px-[16px] py-[8px] rounded-[4px] " ><span className="" >Let's get started</span></button>

        </div>
    )
}

export default Hero;