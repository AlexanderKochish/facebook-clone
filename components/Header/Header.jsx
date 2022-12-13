import Image from 'next/image'
import React, { useContext, useRef } from 'react'
import facebookImg from '../../public/fb_icon_325x325.png'
import userPhoto from '../../public/user-icon.png'
import { AiFillHome,AiOutlineShop } from 'react-icons/ai'
import { MdOndemandVideo,MdGroups } from 'react-icons/md'
import { CgMenuGridO } from 'react-icons/cg'
import { FaFacebookMessenger,FaBell } from 'react-icons/fa'
import { BiSearchAlt2 } from 'react-icons/bi'
import AccountDropDown from './AccountDropDown'
import useOutSideClick from '../../hooks/useOutSideClick'
import NotificationDropDown from './NotificationDropDown'
import { AuthContext } from '../../context/AuthContext'

const Header = ({accountDropDown,setAccountDropDown,notifications,setNotification}) => {
    const { currentUser } = useContext(AuthContext)
    const ref = useRef(null) 
console.log(currentUser);
    useOutSideClick(ref,setAccountDropDown,accountDropDown)
    useOutSideClick(ref,setNotification,notifications)

    const handleAccout = () =>{  
        setAccountDropDown(!accountDropDown)   
        setNotification()
    }

    const handleNotification = () =>{
        setNotification(!notifications)
        setAccountDropDown()   
    }
  return (
    <header ref={ref} className='bg-white h-14 shadow-lg flex fixed top-0 left-0 right-0 items-center'>
        <div className='container mx-auto flex justify-between items-center py-1'>
        <div className='flex items-center space-x-2'>
            <div className='relative w-12 h-10'>
                <Image src={facebookImg} fill alt='current-user' className='object-cover w-10 h-10 rounded-[50%]'/>
            </div>
            <div className='bg-gray-100 text-md flex items-center px-2 text-slate-500 w-full rounded-2xl'>
                <BiSearchAlt2 className='w-5 h-5'/>
                <input type='text' placeholder='Search on Facebook' className='bg-inherit outline-none py-2 px-3 '/>
            </div>  
        </div>
        <ul className='flex items-center space-x-2 mr-14'>
            <li className='flex justify-center items-center rounded-lg w-24 h-12 hover:bg-gray-100 cursor-pointer'>
                <AiFillHome className='w-7 h-7 text-gray-500'/>
            </li>
            <li className='flex justify-center items-center rounded-lg w-24 h-12 hover:bg-gray-100 cursor-pointer'>
                <MdOndemandVideo className='w-7 h-7 text-gray-500'/>
            </li>
            <li className='flex justify-center items-center rounded-lg w-24 h-12 hover:bg-gray-100 cursor-pointer'>
                <AiOutlineShop className='w-7 h-7 text-gray-500'/>
            </li>
            <li className='flex justify-center items-center rounded-lg w-24 h-12 hover:bg-gray-100 cursor-pointer'>
                <MdGroups className='w-7 h-7 text-gray-500'/>
            </li>
        </ul>
        <ul className='flex space-x-2 items-center'>
            <li>
                <div className='p-2 bg-slate-200 rounded-[50%] cursor-pointer hover:bg-slate-300'>
                <CgMenuGridO className='w-6 h-6 text-black'/>
                </div>
            </li>
            <li>
                <div className='p-2 bg-slate-200 rounded-[50%] cursor-pointer hover:bg-slate-300'>
                    <FaFacebookMessenger className='w-6 h-6 text-black'/>
                </div>
            </li>
            <li onClick={handleNotification}>
                <div className='p-2 bg-slate-200 rounded-[50%] cursor-pointer hover:bg-slate-300'>
                    <FaBell className='w-6 h-6 text-black'/>
                </div>
            </li>
            <li onClick={handleAccout}>
                <div className='relative z-10 w-11 h-11 cursor-pointer'>
                    <Image src={currentUser?.photoURL || userPhoto} alt='user-avatar' fill className='object-cover w-11 h-11 rounded-[50%]'/>
                </div>
            </li>
        </ul>
        </div>
        {accountDropDown && <AccountDropDown/>}
        {notifications && <NotificationDropDown/>}
    </header>
  )
}

export default Header