import userPhoto from "../../../public/user-icon.png";
import { MdVideoCameraFront, MdPhotoLibrary, MdFlag } from "react-icons/md";
import Image from "next/image";

const PostInput = ({ createPost, profile, setPostText, postText, setFile }) => {
  return (
    <form
      onSubmit={createPost}
      className="bg-white dark:bg-[#242526] w-full min-h-[100px] self-start flex flex-col p-4 mt-5 rounded-lg shadow-md"
    >
      <div className="flex space-x-2 border-b pb-4">
        <div className="relative w-10 h-10">
          <Image
            src={profile?.photoURL || userPhoto}
            fill
            alt="current-user"
            className="object-cover rounded-[50%]"
          />
        </div>
        <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What you news?"
          className="rounded-2xl outline-none py-2 px-3 bg-slate-200 dark:text-slate-200 dark:bg-[#323335] w-full"
        />
      </div>
      <ul className="flex justify-between items-center text-base text-slate-500 dark:text-slate-200 font-semibold mt-2">
        <li className="flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-[#454647] py-2 px-3">
          <MdVideoCameraFront className="text-rose-500 w-8 h-8" />
          <span>Live</span>
        </li>
        <li className="flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-[#454647] py-2 px-3">
          <input
            type="file"
            className="hidden"
            id="post_image"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="post_image" className="flex items-center">
            <MdPhotoLibrary className="text-green-500 w-8 h-8" />
            Photo/Video
          </label>
        </li>
        <li className="flex space-x-3 justify-center rounded-md items-center w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-[#454647] text-lg py-2 px-3">
          <MdFlag className="text-sky-400 w-8 h-8" />
          <span>Life Events</span>
        </li>
      </ul>
    </form>
  );
};

export default PostInput;
