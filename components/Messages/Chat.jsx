import Image from "next/image";
import userPhoto from "../../public/user-icon.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { BsFillFileImageFill } from "react-icons/bs";
import { MessagesContext } from "../../context/MessagesContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import {
  arrayUnion,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

const Chat = ({ messages }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(MessagesContext);
  const { user, chatId } = state;
  console.log(messages);
  // const date = messages[0]?.createdAt.toDate().toString().slice(0,24) || '';
  const setMessage = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `/images-messages/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (file === null) {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: v4(),
                  createdAt: Timestamp.now(),
                  text,
                  senderId: currentUser.uid,
                }),
              });
            } else {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: v4(),
                  createdAt: Timestamp.now(),
                  commentImage: text,
                  image: downloadURL,
                  senderId: currentUser.uid,
                }),
              });
            }
          });
          setText("");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 pt-14 h-full border">
      <div className="w-full min-h-full bg-white flex flex-col">
        <div className="border-b flex p-2 w-full shadow-md">
          <div className="relative w-10 h-10">
            <Image
              src={user?.photoURL || userPhoto}
              alt="user"
              fill
              className="object-cover rounded-[50%]"
            />
          </div>
          <span>{user?.displayName}</span>
        </div>
        <div className="h-full w-full flex-auto flex-col">
          <ul className="flex flex-col justify-between overflow-hidden overflow-y-scroll p-2 self-start">
            {/* <span className='break-all'>{date}</span> */}
            {messages?.map((message) => (
              <li
                key={message.id}
                className={
                  currentUser?.uid === message.senderId
                    ? "self-end mb-2"
                    : "self-start mb-2"
                }
              >
                {message?.text ? (
                  <div
                    className={
                      currentUser?.uid === message.senderId
                        ? "flex items-center p-1 rounded-2xl bg-sky-500 text-white self-end"
                        : "flex items-center) p-2 rounded-2xl bg-gray-300 text-black self-start"
                    }
                  >
                    <span className="text-md mx-1">{message.text}</span>
                  </div>
                ) : (
                  ""
                )}
                {message?.image ? (
                  <div className="flex flex-col bg-gray-100 drop-shadow-md rounded-md p-1">
                    <div className="relative w-44 h-60 mb-1">
                      <Image
                        src={message?.image}
                        fill
                        alt="message img"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-md mx-1">{message.commentImage}</span>
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={setMessage} className="w-full  flex p-2 items-center">
          <input
            type="file"
            id="message input"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="message input" className="text-sky-600">
            <BsFillFileImageFill className="w-6 h-6" />
          </label>
          <div className="bg-gray-100 px-2 p-1 rounded-3xl w-full ml-2 flex items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Aa"
              className="bg-inherit rounded-3xl outline-none p-1 w-full"
            />
            <button className="text-sky-600 text-lg ml-1 p-2 hover:bg-sky-100 rounded-[50%]">
              <MdSend className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
