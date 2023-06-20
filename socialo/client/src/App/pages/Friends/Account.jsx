import { useStateContext } from '../../../contexts/ContextProvider'
import { useState, useEffect } from 'react'
import Post from '../Home/Post'
import { Capitalize, limitText } from '../../../utils/functions/function'
import { image1, image2, image3, image4, image5, image6, image7, } from '../../../assets'
import { Avatar } from '../../../utils/Components'
import { getUserPosts, getPosts } from '../../../redux/actions/post'
import { Link } from 'react-router-dom'
import { Email, Phone, LocationOn, CalendarMonth, Male, Female, KeyboardBackspace } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Account = () => {

    const { userState, setUserState, postState, setPostState } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    const { accountId, selectedItem } = useParams()
    const dispatch = useDispatch()
    const findedAccount = userState.usersArr.find(user => user._id == accountId)
    const { result, isLoading, isError, error } = useSelector(state => state.post)

    //////////////////////////// STATES ///////////////////////////////////////
    const [selected, setSelected] = useState('posts')
    const [showFullContent, setShowFullContent] = useState('posts')

    //////////////////////////// USE EFFECTS //////////////////////////////////
    useEffect(() => {
        accountId && dispatch(getUserPosts(accountId))
    }, [accountId])
    useEffect(() => {
        postState.postsArr = result
        setPostState({ ...postState })
    }, [result])
    useEffect(() => {
        console.log('selected', selected)
    }, [selected])

    //////////////////////////// FUNCTIONS /////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-[24px] " >

            <div className="bg-white h-fit " >
                <div className="relative w-full md:h-[15rem] lg:h-[18rem] md:mb-[4rem] lg:m-0 " >
                    <img src={image2} alt="image2" className="w-full h-full " />
                    <img src={image6} alt="image6" className="absolute top-[50%] lg:left-0 md:right-[50%] transform lg:translate-x-[20%] md:translate-x-[50%] lg:translate-y-[30%] md:translate-y-[16%] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] border-[4px] border-white bg-gray-500 rounded-full z-50 " />
                </div>
                <div className="min-h-[5rem] flex md:flex-col lg:flex-row justify-between items-center lg:pl-[1rem] lg:pr-[2rem] lg:pt-[1rem] lg:pb-[2rem] " >
                    <h2 className="lg:pl-[14rem] text-[2rem] font-extrabold capitalize text-purple-800 " >{findedAccount?.name} Imtiaz</h2>
                    <div className="flex gap-[12px] " >
                        <button className='py-[6px] px-[12px] rounded-[4px] bg-purple-500 text-white ' >Friends</button>
                        <button className='py-[6px] px-[12px] rounded-[4px] bg-gray-100 text-black ' >Message</button>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center " >
                    <hr className="w-[90%] bg-gray-100 h-[2px] my-[1rem] " />
                </div>
                <div className="flex gap-[2rem] md:px-[2rem] lg:px-[4rem] border-b-[1px] border-gray-100 " >
                    {
                        options.map((option, index) => (
                            <button key={index} className={`${selected == option && 'text-purple-500'} hover:text-purple-500 capitalize font-medium flex flex-col gap-[8px]  `} onClick={() => setSelected(option)} >
                                <span className="" >{option}</span>
                                {
                                    selected == option &&
                                    <hr className="w-full h-[3px] rounded-[4px] bg-purple-500 " />
                                }
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="flex pb-[2rem] " >
                {
                    selected == 'posts' &&
                    <>
                        <div className="md:hidden lg:block lg:w-[35%] h-fit bg-white rounded-[8px] p-[1rem] m-[1rem] " >
                            {/* intro */}
                            <div className=" " >
                                <h4 className="text-[20px] font-bold " >Intro</h4>
                                <p className="" >
                                    {showFullContent && findedAccount?.bio?.length ? findedAccount?.bio : limitText(findedAccount?.bio, 750)}
                                    {Capitalize('this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I')}
                                    <span onClick={() => setShowFullContent(pre => !pre)} className='text-link-blue cursor-pointer hover:underline ' >
                                        {findedAccount?.bio?.length > 750 && (showFullContent ? 'show less' : 'show more')}
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col " >
                                <p className="flex justify-start items-start gap-[8px] " >
                                    <Email />
                                    <span className="" >{findedAccount?.email}</span>
                                </p>
                                <p className="flex justify-start items-start gap-[8px] " >
                                    <Phone />
                                    <span className="" >{findedAccount?.phone}</span>
                                </p>
                                <p className="flex justify-start items-start gap-[8px] " >
                                    <LocationOn />
                                    <span className="" >{findedAccount?.location}</span>
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-[65%] flex flex-col gap-[1rem] rounded-[8px] m-[1rem] md:mx-[2rem] lg:mx-[1rem] " >
                            {
                                postState.postsArr.map((post, index) => (
                                    <Post post={post} key={index} />
                                ))
                            }
                        </div>
                    </>
                }
                {
                    selected == 'about' &&
                    <div className="lg:w-[35%] h-fit flex flex-col gap-[1rem] bg-white rounded-[8px] p-[1rem] m-[1rem] " >
                        <div className=" " >
                            <h4 className="text-[20px] font-bold " >Intro</h4>
                            <p className="" >
                                {showFullContent && findedAccount?.bio?.length ? findedAccount?.bio : limitText(findedAccount?.bio, 750)}
                                {Capitalize('this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I wanna show you that I am writing just some random text to show on screen yes it for random purposes and for checking and etcetra etcetra this is something that I')}
                                <span onClick={() => setShowFullContent(pre => !pre)} className='text-link-blue cursor-pointer hover:underline ' >
                                    {findedAccount?.bio?.length > 750 && (showFullContent ? 'show less' : 'show more')}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-[12px] " >
                            <p className="flex justify-start items-start gap-[8px] " >
                                <Email className="text-gray-500 " />
                                <span className="text-gray-900 " >{findedAccount?.email}</span>
                            </p>
                            <p className="flex justify-start items-start gap-[8px] " >
                                <Phone className="text-gray-500 " />
                                <span className="text-gray-900 " >{findedAccount?.phone}</span>
                            </p>
                            <p className="flex justify-start items-start gap-[8px] " >
                                <LocationOn className="text-gray-500 " />
                                <span className="text-gray-900 " >{findedAccount?.location}</span>
                            </p>
                        </div>
                    </div>
                }
                {
                    selected == 'friends' &&
                    <div className="flex flex-col gap-[1rem] w-full " >
                        {
                            userState.accounts.map((friend, index) => (
                                <Link to={`/app/friends/${selectedItem}/${friend._id}`} key={index} onClick={() => accountClick(friend._id)} className="bg-white mx-[5rem] px-[1rem] py-[8px] flex justify-between items-center hover:bg-gray-100 cursor-pointer rounded-[8px]  " >
                                    <div className="flex justify-start items-center gap-[1rem] " >
                                        <Avatar className={{ container: "w-[4rem] h-[4rem] ", child: ' text-gray-500 ' }} />
                                        <div className="flex flex-col justify-start " >
                                            <p className="text-[18px] font-semibold text-purple-900 " >{friend.name}</p>
                                            <p className="text-[14px] text-text-gray " >{friend.userName || 'userName'}</p>
                                        </div>
                                    </div>
                                    <div className="" >
                                        <button className="text-[14px]  " >Add Friend</button>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                }
                {
                    selected == 'photos' &&
                    <div className="flex flex-wrap justify-center text-center gap-[1rem] w-full " >
                        {
                            images.map((image, index) => (
                                <img src={image} alt="image" key={index} width='45%' className="w-[45%] rounded-[4px] " />
                            ))
                        }
                    </div>
                }
                {
                    selected == 'videos' &&
                    <div className="flex flex-wrap justify-center text-center gap-[1rem] w-full " >
                        {
                            videos.map((video, index) => (
                                <img src={video} alt="image" key={index} width='45%' className="w-[45%] rounded-[4px] " />
                            ))
                        }
                    </div>
                }
            </div>


        </div>
    )
}

export default Account;


const options = [
    'posts',
    'about',
    'friends',
    'photos',
    'videos',
]
const images = [image1, image2, image3, image4, image5, image6, image7]
const videos = [image4, image6, image1, image7, image2, image3, image5]