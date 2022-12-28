import React, { useContext } from 'react'
import { GoSignOut } from 'react-icons/go'
import { FaMoon } from 'react-icons/fa'
import { MdSettings,MdContactSupport,MdReviews } from 'react-icons/md'
import userPhoto from '../../public/user-icon.png'
import Image from 'next/image'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { ThemeContext } from '../../context/ThemeContext'

const AccountDropDown = () => {
    const { currentUser } = useContext(AuthContext)
    const { handleTheme } = useContext(ThemeContext)

  return (
    <div className='absolute top-14 right-5 flex flex-col bg-white shadow-xl rounded-md w-[350px] min-h-[450px] p-3'>
        <div className='flex flex-col p-2 bg-white rounded-md shadow-lg'>
            <div className='flex border-b py-4 items-center space-x-2'>
                <div className='relative w-8 h-8'>
                    <Image src={currentUser?.photoURL || userPhoto} alt='current-user' fill className='w-8 h-8 object-cover rounded-[50%]'/>
                </div>
                <h2>{currentUser?.displayName}</h2>
            </div>
            <div className='hover:bg-slate-100 px-2 py-3 my-1 rounded-md'>
                <span className='text-sky-600 font-semibold cursor-pointer'>All Profiles</span>
            </div>
            </div>
            <ul className='space-y-1 mt-3'>
                <li className='flex items-center space-x-2 text-lg font-semibold px-2 py-2 hover:bg-slate-100 rounded-lg -ml-2 cursor-pointer'>
                    <div className='p-2 bg-slate-200 rounded-[50%]'>
                        <MdSettings className='text-black w-6 h-6'/>
                    </div>
                    <span>Settings</span>
                </li>
                <li className='flex items-center space-x-2 text-lg font-semibold px-2 py-2 hover:bg-slate-100 rounded-lg -ml-2 cursor-pointer'>
                    <div className='p-2 bg-slate-200 rounded-[50%]'>
                        <MdContactSupport className='text-black w-6 h-6'/>
                    </div>
                    <span>Support</span>
                </li>
                <li className='flex items-center space-x-2 text-lg font-semibold px-2 py-2 hover:bg-slate-100 rounded-lg -ml-2 cursor-pointer'>
                    <div onClick={handleTheme} className='p-2 bg-slate-200 rounded-[50%]'>
                        <FaMoon className='text-black w-6 h-6'/>
                    </div>
                    <span>Help for theme</span>
                </li>
                <li className='flex items-center space-x-2 text-lg font-semibold px-2 py-2 hover:bg-slate-100 rounded-lg -ml-2 cursor-pointer'>
                    <div className='p-2 bg-slate-200 rounded-[50%]'>
                        <MdReviews className='text-black w-6 h-6'/>
                    </div>
                    <span>Reviews</span>
                </li>
                <li onClick={()=>signOut(auth)} className='flex items-center space-x-2 text-lg font-semibold px-2 py-2 hover:bg-slate-100 rounded-lg -ml-2 cursor-pointer'>
                    <div className='p-2 bg-slate-200 rounded-[50%]'>
                        <GoSignOut className='text-black w-6 h-6'/>
                    </div>
                    <span>Sign Out</span>
                </li>
            </ul>
        </div>
  )
}

export default AccountDropDown