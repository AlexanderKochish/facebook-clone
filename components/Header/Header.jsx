import Image from 'next/image'
import React, {  useContext, useRef } from 'react'
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
import { useRouter } from 'next/router'
import Link from 'next/link'
import MessengerDropDown from './MessengerDropDown'
import { AuthContext } from '../../context/AuthContext'

const Header = ({
    accountDropDown,
    setAccountDropDown,
    notifications,
    setNotification,
    messenger,
    setMessenger,
}) => {
    const{ currentUser } = useContext(AuthContext)
    const ref = useRef(null) 
    const {pathname} = useRouter()
    
    useOutSideClick(ref,setAccountDropDown,accountDropDown)
    useOutSideClick(ref,setNotification,notifications)
    useOutSideClick(ref,setMessenger,messenger)

    const handleAccout = () => {  
        setAccountDropDown(!accountDropDown)   
        setNotification()
        setMessenger()
    }

    const handleNotification = () => {
        setNotification(!notifications)
        setAccountDropDown() 
        setMessenger()  
    }

    const handleMessenger = () => {
        setMessenger(!messenger)
        setAccountDropDown() 
        setNotification()
    }
  return (
    <header ref={ref} className='bg-white dark:bg-[#242526] h-14 shadow-md px-3 flex justify-between fixed top-0 left-0 right-0 items-center z-30'>
       
        <div className='flex items-center space-x-2'>
            <div className='relative w-12 h-10'>
                <Image src={facebookImg} fill alt='current-user' className='object-cover w-10 h-10 rounded-[50%]'/>
            </div>
            <div className='bg-gray-100 text-md dark:bg-[#323335] flex items-center px-2 text-slate-500 dark:text-slate-100 w-full rounded-3xl'>
                <BiSearchAlt2 className='w-5 h-5'/>
                <input type='text' placeholder='Search on Facebook' className='bg-inherit outline-none py-2 px-3'/>
            </div>  
        </div>
        <ul className='flex items-center space-x-2 mr-14'>
            <Link href={'/'}>
            <li className={pathname === '/'?'flex justify-center items-center pb-2 -mb-2 text-sky-600 w-24 h-12 cursor-pointer border-b-4 border-sky-600'
            :
            'flex justify-center items-center rounded-lg w-24 h-12 text-gray-500 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-gray-500'}>
                <AiFillHome className='w-7 h-7'/>
            </li>
            </Link>
            <Link href={'/watch'}>
            <li className={pathname === '/watch'?'flex justify-center items-center pb-2 -mb-2 text-sky-600 w-24 h-12 cursor-pointer border-b-4 border-sky-600'
            :
            'flex justify-center items-center rounded-lg w-24 h-12 text-gray-500 hover:bg-gray-100'}>
                <MdOndemandVideo className='w-7 h-7'/>
            </li>
            </Link>
            <Link href={'/marketplace'}>
            <li className={pathname === '/marketplace'?'flex justify-center items-center pb-2 -mb-2 text-sky-600 w-24 h-12 cursor-pointer border-b-4 border-sky-600'
            :
            'flex justify-center items-center rounded-lg w-24 h-12 text-gray-500 hover:bg-gray-100'}>
                <AiOutlineShop className='w-7 h-7'/>
            </li>
            </Link>
            <Link href={'/groups'}>
            <li className={pathname === '/groups'? 'flex justify-center items-center pb-2 -mb-2 text-sky-600 w-24 h-12 cursor-pointer border-b-4 border-sky-600'
            :
            'flex justify-center items-center rounded-lg w-24 h-12 text-gray-500 hover:bg-gray-100'}>
                <MdGroups className='w-7 h-7'/>
            </li>
            </Link>
        </ul>
        <ul className='flex space-x-2 items-center'>
            <li>
                <div className='p-2 bg-slate-200 dark:bg-[#323335] rounded-[50%] cursor-pointer hover:bg-slate-300  text-black dark:text-white dark:hover:bg-[#444548]'>
                <CgMenuGridO className='w-6 h-6'/>
                </div>
            </li>
            <li onClick={handleMessenger}>
                <div className={messenger?'p-2 bg-sky-100 rounded-[50%] cursor-pointer hover:bg-sky-200 text-sky-700'
                :
                'p-2 bg-slate-200 dark:bg-[#323335] rounded-[50%] cursor-pointer hover:bg-slate-300 text-black dark:text-white dark:hover:bg-[#444548]'}>
                    <FaFacebookMessenger className='w-6 h-6'/>
                </div>
            </li>
            <li onClick={handleNotification}>
                <div className={notifications?'p-2 bg-sky-100 rounded-[50%] cursor-pointer hover:bg-sky-200 text-sky-700'
                :
                'p-2 bg-slate-200 dark:bg-[#323335] rounded-[50%] cursor-pointer hover:bg-slate-300 text-black dark:text-white dark:hover:bg-[#444548]'}>
                    <FaBell className='w-6 h-6'/>
                </div>
            </li>
            <li onClick={handleAccout}>
                <div className='relative z-10 w-11 h-11 cursor-pointer'>
                    <Image src={currentUser?.photoURL || userPhoto} alt='user-avatar' fill className='object-cover w-11 h-11 rounded-[50%]'/>
                </div>
            </li>
        </ul>
        
        {accountDropDown && <AccountDropDown/>}
        {notifications && <NotificationDropDown/>}
        {messenger && <MessengerDropDown/>}
    </header>
  )
}

export default Header