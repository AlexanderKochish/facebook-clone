import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineArrowLeft,HiOutlineDotsHorizontal } from 'react-icons/hi'
import { BiSearchAlt2 } from 'react-icons/bi'
import { collection,getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import userPhoto from '../../../public/user-icon.png'
import Image from 'next/image'
import { AuthContext } from '../../../context/AuthContext'

const FriendsList = () => {
  const[friendsList,setFriendsList] = useState([])
  const{currentUser} = useContext(AuthContext)
  useEffect(()=>{
    const getFriends = async() => {

      try {
        const friendsListRef = collection(db, 'users', currentUser.uid, 'friends')
        const res = await getDocs(friendsListRef)
        setFriendsList(res.docs.map((doc)=>({...doc.data(),id:doc.id})))
      } catch (error) {
        console.log(error.message)
      }
    }
      currentUser && getFriends()
  },[currentUser])

  return (
    <div className='w-[350px] min-h-screen flex flex-col pt-16 px-4 bg-white shadow-md'>
      <div className='border-b mb-5 border-gray-400 min-h-[120px] w-full flex flex-col'>
        <div className='flex space-x-2 items-center'>
        <div>
          <Link href={'/friends'}>
            <div className='p-2 hover:bg-gray-200 rounded-[50%]'>
                <HiOutlineArrowLeft className='w-5 h-5 text-slate-600'/>
            </div>
          </Link>
        </div>
        <div className='flex flex-col ml-2'>
            <span>Friends</span>
            <h2 className='font-bold text-2xl'>All Friends</h2>
        </div>
        </div>
        <div className='bg-gray-100 rounded-2xl mt-2  flex items-center w-full px-3'>
          <BiSearchAlt2 className='w-6 h-6 text-slate-500'/>
          <input type="text" placeholder='Search friends' className='w-full px-3 outline-none py-2 bg-inherit'/>
        </div>
        </div>
        <div className='mb-4'>
          <span>{friendsList.length} friends</span>
        </div>
        <ul>
          {friendsList.map(({user})=>(
          <Link href={`/profile/${user.uid}`}>
          <li key={user.uid} className='flex items-center justify-between hover:bg-slate-100 rounded-md px-2 py-3 cursor-pointer'>
            <div className='flex items-center space-x-2'>
            <div className='relative w-12 h-12'>
              <Image src={user.photoURL || userPhoto} fill alt='friends' className='object-cover rounded-[50%]'/>
            </div>
            <div>
              <span className='text-medium font-medium'>{user.displayName}</span>
              <span></span>
            </div>
            </div>
            <div className='rounded-[50%] p-2 hover:bg-gray-200'>
              <HiOutlineDotsHorizontal className='w-5 h-6'/>
            </div>
          </li>
          </Link>
          ))}
        </ul>
    </div>
  )
}

export default FriendsList