import { useStateContext } from '../../contexts/ContextProvider'


const Home = () => {

    const { isDarkMode } = useStateContext()


    return (
        <div className={`bg-bg-soft ${isDarkMode && ' bg-bg-soft-dark'}  py-[20px] px-[70px] `} >

        </div>
    )
}


export default Home;