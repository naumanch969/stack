import { loginImage } from '../../assets'
import { useStateContext } from '../../contexts/ContextProvider'


const Rightbar = () => {

    const { isDarkMode } = useStateContext()

    return (
        <div style={{ height: 'calc(100vh - 50px)' }} className='rightBar sticky top-[50px] overflow-y-scroll flex-[3] ' >

            <div className='container p-[20px] flex flex-col gap-[20px] ' >

                <div style={{ boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.09)' }} className='item p-[20px] ' >
                    <span className={`text-text-color ${isDarkMode && 'text-text-color-dark'} `} >Suggestion For You</span>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                        <div className='buttons flex items-center gap-[10px]'>
                            <button className='border-none p-[5px] text-white bg-blue-500 ' >Follow</button>
                            <button className='border-none p-[5px] text-white bg-red-500 ' >Dismis</button>
                        </div>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                        <div className='buttons flex items-center gap-[10px]'>
                            <button className='border-none p-[5px] text-white bg-blue-500 ' >Follow</button>
                            <button className='border-none p-[5px] text-white bg-red-500 ' >Dismis</button>
                        </div>
                    </div>
                </div>

                <div style={{ boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.09)' }} className='item p-[20px] ' >
                    <span className={`text-text-color ${isDarkMode && 'text-text-color-dark'}  `} >Latest Activities</span>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                        <span className='' >1 min ago</span>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                        <span className='' >1 min ago</span>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                        <span className='' >1 min ago</span>
                    </div>
                </div>

                <div style={{ boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.09)' }} className='item p-[20px] ' >
                    <span className={`text-text-color ${isDarkMode && ' text-text-color-dark'}  `} >Online Friends</span>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo relative flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <div className='online w-[12px] h-[12px] rounded-full bg-green-500 absolute top-0 left-[40px]  ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo relative flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <div className='online w-[12px] h-[12px] rounded-full bg-green-500 absolute top-0 left-[40px]  ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo relative flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <div className='online w-[12px] h-[12px] rounded-full bg-green-500 absolute top-0 left-[40px]  ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                    </div>
                    <div className='user flex items-center justify-between my-[20px] ' >
                        <div className='userInfo relative flex items-center gap-[20px] ' >
                            <img src={loginImage} alt='image' className='w-[40px] h-[40px] rounded-full object-cover ' />
                            <div className='online w-[12px] h-[12px] rounded-full bg-green-500 absolute top-0 left-[40px]  ' />
                            <span className='font-medium text-black ' >Hamza Ali</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default Rightbar;