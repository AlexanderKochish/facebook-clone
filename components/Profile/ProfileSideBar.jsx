import Image from 'next/image'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import lockProfile from '../../public/lock-icon-protection-icon-security-padlock-png.png'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'

const ProfileSideBar = () => {
    const[gallery,setGallery] = useState([])
    const { currentUser } = useContext(AuthContext)

    useEffect(()=>{
        if(!currentUser) return;
        const getGallery = async () => {
        const userGalleryRef = doc(db,'users',currentUser?.uid, 'gallery', 'coverPhoto')
        const res = await getDoc(userGalleryRef)
        setGallery(res.data()?.cover);
    }
    getGallery()
    },[currentUser?.uid])

  return (
    <aside className='w-1/2 min-h-full'>
        <div>
            <div className='w-[400px] min-h-[100px] space-x-2 flex bg-white my-5 p-3 rounded-md shadow-md'>
                <div className='relative w-14 h-14'>
                    <Image src={lockProfile} alt='lock-profile' fill className='rounded-[50%]'/>
                </div>
                <div className='text-lg'>
                    <p>You Close Your Profile</p>
                    <button className='text-md font-semibold text-sky-500 hover:border-b border-sky-500 mb-0'>info</button>
                </div>
            </div>
        </div>

        <div className='w-[400px] min-h-[100px] space-x-2 flex flex-col my-5 p-3 bg-white rounded-md shadow-md'>
            <h3 className='text-xl my-4 font-bold'>Short information</h3>
            <ul className='flex flex-col items-center text-md font-semibold text-slate-800 space-y-3'>
                <li className='py-2 w-full text-center cursor-pointer hover:bg-slate-300 rounded-md bg-slate-200'>Add Biography</li>
                <li className='py-2 w-full text-center cursor-pointer hover:bg-slate-300 rounded-md bg-slate-200'>Edit information</li>
                <li className='py-2 w-full text-center cursor-pointer hover:bg-slate-300 rounded-md bg-slate-200'>Add a hobby</li>
                <li className='py-2 w-full text-center cursor-pointer hover:bg-slate-300 rounded-md bg-slate-200'>Add to current</li>
            </ul>
        </div>

        <div className='p-3 bg-white w-[400px] min-h-[100px] rounded-md shadow-md'>
            <div className='flex justify-between'>
                <h4 className='text-2xl font-bold'>Photo</h4>
                <span className='text-sky-500 cursor-pointer'>All Photos</span>
            </div>
            <ul className='flex flex-wrap'>
                {gallery?.map((g)=>(
                <li key={g.id} className='m-1'>
                    <div className='relative w-20 h-20'>
                        <Image src={g.image} alt='gallery' fill className='object-cover'/>
                    </div>
                </li>))}
            </ul>
        </div>

        <div className='p-3 bg-white w-[400px] min-h-[100px] mt-2 rounded-md shadow-md'>
        <div className='flex justify-between'>
                <h4 className='text-2xl font-bold'>Friends</h4>
                <span className='text-sky-500 cursor-pointer'>All friends</span>
            </div>
            {/* <ul>
                <li>
                    <div>
                        <Image/>
                    </div>
                </li>
            </ul>  */}
        </div>
    </aside>
  )
}

export default ProfileSideBar