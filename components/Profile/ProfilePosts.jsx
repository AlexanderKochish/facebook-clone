import Image from 'next/image'
import userPhoto from '../../public/user-icon.png'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdVideoCameraFront,MdPhotoLibrary,MdFlag } from 'react-icons/md'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { v4 } from 'uuid'
import Post from './Posts/Post';

const ProfilePosts = ({posts,profile}) => {
    const[file,setFile] = useState(null)
    const[postText,setPostText] = useState('')

    const createPost = async(e) => {
        e.preventDefault()
            try {
                const postRef = collection(db,'users',profile?.uid,'posts')
                const storageRef = ref(storage, 'images/rivers.jpg');
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                },(error) => { console.log(error.message) },() => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await addDoc(postRef,{
                        id: v4(),
                        createdAt: Timestamp.now(),
                        text: postText,
                        image: downloadURL
                    },{merge:true})
                    })
                }) 
            } catch (error) {
                console.log(error.message)
            }
            setPostText('')
        }

  return (
    <div className='flex flex-col w-full min-h-screen self-start'>
    <form onSubmit={createPost} className='bg-white w-full min-h-[100px] self-start flex flex-col p-4 mt-5 rounded-lg shadow-md'>
        <div className='flex space-x-2 border-b pb-4'>
            <div className='relative w-10 h-10'>
                <Image src={profile?.photoURL || userPhoto} fill alt='current-user' className='object-cover rounded-[50%]'/>
            </div>
            <input type="text" value={postText} onChange={(e)=>setPostText(e.target.value)} placeholder='What you news?' className='rounded-2xl outline-none py-2 px-3 bg-slate-200 w-full'/>
        </div>
        <ul className='flex justify-between items-center text-base text-slate-500 font-semibold mt-2'>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 py-2 px-3'>
                <MdVideoCameraFront className='text-rose-500 w-8 h-8'/>
                <span>Live</span>
            </li>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 py-2 px-3'>
                <input type='file' className='hidden' id='post_image' onChange={(e)=>setFile(e.target.files[0])}/>
                <label htmlFor="post_image" className='flex items-center'>
                <MdPhotoLibrary className='text-green-500 w-8 h-8'/>
                    Photo/Video
                </label>
            </li>
            <li className='flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 text-lg py-2 px-3'>
                <MdFlag className='text-sky-400 w-8 h-8'/>
                <span>Life Events</span>
            </li>
        </ul>
    </form>
    {posts?.map((post)=><Post key={post.id} post={post} profile={profile}/>)}
    </div>
  )
}

export default ProfilePosts