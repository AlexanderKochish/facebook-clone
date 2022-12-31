import Image from "next/image";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import userPhoto from "../../../public/user-icon.png";

const Post = ({ post, profile }) => {
  return (
    <>
      {post && (
        <div
          key={post.id}
          className="w-full min-h-[100px] bg-white rounded-md drop-shadow-md flex flex-col py-3 mt-4"
        >
          <div className="flex items-center justify-between mb-2 px-3">
            <div className="flex space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src={profile?.photoURL || userPhoto}
                  fill
                  alt="currentUser"
                  className="object-cover rounded-[50%]"
                />
              </div>
              <div>
                <span>{profile?.displayName}</span>
              </div>
            </div>
            <div>
              <HiOutlineDotsHorizontal className="w-6 h-6" />
            </div>
          </div>
          {post.image ? (
            <div className="relative w-full h-96">
              <Image
                src={post?.image || userPhoto}
                fill
                alt="post content"
                className="object-cover object-center"
              />
            </div>
          ) : (
            ""
          )}
          {post?.text && (
            <div className="bg-slate-100 w-full mt-2 min-h-[50px] rounded-md p-2">
              <p className="text-lg">{post.text}</p>
            </div>
          )}
          <div className="flex flex-col my-2">
            <div>{/* friends reaction this post */}</div>
            <div className="flex items-center justify-between w-full text-gray-600 my-1 border-b border-t py-1 px-3">
              <div className="flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md">
                <BiLike className="w-6 h-6 mr-2" />
                <span>Like</span>
              </div>
              <div className="flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md">
                <GoComment className="w-6 h-6 mr-2" />
                <span>Comment</span>
              </div>
              <div className="flex items-center justify-center py-2 w-1/3 cursor-pointer hover:bg-gray-100 rounded-md">
                <RiShareForwardLine className="w-6 h-6 mr-2" />
                <span>Share</span>
              </div>
            </div>
            <div className="w-full flex items-center mt-2 px-3">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src={profile?.photoURL || userPhoto}
                  alt="profile"
                  fill
                  className="object-cover rounded-[50%]"
                />
              </div>
              <form className="w-full rounded-2xl p-1 bg-gray-200">
                <input
                  type="text"
                  placeholder="write commets"
                  className="outline-none bg-inherit px-3 py-2 w-full"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
