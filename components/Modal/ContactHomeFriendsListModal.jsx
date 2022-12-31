import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import userPhoto from "../../public/user-icon.png";
import { HiPhone, HiVideoCamera } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { BsFillFileImageFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { MessagesContext } from "../../context/MessagesContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const ContactHomeFriendsListModal = ({ setContactModal, openContactModal }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [contactChat, setContactChat] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(MessagesContext);
  const { user, chatId } = state;

  const handleMessage = async (e) => {
    e.preventDefault()

    const storageRef = ref(storage, `images/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (file === null) {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: v4(),
                  createdAt: Timestamp.now(),
                  text,
                  senderId: currentUser?.uid,
                }),
              });
            } else {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: v4(),
                  createdAt: Timestamp.now(),
                  commentImage: text,
                  image: downloadURL,
                  senderId: currentUser?.uid,
                }),
              });
            }
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
    setText('')
  };

  useEffect(()=>{
    const getContactChatRealTime = async () => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      setContactChat(doc.data()?.messages);
    });
    return () => unsub()
    }
    getContactChatRealTime()
    return () => {
      getContactChatRealTime()
    }

  },[chatId])

  console.log(contactChat);
  return (
    <div className="fixed bottom-0 right-20 w-[320px] h-[430px] bg-white dark:bg-[#242526] rounded-t-md drop-shadow-lg">
      {user && (
        <div className="flex items-center justify-between p-2 border-b bg-white dark:bg-[#242526] dark:text-slate-200 w-full shadow-md">
          <div className="flex space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src={user?.photoURL || userPhoto}
                alt="user contact"
                fill
                className="object-cover rounded-[50%]"
              />
            </div>
            <span>{user?.displayName}</span>
          </div>
          <ul className="flex space-x-2 items-center text-sky-500">
            <li className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 dark:hover:bg-[#444548]">
              <HiPhone className="w-5 h-5" />
            </li>
            <li className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 dark:hover:bg-[#444548]">
              <HiVideoCamera className="w-5 h-5" />
            </li>
            <li
              onClick={() => setContactModal(!openContactModal)}
              className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 dark:hover:bg-[#444548]"
            >
              <CgClose className="w-5 h-5" />
            </li>
          </ul>
        </div>
      )}

      <ul className="w-full flex flex-col overflow-hidden overflow-y-scroll h-[320px] absolute top-14 bottom-100 p-2 dark:text-slate-200">
        {contactChat &&
          contactChat?.map((chat) => (
            <li
              key={chat.id}
              className={
                currentUser?.uid === chat?.senderId
                  ? "p-2 rounded-2xl my-1 bg-sky-600 flex self-end"
                  : "p-2 rounded-2xl my-1 bg-gray-300 text-black flex self-start"
              }
            >
              {chat.text || chat.commentImage}
            </li>
          ))}
      </ul>

      <form
        onSubmit={handleMessage}
        className="flex items-center border-t h-14 p-2 w-full fixed bottom-0 bg-white dark:bg-[#242526] justify-between shadow-md text-gray-400 dark:text-slate-200"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          id="home_contact_input_file"
          className="hidden"
        />
        <label
          htmlFor="home_contact_input_file"
          className="p-1 hover:bg-gray-200 dark:hover:bg-[#444548] rounded-[50%] cursor-pointer"
        >
          <BsFillFileImageFill className="w-5 h-5" />
        </label>
        <div className="flex items-center">
          <div className="flex items-center rounded-2xl px-1 bg-gray-100 dark:bg-[#323335]">
            <input
              type="text"
              placeholder="Aa"
              className="bg-inherit outline-none px-2 py-1 rounded-2xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="p-1 hover:bg-gray-200 dark:hover:bg-[#444548] rounded-[50%] cursor-pointer">
              <FaSmile className="w-5 h-5" />
            </div>
          </div>
          <div className="p-1 hover:bg-gray-200 dark:hover:bg-[#444548] rounded-[50%] ml-2 cursor-pointer">
            <AiFillLike className="w-5 h-5" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactHomeFriendsListModal;
