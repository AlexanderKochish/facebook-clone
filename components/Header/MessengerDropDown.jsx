import Link from "next/link";
import Image from 'next/image'
import { BiSearchAlt2, BiMessageSquareEdit } from "react-icons/bi";
import { HiOutlineDotsHorizontal, HiOutlineArrowsExpand } from "react-icons/hi";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../context/AuthContext'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const MessengerDropDown = () => {
  const[headerChatUser,setHeaderChatUser] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(()=>{
    const getHeaderChatUser = async () => {
      const res = await getDocs(collection(db,'users',currentUser.uid,'friends'))
      setHeaderChatUser(res.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getHeaderChatUser()
  },[currentUser])
  return (
    <div className="flex flex-col bg-white dark:bg-[#242526] w-[350px] min-h-[300px] rounded-lg shadow-md p-3 absolute top-14 right-5 overflow-hidden overflow-y-scroll">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold dark:text-slate-200">Chats</h3>
        <ul className="flex text-lg text-slate-600 dark:text-slate-200 space-x-1">
          <li className="hover:bg-slate-100 dark:hover:bg-[#383a3b] rounded-[50%] p-2 cursor-pointer">
            <HiOutlineDotsHorizontal className="w-5 h-5" />
          </li>
          <Link href={"/messages"}>
            <li className="hover:bg-slate-100 dark:hover:bg-[#383a3b] rounded-[50%] p-2 cursor-pointer">
              <HiOutlineArrowsExpand className="w-5 h-5 cursor-pointer" />
            </li>
          </Link>
          <li className="hover:bg-slate-100 dark:hover:bg-[#383a3b] rounded-[50%] p-2 cursor-pointer">
            <BsFillCameraReelsFill className="w-5 h-5 cursor-pointer" />
          </li>
          <li className="hover:bg-slate-100 dark:hover:bg-[#383a3b] rounded-[50%] p-2 cursor-pointer">
            <BiMessageSquareEdit className="w-5 h-5 cursor-pointer" />
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-1 bg-slate-200 dark:bg-[#242526]  rounded-2xl">
        <BiSearchAlt2 className="ml-2 w-6 h-6 text-slate-600 dark:text-slate-200" />
        <input
          type="text"
          placeholder="Search in Messenger"
          className="outline-none bg-inherit py-2 px-1"
        />
      </div>
      <ul className="mt-2">
      {headerChatUser && headerChatUser?.map(({user})=>(
        <li key={user.uid} className='flex items-center p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-[#383a3b] dark:text-slate-200 rounded-md'>
          <div className="relative w-12 h-12 mr-2">
            <Image src={user?.photoURL || userPhoto} alt='user' fill className="object-cover rounded-[50%]"/>
          </div>
          <div className="flex flex-col">
            <span>{user?.displayName}</span>
            <span>messages</span>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default MessengerDropDown;
