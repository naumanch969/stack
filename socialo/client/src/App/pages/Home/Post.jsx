import { Favorite, Comment, Share, MoreHoriz, Close, ThumbUpAltOutlined, ThumbUpAlt } from '@mui/icons-material'
import { Avatar, Slider } from '../../../utils/Components'
import { image2 } from '../../../assets'
import { likePost, commentPost } from '../../../redux/actions/post'
import { limitText, dateObj } from '../../../utils/functions/function'
import { useState } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'

const Post = ({ post }) => {

    ///////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()
    const { users, loggedUser:user } = useSelector(state=>state.user)
    const findedUser = users.find(user => user._id == post.user)
const userId = user._id

    ///////////////////////////// STATES ////////////////////////////////////////
    const [showFullContent, setShowFullContent] = useState(false)
    const hasLikedPost = post.likes?.find((id) => id === userId)
    const date = dateObj(post.createdAt)

    ///////////////////////////// USE EFFECTS ///////////////////////////////////

    ///////////////////////////// FUNCTIONS //////////////////////////////////////
    const likePostFunc = () => {
        dispatch(likePost(post._id))
        if (hasLikedPost) {
            post.likes = post.likes.filter((id) => id !== userId)
        } else {
            post.likes = [...post.likes, userId]
        }
    }



    ///////////////////////////// COMPONENTS //////////////////////////////////////
    const Likes = () => {         // new to me
        if (post.likes.length > 0) {
            return hasLikedPost
                ? (<> <ThumbUpAlt fontSize="small" /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} Like${post.likes.length > 1 ? 's' : ''}`}  </>)    // if user likes the post
                : (<> <ThumbUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length} {post.likes.length > 1 ? "Likes" : "Like"} </>)      // if user does not like the post
        }
        return <> <ThumbUpAltOutlined fontSize="small" />&nbsp;'Like'</>
    }


    return (
        <div className="w-full bg-white p-[1rem] flex flex-col gap-[8px] rounded-[8px] " >
            {/* topbar */}
            <div className="w-full flex justify-between items-start " >
                {/* profile picture */}
                <div className="flex justify-start items-center gap-[1rem] " >
                    <Avatar src={post.image} />
                    <div className="flex flex-col items-start  " >
                        <h6 className="" >{findedUser?.name}</h6>
                        <p className="" >{moment(post.createdAt).fromNow()}</p>
                    </div>
                </div>
                {/* close and more button */}
                <div className="flex items-center justify-end gap-[8px] " >
                    <button className="w-[2rem] h-[2rem] rounded-full hover:bg-gray-100 flex justify-center items-center  " >
                        <MoreHoriz />
                    </button>
                    <button className="w-[2rem] h-[2rem] rounded-full hover:bg-gray-100 flex justify-center items-center  " ><Close /></button>
                </div>
            </div>

            <div className='flex flex-col gap-[1rem] ' >
                {/* content */}
                <div className="w-full " >
                    {/* text */}
                    <p className="" >
                        {showFullContent && post.content.text.length ? post.content.text : limitText(post.content.text, 750)}
                        <span onClick={() => setShowFullContent(pre => !pre)} className='text-link-blue cursor-pointer hover:underline ' >
                            {post.content.text.length > 750 && (showFullContent ? 'show less' : 'show more')}
                        </span>
                    </p>
                    {/* hashtags */}
                    <div className="flex flex-wrap justify-start items-center gap-[8px] leading-[16px] " >
                        {
                            post.hashTags.map((hashTag, index) => (
                                <a key={index} className="text-link-blue italic hover:underline cursor-pointer " >#{hashTag}</a>
                            ))
                        }
                    </div>
                </div>
                {/* images, vieos */}

                {
                    Boolean(post.images.length) &&
                    <div className={`${post.images.length == 1 ? '' : 'max-h-[15rem]'} w-full flex overflow-x-scroll overflow-y-hidden `} >
                        <div className="thin_horizontal_scrollbar relative h-full w-full flex justify-start gap-[8px] p-[8px] bg-gray-500 rounded-[4px] overflow-x-scroll overflow-y-hidden " >
                            {
                                post.images.map((img, index) => (
                                    <img key={index} src={img} alt="img" className="h-full rounded-[4px] " />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>

            <div className='w-full flex flex-col items-center gap-[8px] ' >
                {/* like, comment and share counts */}
                <div className="flex justify-between items-center w-full " >
                    {/* like counts */}
                    <div className="" >
                        <div className="flex  gap-[4px] " >
                            <Favorite className="text-text-gray " />
                            <p className="" >{post.likes.length && post.likes.length}</p>
                        </div>
                    </div>
                    {/* comment and share counts */}
                    <div className="flex justify-between items-end gap-[1rem] " >
                        <div className="flex gap-[4px] " >
                            <p className="" >{post.comments.length && post.comments.length} </p>
                            <Comment className="text-text-gray " />
                        </div>
                        <div className="flex gap-[4px] " >
                            <p className="" >{post?.shares?.length && post?.shares?.length}</p>
                            <Share className="text-text-gray " />
                        </div>
                    </div>
                </div>

                <hr className='w-full text-gray-100 ' />

                <div className="w-full flex justify-around items-center " >
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button onClick={() => likePostFunc()} className="text-purple-900 " >
                            <Likes />
                        </button>
                    </div>
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button className="text-purple-900  " ><Comment /></button>
                        <p className="text-purple-900 " >31 Comment</p>
                    </div>
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button className="text-purple-900  " ><Share /></button>
                        <p className="text-purple-900 " >24 Shares</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Post