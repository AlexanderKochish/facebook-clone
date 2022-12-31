import Image from "next/image";
import { MdEdit, MdPhotoCamera, MdDelete } from "react-icons/md";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiUpload } from "react-icons/bi";
import userPhoto from "../../public/user-icon.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  onSnapshot,
  arrayUnion,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../context/AuthContext";
import ProfileTitleNavigate from "./ProfileTitleNavigate";

const ProfileTitle = ({ profile }) => {
  const [bgImage, setBgImage] = useState(false);
  const [uploadProfilePhoto, setProfilePhoto] = useState(true);
  const [file, setFile] = useState(null);
  const [currentTitleBgImage, setCurrentTitleBgImage] = useState([]);
  const [titleFriends, setTitleFriends] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const updateBackgroundImage = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (image) => {
            await setDoc(
              doc(db, "users", currentUser?.uid, "gallery", "coverPhoto"),
              {
                cover: arrayUnion({
                  id: uuidv4(),
                  createdAt: Timestamp.now(),
                  image,
                }),
              },
              { merge: true }
            );
          });
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!profile) return;
    const getBgImage = async () => {
      const currentUserGalleryRef = doc(
        db,
        "users",
        profile?.uid,
        "gallery",
        "coverPhoto"
      );
      const unsub = onSnapshot(currentUserGalleryRef, (doc) => {
        setCurrentTitleBgImage({ ...doc.data()?.cover?.pop() });
      });

      return () => unsub();
    };

    getBgImage();

    return () => {
      getBgImage();
    };
  }, [profile]);

  const showModalProfilePhoto = () => {
    setProfilePhoto(!uploadProfilePhoto);
  };

  useEffect(() => {
    if (!profile) return;
    const getFriends = async () => {
      const friendsRef = collection(db, "users", profile.uid, "friends");
      const res = await getDocs(friendsRef);
      setTitleFriends(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFriends();
  }, [profile]);

  return (
    <div className="flex flex-col self-start w-full min-h-[680px] shadow-md bg-gradient-to-b from-[#A8CAE5] via-white to-white dark:bg-gradient-to-b dark:from-[#A8CAE5] dark:via-[#353739] dark:to-[#242526]">
      <div className="w-[1100px] mx-auto">
        <div className="relative w-full h-[450px]">
          <Image
            src={currentTitleBgImage?.image || userPhoto}
            fill
            alt="profile"
            className="object-cover rounded-b-xl"
          />
          {currentUser?.uid !== profile?.uid ? (
            ""
          ) : (
            <div
              onClick={() => setBgImage(!bgImage)}
              className="absolute z-10 bottom-5 right-10 cursor-pointer items-center py-2 bg-slate-100 rounded-lg flex space-x-3 px-2"
            >
              <MdPhotoCamera className="w-6 h-6" />
              <span> edit cover photo</span>
            </div>
          )}
          {bgImage && (
            <div className="relative w-full min-h-[450px] bottom-0 right-0">
              <ul className="absolute -bottom-20 text-slate-700 space-y-2 right-10 bg-white dark:bg-[#242526] rounded-lg p-2 w-[300px] min-h-[100px]">
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
                  <form
                    onSubmit={updateBackgroundImage}
                    className="flex items-center space-x-3"
                  >
                    <button>
                      <BiUpload className="w-6 h-6" />
                    </button>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type={"file"}
                      id="bg-input"
                      className="hidden"
                    />
                    <label htmlFor="bg-input" className="cursor-pointer">
                      Download Image
                    </label>
                  </form>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
                  <MdDelete className="w-6 h-6" />
                  <span>Delete</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-10 border-b-2 pb-5">
          <div className="flex items-center">
            <div className="relative -mt-10 w-48 h-48 border-white rounded-[50%] border-4 mr-5">
              <Image
                src={profile?.photoURL || userPhoto}
                fill
                alt="current-user"
                className="object-cover rounded-[50%]"
              />
              {currentUser?.uid !== profile?.uid ? (
                ""
              ) : (
                <div
                  onClick={showModalProfilePhoto}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-[50%] absolute bottom-0 right-5 cursor-pointer"
                >
                  <MdPhotoCamera className="w-5 h-5" />
                </div>
              )}
            </div>
            {!uploadProfilePhoto && (
              <Modal
                profile={currentUser}
                uploadProfilePhoto={uploadProfilePhoto}
                setProfilePhoto={setProfilePhoto}
              />
            )}
            <div className="flex flex-col space-y-2 dark:text-slate-200">
              <h3 className="text-4xl font-bold">{profile?.displayName}</h3>
              <span className="font-semibold text-lg text-gray-600 dark:text-slate-200">
                Friends: {titleFriends.length}
              </span>
              <ul className="flex ">
                {titleFriends.map(({ id, user }) => (
                  <li key={id} className="-m-1">
                    <div className="relative w-10 h-10">
                      <Image
                        src={user.photoURL || userPhoto}
                        fill
                        alt="user"
                        className="object-cover rounded-[50%] border-2 border-white"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center py-2 px-3 rounded-md cursor-pointer space-x-2 bg-sky-400 text-white hover:bg-sky-600">
              <BsFillPlusCircleFill className="w-6 h-5" />
              <span>Complete the story</span>
            </div>
            <div className="flex items-center py-2 px-3 rounded-md cursor-pointer space-x-2 bg-slate-200 text-black hover:bg-slate-300">
              <MdEdit className="w-6 h-5" />
              <span>Edit profile</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ProfileTitleNavigate />
          <div className="px-4 py-2 bg-slate-200 dark:bg-[#3d3e3f] dark:hover:bg-[#4b4c4d] rounded-md hover:bg-slate-300 cursor-pointer text-lg text-slate-700 dark:text-slate-200 font-semibold my-2">
            <HiOutlineDotsHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTitle;
