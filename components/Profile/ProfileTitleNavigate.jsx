import React from "react";
import Link from "next/link"
import { useRouter } from 'next/router'

const ProfileTitleNavigate = () => {
    const router = useRouter()
  return (
    <ul className="flex items-center text-lg text-slate-500 dark:text-slate-200 font-semibold">
      <Link href={`/profile/${router.query.profileUid}`}>
        <li
          className={
            router.pathname === "/profile/[profileUid]"
              ? "px-4 py-3 text-sky-600 cursor-pointer border-b-4 border-sky-600"
              : "px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer"
          }
        >
          Publications
        </li>
      </Link>
      <li className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer">
        Info
      </li>
      <li className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer">
        Friends
      </li>
      <Link href={`/profile/${router.query.profileUid}/photos`}>
        <li
          className={
            router.pathname === "/profile/[profileUid]/photos"
              ? "px-4 py-3 text-sky-600 cursor-pointer border-b-4 border-sky-600"
              : "px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer"
          }
        >
          Photo
        </li>
      </Link>
      <li className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer">
        Video
      </li>
      <li className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#454647] rounded-md cursor-pointer">
        position
      </li>
    </ul>
  );
};

export default ProfileTitleNavigate;
