import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiVideoAddFill } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import userPhoto from "../../public/user-icon.png";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { setDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { MessagesContext } from "../../context/MessagesContext";
import { useRouter } from "next/router";

const MessagesContactList = () => {
  const { currentUser } = useContext(AuthContext);
  const { state, dispatch } = useContext(MessagesContext);
  const [contactsFriends, setContactsFriends] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) return;
    const getContactUsers = async () => {
      try {
        const res = await getDocs(
          collection(db, "users", currentUser?.uid, "friends")
        );
        setContactsFriends(
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getContactUsers();
  }, [currentUser]);
  console.log(state);
  const getChatUser = async (user) => {
    const combaindId =
      currentUser.uid > user.uid
        ? currentUser?.uid + user.uid
        : user.uid + currentUser?.uid;
    dispatch({ type: "USER_CHANGE", payload: user });
    try {
      const res = await getDoc(doc(db, "chats", combaindId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combaindId), { messages: [] });
      }
    } catch (error) {
      console.log(error);
    }
    router.push(`/messages/${combaindId}`);
  };

  return (
    <div className="w-1/4 min-h-screen flex flex-col pt-16 px-4 bg-white">
      <div className="mb-2 min-h-[120px] w-full flex flex-col">
        <div className="flex space-x-2 items-center justify-between">
          <div className="flex flex-col ml-2">
            <h2 className="font-bold text-2xl">Chats</h2>
          </div>
          <ul className="flex items-center space-x-2">
            <li className="p-2 rounded-[50%] bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <HiOutlineDotsHorizontal className="w-6 h-6" />
            </li>
            <li className="p-2 rounded-[50%] bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <RiVideoAddFill className="w-6 h-6" />
            </li>
            <li className="p-2 rounded-[50%] bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <BsPencilSquare className="w-6 h-6" />
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-2xl mt-2  flex items-center w-full px-3">
          <BiSearchAlt2 className="w-6 h-6 text-slate-500" />
          <input
            type="text"
            placeholder="Search in messenger"
            className="w-full px-3 outline-none py-2 bg-inherit"
          />
        </div>
      </div>
      <ul>
        {contactsFriends.map(({ user }) => (
          <li
            key={user.uid}
            onClick={() => getChatUser(user)}
            className="flex items-center justify-between hover:bg-slate-100 rounded-md px-2 py-3 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src={user?.photoURL || userPhoto}
                  fill
                  alt="friends"
                  className="object-cover rounded-[50%]"
                />
              </div>
              <div>
                <span className="text-medium font-medium">
                  {user?.displayName}
                </span>
              </div>
            </div>

            <div className="rounded-[50%] p-2 hover:bg-gray-200">
              <HiOutlineDotsHorizontal className="w-6 h-6" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesContactList;
