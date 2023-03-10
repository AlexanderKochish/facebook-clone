import { collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useContext } from "react";
import { db } from "../../firebase";
import userPhoto from "../../public/user-icon.png";
import { AuthContext } from "../../context/AuthContext";

const Users = ({ users }) => {
  const { currentUser } = useContext(AuthContext);

  const addFriend = async (user) => {
    await setDoc(doc(db, "users", currentUser.uid, "friends", user.uid), {
      user,
    });
  };

  return (
    <div className="min-w-full h-full flex flex-wrap">
      {users?.map((user) => (
        <div
          key={user.uid}
          className="flex flex-col m-1 w-[230px] bg-white dark:bg-[#242526] min-h-[380px] dark:text-slate-200 shadow-md self-start rounded-md "
        >
          <div className="relative w-full h-52">
            <Image
              src={user?.photoURL || userPhoto}
              fill
              alt="user"
              className="object-cover rounded-t-md"
            />
          </div>
          <div className="p-2 flex flex-col justify-between min-h-[170px]">
            <div className="flex">
              <span className="text-lg font-medium">{user?.displayName}</span>
            </div>
            <div className="flex flex-col text-lg font-medium space-y-2 mt-2">
              <button
                onClick={() => addFriend(user)}
                className="bg-sky-100 dark:bg-[#264462] text-sky-600 hover:bg-sky-200 dark:hover:bg-[#345678] rounded-md px-3 py-1"
              >
                Add
              </button>
              <button className="bg-slate-200 dark:bg-[#363738] text-black dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-[#3f4041] rounded-md px-3 py-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
