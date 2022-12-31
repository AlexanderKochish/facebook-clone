import Image from "next/image";
import React, { useContext, useState } from "react";
import imgFriends from "../../public/6387942.png";
import imgNews from "../../public/1946355.png";
import imgGroup from "../../public/icon-collaborate.png";
import imgMarketplace from "../../public/shop-icon-flat-design.png";
import imgWatch from "../../public/play-icon-design.png";
import imgMemories from "../../public/5007178.png";
import imgSaved from "../../public/886566.png";
import userPhoto from "../../public/user-icon.png";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";

const HomeSideBar = () => {
  const [nav] = useState([
    { id: 1, img: imgFriends, text: "Friends", link: "/friends" },
    { id: 2, img: imgNews, text: "Last News", link: "/friends" },
    { id: 3, img: imgGroup, text: "Group", link: "/friends" },
    { id: 4, img: imgMarketplace, text: "Marketplace", link: "/friends" },
    { id: 5, img: imgWatch, text: "Watch", link: "/friends" },
    { id: 6, img: imgMemories, text: "Memories", link: "/friends" },
    { id: 7, img: imgSaved, text: "Sevad", link: "/friends" },
  ]);
  const { currentUser } = useContext(AuthContext);
  return (
    <aside className="flex flex-col py-5 items-center w-1/5 fixed left-4 min-h-full font-semibold text-base">
      <div className="flex items-center space-x-4 mt-14 w-full h-full py-2 dark:text-slate-100 hover:bg-[#E3E5E8] dark:hover:bg-[#3A3B3C] -ml-4 px-2 rounded-md cursor-pointer">
        <Link href={`/profile/${currentUser?.uid}`}>
          <div className="relative w-10 h-10">
            <Image
              src={currentUser?.photoURL || userPhoto}
              fill
              alt="currentUser-avatar"
              className="object-cover w-10 h-10 rounded-[50%]"
            />
          </div>
        </Link>
        <span>{currentUser?.displayName}</span>
      </div>
      <ul className="flex flex-col w-full h-full mt-2">
        {nav.map(({ id, img, text, link }) => (
          <Link href={link} key={id}>
            <li className="flex items-center space-x-4 py-3 w-full dark:text-slate-100 hover:bg-[#E3E5E8] dark:hover:bg-[#3A3B3C] -ml-2 px-2 rounded-md cursor-pointer">
              <div className="relative w-8 h-8">
                <Image
                  src={img}
                  alt="post text"
                  fill
                  className="object-cover w-8 h-8"
                />
              </div>
              <span>{text}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default HomeSideBar;
