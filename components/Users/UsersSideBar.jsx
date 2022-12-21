import React from 'react'
import { MdSettings } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { BsFillPersonLinesFill,BsFillPersonPlusFill,BsFillPersonDashFill,BsGiftFill } from 'react-icons/bs'
import Link from 'next/link'

const UsersSideBar = () => {
  return (
    <div className='flex flex-col min-h-screen w-[350px] pt-16 px-4 bg-white shadow-md'>
       <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Friends</h2>
          <div className='p-2 bg-slate-100 hover:bg-slate-200 rounded-[50%]'>
            <MdSettings className='w-6 h-6 cursor-pointer'/>
          </div>
        </div>
        <ul className='mt-5'>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md bg-gray-100'>
            <div className='p-2 rounded-[50%] bg-sky-500'>
              <FaUserFriends className='w-6 h-6 text-white'/>
            </div>
            <span>Home</span>
          </li>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md hover:bg-gray-100 cursor-pointer'>
            <div className='p-2 rounded-[50%] bg-gray-100'>
              <BsFillPersonDashFill className='w-6 h-6'/>
            </div>
            
            <span>Friend requests</span>
            </li>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md hover:bg-gray-100 cursor-pointer'>
          <div className='p-2 rounded-[50%] bg-gray-100'> <BsFillPersonPlusFill className='w-6 h-6'/></div>
           
            <span>Recommendations</span>
            </li>
          <Link href={'/friends/list'}>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md hover:bg-gray-100 cursor-pointer'>
          <div className='p-2 rounded-[50%] bg-gray-100'><BsFillPersonLinesFill className='w-6 h-6'/></div>
            
            <span>All friends</span>
            </li>
            </Link>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md hover:bg-gray-100 cursor-pointer'>
          <div className='p-2 rounded-[50%] bg-gray-100'><BsGiftFill className='w-6 h-6'/></div>
            
            <span>Birthdays</span>
            </li>
          <li className='flex items-center font-bold text-lg space-x-2 p-2 w-full rounded-md hover:bg-gray-100 cursor-pointer'>
          <div className='p-2 rounded-[50%] bg-gray-100'>
          <BsFillPersonLinesFill className='w-6 h-6'/>
          </div>
            
            <span>Own lists</span>
          </li>
        </ul>
       </div>
    </div>
  )
}

export default UsersSideBar