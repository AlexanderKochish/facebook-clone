import Link from 'next/link'
import { BiSearchAlt2,BiMessageSquareEdit } from 'react-icons/bi'
import { HiOutlineDotsHorizontal,HiOutlineArrowsExpand } from 'react-icons/hi'
import { BsFillCameraReelsFill } from 'react-icons/bs'

const MessengerDropDown = () => {
  return (
    <div className='flex flex-col bg-white w-[350px] min-h-[300px] rounded-lg shadow-md p-3 absolute top-14 right-5 overflow-hidden overflow-y-scroll'>
        <div className='flex items-center justify-between mb-3'>
            <h3 className='text-2xl font-bold'>Chats</h3>
            <ul className='flex text-lg text-slate-600 space-x-1'>
                <li className='hover:bg-slate-100 rounded-[50%] p-2 cursor-pointer'><HiOutlineDotsHorizontal className='w-5 h-5'/></li>
                <Link href={'/messages'}><li className='hover:bg-slate-100 rounded-[50%] p-2 cursor-pointer'><HiOutlineArrowsExpand className='w-5 h-5 cursor-pointer'/></li></Link>
                <li className='hover:bg-slate-100 rounded-[50%] p-2 cursor-pointer'><BsFillCameraReelsFill className='w-5 h-5 cursor-pointer'/></li>
                <li className='hover:bg-slate-100 rounded-[50%] p-2 cursor-pointer'><BiMessageSquareEdit className='w-5 h-5 cursor-pointer'/></li>
            </ul>
        </div>
        <div className='flex items-center space-x-1 bg-slate-200 rounded-2xl'>
            <BiSearchAlt2 className='ml-2 w-6 h-6 text-slate-600'/>
            <input type="text" placeholder='Search in Messenger' className='outline-none bg-inherit py-2 px-1'/>
        </div>
    </div>
  )
}

export default MessengerDropDown