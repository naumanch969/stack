import { loginImage } from '../../assets'
import { useStateContext } from '../../contexts/ContextProvider'


const Leftbar = () => {

    const { isDarkMode } = useStateContext()


    return (
        <div style={{ height: 'calc(100vh - 50px)' }} className='leftBar sticky top-[50px] overflow-y-scroll flex-[2] ' >
            <div className='container p-[20px] ' >
                <div className='menu flex flex-col gap-[10px] ' >
                    {
                        menu1Arr.map((item, index) => (
                            <div key={index} className='flex items-center gap-[12px] ' >
                                <img src={item.img} alt='image' className='w-[30px] h-[30px] rounded-full object-cover ' />
                                <span className='text-[14px] ' >{item.title}</span>
                            </div>
                        ))
                    }
                </div>
                <hr className={`my-[20px] border-none h-[1px] bg-bg-soft ${isDarkMode && 'bg-bg-soft-dark'} `} />
                <div className='menu flex flex-col gap-[10px] ' >
                    <span className='text-[12px] ' >Your Shortcuts</span>
                    {
                        menu2Arr.map((item, index) => (
                            <div key={index} className='flex items-center gap-[12px] ' >
                                <img src={item.img} alt='image' className='w-[30px] h-[30px] rounded-full object-cover ' />
                                <span className='text-[14px] ' >{item.title}</span>
                            </div>
                        ))
                    }
                </div>
                <hr className={`my-[20px] border-none h-[1px] bg-bg-soft ${isDarkMode && 'bg-bg-soft-dark'} `} />
                <div className='menu flex flex-col gap-[10px] ' >
                    <span className='' >Others</span>
                    {
                        menu3Arr.map((item, index) => (
                            <div key={index} className='flex items-center gap-[12px] ' >
                                <img src={item.img} alt='image' className='w-[30px] h-[30px] rounded-full object-cover ' />
                                <span className='text-[14px] ' >{item.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Leftbar;


//  <div className='user flex items-center gap-[10px] ' >
//                         <img src={loginImage} alt='user' className='w-[30px] h-[30px] rounded-full object-cover ' />
//                         <span className='text-[14px] ' >Hamza Ali</span>
//                     </div>
//                     <div className='item flex items-center gap-[10px] ' >
//                         <img src={loginImage} alt='image' className='w-[30px] ' />
//                         <span className='text-[14px] ' >Friends</span>
//                     </div>




const menu1Arr = [
    {
        img: loginImage,
        title: 'User'
    },
    {
        img: loginImage,
        title: 'Friends'
    },
    {
        img: loginImage,
        title: 'Groups'
    },
    {
        img: loginImage,
        title: 'Watch'
    },
    {
        img: loginImage,
        title: 'Marketplace'
    },
    {
        img: loginImage,
        title: 'Memories'
    },
]


const menu2Arr = [
    {
        img: loginImage,
        title: 'Events'
    },
    {
        img: loginImage,
        title: 'Gamings'
    },
    {
        img: loginImage,
        title: 'Gallery'
    },
    {
        img: loginImage,
        title: 'Videos'
    },
    {
        img: loginImage,
        title: 'Messages'
    },
]


const menu3Arr = [
    {
        img: loginImage,
        title: 'Tutors'
    },
    {
        img: loginImage,
        title: 'Courses'
    },
    {
        img: loginImage,
        title: 'tutorials'
    },
]