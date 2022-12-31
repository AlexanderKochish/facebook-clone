import { FaBookOpen } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../Profile/Posts/Post";
import PostInput from "../Profile/Posts/PostInput";

const HomePosts = ({ posts, user }) => {
  const [file, setFile] = useState(null);
  const [postText, setPostText] = useState("");
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-[40%] flex flex-col self-start min-h-screen">
      <div className="mt-20 bg-white dark:bg-[#242526] rounded-lg shadow-md mb-1 px-2 py-1">
        <ul className="flex items-center justify-between border-b pb-1 text-gray-500 dark:text-gray-200 font-semibold">
          <li className="flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md">
            <div>
              <FaBookOpen className="w-5 h-5" />
            </div>
            <span>Storys</span>
          </li>
          <li className="flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md">
            <div>
              <BiMoviePlay className="w-5 h-5" />
            </div>
            <span>Reels</span>
          </li>
          <li className="flex items-center justify-center w-1/3 space-x-2 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md">
            <div>
              <RiVideoAddFill className="w-5 h-5" />
            </div>
            <span>Rooms</span>
          </li>
        </ul>
        <ul className="p-3 flex space-x-2">
          <li className="relative w-28 h-48">
            <Image
              src={currentUser?.photoURL}
              fill
              alt="current user"
              className="object-cover rounded-md"
            />
          </li>
        </ul>
      </div>
      <PostInput
        profile={currentUser}
        setFile={setFile}
        postText={postText}
        setPostText={setPostText}
      />
      {posts?.map((post) => (
        <Post key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default HomePosts;
