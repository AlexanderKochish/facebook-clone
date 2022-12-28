import { FaBookOpen } from 'react-icons/fa'
import { RiVideoAddFill } from 'react-icons/ri'
import { BiMoviePlay } from 'react-icons/bi'
import Image from 'next/image'
import { useContext,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import userPhoto from '../../public/user-icon.png'
import { MdVideoCameraFront,MdPhotoLibrary,MdFlag } from 'react-icons/md'
import Post from '../Profile/Posts/Post'

const HomePosts = ({posts,user}) => {
    const[file,setFile] = useState(null)
    const[postText,setPostText] = useState('')
    const{ currentUser } = useContext(AuthContext)

  return (
    <div className='w-[40%] flex flex-col self-start min-h-screen'>
        <div className='mt-20 bg-white dark:bg-[#242526] rounded-lg shadow-md mb-1 px-2 py-1'>
            <ul className='flex items-center justify-between border-b pb-1 text-gray-500 font-semibold'>
              <li className='flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md'>
                <div><FaBookOpen className='w-5 h-5'/></div>
                <span>Storys</span>
              </li>
              <li className='flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md'>
                <div><BiMoviePlay className='w-5 h-5'/></div>
                <span>Reels</span>
              </li>
              <li className='flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md'>
                <div><RiVideoAddFill className='w-5 h-5'/></div>
                <span>Rooms</span>
              </li>
            </ul>
        <ul className='p-3 flex space-x-2'>
            <li className='relative w-28 h-48'>
                <Image src={currentUser?.photoURL} fill alt='current user' className='object-cover rounded-md'/>
            </li>
        </ul>
        </div>

        <form onSubmit={null} className='bg-white dark:bg-[#242526] w-full min-h-[100px] self-start flex flex-col p-2 mt-3 rounded-lg shadow-md'>
        <div className='flex space-x-2 border-b pb-3'>
            <div className='relative w-10 h-10'>
                <Image src={currentUser?.photoURL || userPhoto} fill alt='current user' className='object-cover rounded-[50%]'/>
            </div>
            <input type="text" value={postText} onChange={(e)=>setPostText(e.target.value)} placeholder='What you news?' className='rounded-2xl outline-none py-2 px-3 bg-slate-200 dark:bg-[#323335] w-[90%]'/>
        </div>
        <ul className='flex justify-between items-center text-base text-slate-500 font-semibold mt-2'>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 py-2 px-3'>
                <MdVideoCameraFront className='text-rose-500 w-8 h-8'/>
                <span>Live</span>
            </li>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3'>
                <input type='file' className='hidden' id='post_image' onChange={(e)=>setFile(e.target.files[0])}/>
                <label htmlFor="post_image" className='flex items-center'>
                <MdPhotoLibrary className='text-green-500 w-8 h-8'/>
                    Photo/Video
                </label>
            </li>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 text-lg py-2 px-3'>
                <MdFlag className='text-sky-400 w-8 h-8'/>
                <span>Life Events</span>
            </li>
        </ul>
    </form>
    <div>
      {posts?.map((post)=><Post key={post.id} post={post} user={user}/>)}
    </div>
    </div>
  )
}

export default HomePosts