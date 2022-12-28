import { collection, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Image from 'next/image'
import userPhoto from '../../public/user-icon.png'
import { db } from '../../firebase'
import { RiVideoAddFill } from 'react-icons/ri'
import { BiSearchAlt2 } from 'react-icons/bi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

const HomeContactFriendsList = ({setContactModal,openContactModal}) => {
    const[friendsListContact,setFriendsListContact] = useState([])
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        if(!currentUser) return;
        const getFriendsListContacts = async() => {
            const res = await getDocs(collection(db,'users',currentUser?.uid,'friends'))
            const listContacts = res.docs.map((doc)=>({...doc.data(),id:doc.id}))
            setFriendsListContact(listContacts)
        }
        getFriendsListContacts()
    },[currentUser])

  return (
    <div className='w-1/5 self-start flex flex-col min-h-scree fixed right-4 mt-20'>
        <div className='flex items-center justify-between text-gray-700'>
        <h2 className='text-lg font-semibold'>Contacts</h2>
        <div className='flex space-x-2'>
            <div className='p-2 rounded-[50%] hover:bg-gray-200 cursor-pointer text-gray-600'>
            <RiVideoAddFill className='w-5 h-5'/>
            </div>
            <div className='p-2 rounded-[50%] hover:bg-gray-200 cursor-pointer'>
            <BiSearchAlt2 className='w-5 h-5'/>
            </div>
            <div className='p-2 rounded-[50%] hover:bg-gray-200 cursor-pointer'>
            <HiOutlineDotsHorizontal className='w-5 h-5'/>
            </div>
        </div>
        </div>
        <ul className='w-full flex flex-col'>
        {friendsListContact && friendsListContact.map(({user},id)=>(
            <li key={id} onClick={()=>setContactModal(!openContactModal)} className='flex items-center space-x-2 text-base font-medium hover:bg-gray-200 rounded-md w-full py-2 cursor-pointer'>
                <div className='relative w-9 h-9 ml-2'>
                    <Image src={user.photoURL || userPhoto} fill alt='friend contact' className='object-cover rounded-[50%]'/>
                </div>
                <span>{user.displayName}</span>
            </li> 
        ))}
         </ul>
    </div>
  )
}

export default HomeContactFriendsList