import React from 'react'
import Image from 'next/image'
import userPhoto from '../../public/user-icon.png'
import { HiPhone,HiVideoCamera } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'
import { AiFillLike } from 'react-icons/ai'
import { BsFillFileImageFill } from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'

const ContactHomeFriendsListModal = ({setContactModal, openContactModal}) => {
  return (
    <div className='fixed bottom-0 right-20 w-[320px] h-[430px] bg-white rounded-t-md drop-shadow-lg'>
        <div className='flex items-center justify-between p-2 border-b bg-white w-full shadow-md'>
            <div className='flex space-x-2'>
            <div className='relative w-10 h-10'>
                <Image src={userPhoto} alt='user contact' fill className='object-cover rounded-[50%]'/>
            </div>
            <span>alex</span>
            </div>
            <ul className='flex space-x-2 items-center text-sky-500'>
                <li className='cursor-pointer p-1 rounded-[50%] hover:bg-gray-200'><HiPhone className='w-5 h-5'/></li>
                <li className='cursor-pointer p-1 rounded-[50%] hover:bg-gray-200'><HiVideoCamera className='w-5 h-5'/></li>
                <li onClick={()=>setContactModal(!openContactModal)} className='cursor-pointer p-1 rounded-[50%] hover:bg-gray-200'><CgClose className='w-5 h-5'/></li>
            </ul>
        </div>
    <div className='overflow-hidden overflow-y-scroll h-[320px] absolute top-14 bottom-100 p-2'>
        <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus beatae magni odio facilis totam minima at libero alias, esse nam autem consequuntur voluptate illo expedita quod quisquam quo placeat eligendi!
        Cumque, dicta consectetur minus sunt, voluptatibus, aut soluta sapiente pariatur et perspiciatis at rem harum dolorem? Distinctio neque a tenetur, unde alias incidunt, nulla nostrum et mollitia explicabo delectus consectetur.
        id iure soluta adipisci? Dolorem corporis commodi blanditiis, facilis placeat debitis qui? Asperiores, aut?
        </p>
    </div>
    <form className='flex items-center border-t h-14 p-2 w-full fixed bottom-0 bg-white justify-between shadow-md text-gray-400'>
        
        <input type="file" id='home_contact_input_file' className='hidden'/>
        <label htmlFor='home_contact_input_file' className='p-1 hover:bg-gray-200 rounded-[50%] cursor-pointer'>
            <BsFillFileImageFill className='w-5 h-5'/>
        </label>
        <div className='flex items-center'>
            <div className='flex items-center rounded-2xl px-1 bg-gray-100'>
                <input type="text" placeholder='Aa' className='bg-inherit outline-none px-2 py-1 rounded-2xl'/>
            <div className='p-1 hover:bg-gray-200 rounded-[50%] cursor-pointer'>
                <FaSmile className='w-5 h-5'/>
            </div>
            </div>
            <div className='p-1 hover:bg-gray-200 rounded-[50%] ml-2 cursor-pointer'>
                <AiFillLike className='w-5 h-5'/>
            </div>
        </div>
    </form>
    </div>
  )
}

export default ContactHomeFriendsListModal