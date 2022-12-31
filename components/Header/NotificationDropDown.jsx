import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const NotificationDropDown = () => {
  return (
    <div className="absolute top-14 bg-white right-5 w-[350px] max-h-[700px] shadow-lg rounded-lg p-4 overflow-hidden overflow-y-scroll">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <div className="flex items-center justify-center hover:bg-[#E3E5E8] rounded-[50%] cursor-pointer w-10 h-10">
            <HiOutlineDotsHorizontal className="w-6 h-6 text-md text-slate-600" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="rounded-[50%] cursor-pointer">
            <span className="hover:bg-[#E3E5E8] rounded-2xl py-2 px-3 font-semibold text-slate-600">
              All
            </span>
          </div>
          <div className="rounded-[50%] cursor-pointer">
            <span className="hover:bg-[#E3E5E8] rounded-2xl py-2 px-3 font-semibold text-slate-600">
              Unread
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
