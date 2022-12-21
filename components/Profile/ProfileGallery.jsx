import { doc, getDoc, } from 'firebase/firestore'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { db } from '../../firebase'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

const ProfileGallery = () => {
    const[userGallery,setUserGallery] = useState([])
    const { currentUser } = useContext(AuthContext)

    useEffect(()=>{
        if(!currentUser) return;
        const getUserGallery = async() => {
            const userGalleryRef = doc(db,'users', currentUser.uid, 'gallery', 'coverPhoto')
            const res = await getDoc(userGalleryRef)
            setUserGallery(res.data()?.cover)
        }
        currentUser && getUserGallery()
    },[currentUser])

  return (
    <div className='flex flex-col min-w-full min-h-full rounded-lg shadow-lg p-4'>
        <div className='flex justify-between py-2 my-2'>
            <h3 className='font-bold text-2xl'>Photo</h3>
            <div>
                <span>Add Photo/Video</span>
                <div>
                    <HiOutlineDotsHorizontal/>
                </div>
            </div>
        </div>
        <ul className='flex min-w-full min-h-full flex-wrap justify-center'>
            {userGallery.map(({id,image})=>
                <li key={id} className='flex self-start m-2'>
                    <div className='relative w-44 h-52'>
                        <Image src={image} fill alt='gallery-image' className='object-cover rounded-lg'/>
                    </div>
                </li>
            )}
        </ul>
    </div>
  )
}

export default ProfileGallery