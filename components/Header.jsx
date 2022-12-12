import Image from 'next/image'
import React from 'react'
import facebookImg from '../public/fb_icon_325x325.png'
import { AiFillHome,AiOutlineShop } from 'react-icons/ai'
import { MdOndemandVideo,MdGroups } from 'react-icons/md'
import { CgMenuGridO } from 'react-icons/cg'
import { FaFacebookMessenger,FaBell } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='bg-white'>
        <div className='container mx-auto flex justify-between'>
        <div>
            <div className='relative w-12 h-12'>
                <Image src={facebookImg} fill className='object-cover w-12 h-12 rounded-[50%]'/>
            </div>
            <div>
                <input type='text'/>
            </div>  
        </div>
        <ul>
            <li><AiFillHome/></li>
            <li><MdOndemandVideo/></li>
            <li><AiOutlineShop/></li>
            <li><MdGroups/></li>
        </ul>
        <ul>
            <li><div><CgMenuGridO/></div></li>
            <li><div><FaFacebookMessenger/></div></li>
            <li><div><FaBell/></div></li>
            <li>
                <div>
                    {/* <Image/> */}
                </div>
            </li>
        </ul>
        </div>
    </header>
  )
}

export default Header