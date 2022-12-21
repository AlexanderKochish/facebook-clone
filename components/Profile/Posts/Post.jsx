import Image from 'next/image'
import React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { BiLike } from 'react-icons/bi'
import { GoComment } from 'react-icons/go'
import { RiShareForwardLine } from 'react-icons/ri'

const Post = ({post,currentUser}) => {
    const{ photoURL,displayName } = currentUser || {}

  return (
    <>
    {post && (
    <div className='w-full min-h-[100px] bg-white rounded-md drop-shadow-md flex flex-col p-3 ml-3 mt-5'>
        <div className='flex items-center justify-between mb-2'>
            <div className='flex space-x-2'>
                <div className='relative w-12 h-12'>
                    <Image src={photoURL} fill alt='currentUser' className='object-cover rounded-[50%]'/>
                </div>
                <div>
                    <span>{displayName}</span>
                </div>
            </div>
            <div>
                <HiOutlineDotsHorizontal className='w-6 h-6'/>
            </div>
        </div>
        {post.image? <div className='relative w-full h-96'>
            <Image src={post?.image} fill alt='post content' className='object-cover rounded-md'/>
        </div>:''}
        {post?.text && <div className='bg-slate-100 w-full mt-2 min-h-[50px] rounded-md p-2'>
            <p className='text-lg'>{post.text}</p>
            </div>}
        <div className='flex flex-col my-2'>
            <div>
                {/* friends reaction this post */}
            </div>
            <div className='flex items-center justify-between w-full text-gray-600 my-1 border-b border-t py-1'>
                <div className='flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md'>
                    <BiLike className='w-6 h-6 mr-2'/>
                    <span>Like</span>
                </div>
                <div className='flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md'>
                    <GoComment className='w-6 h-6 mr-2'/>
                    <span>Comment</span>
                </div>
                <div className='flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md'>
                    <RiShareForwardLine className='w-6 h-6 mr-2'/>
                    <span>Share</span> 
                </div>
            </div>
            <form>
                <input type="text" placeholder='write commets'/>
            </form>
        </div>
    </div>
    )}
    </>
  )
}

export default Post