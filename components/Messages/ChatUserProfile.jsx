import React, { useContext } from "react";
import Image from "next/image";
import userPhoto from "../../public/user-icon.png";
import { MessagesContext } from "../../context/MessagesContext";

const ChatUserProfile = () => {
  const { state } = useContext(MessagesContext);
  const { user, chatId } = state;
  return (
    <div className="flex flex-col w-1/4 h-full bg-white pt-16 border">
      <div className="flex flex-col items-center mt-5">
        <div className="relative w-20 h-20 mb-1">
          <Image
            src={user?.photoURL || userPhoto}
            alt="profile"
            fill
            className="object-cover rounded-[50%]"
          />
        </div>
        <span className="text-lg font-semibold">{user?.displayName}</span>
      </div>
    </div>
  );
};

export default ChatUserProfile;
